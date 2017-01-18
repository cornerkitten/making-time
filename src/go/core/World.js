
/* eslint no-debugger: "off" */

// TODO Consider if any dependencies should be removed
import EntityManager from '../core/EntityManager';
import KeyboardController from '../core/KeyboardController';
import SCENE from '../scenes/all';
import COMMAND from '../commands/all';

const entityManager_ = Symbol('entityManager');
const keyboardController_ = Symbol('keyboardController');
const nextScene_ = Symbol('nextScene');

// TODO Generalize and clean-up implementation (e.g. fewer magic indexes)
function createControl(config, services, keyboardController) {
  const event = config.trigger.event.split('.');
  const Command = COMMAND[config.action.commandId];
  // TODO Ensure params does not have engine properties (e.g. params.commandId)
  const params = config.action;
  const command = new Command(services, params);

  if (event[0] === 'key') {
    let register;
    let key;

    switch (event[1]) {
      case 'start':
        register = keyboardController.registerKeyStart;
        break;
      case 'press':
        register = keyboardController.registerKeyDown;
        break;
      default:
        // TODO Throw exception
        debugger;
        break;
    }

    switch (event[2]) {
      case 'enter':
        key = 13;
        break;
      case 'space':
        key = 32;
        break;
      case 'left':
        key = 37;
        break;
      case 'right':
        key = 39;
        break;
      default:
        // TODO Throw exception
        debugger;
        break;
    }

    register.bind(keyboardController)(key, command);
  }
}

function processScenePrefab(prefab, entityManager, keyboardController,
  commandServices) {
  for (const entity of prefab.entities) {
    entityManager.createEntity(entity.prefab);
  }

  for (const control of prefab.controls) {
    createControl(control, commandServices, keyboardController);
  }
}

// TODO Record current scene ID
// TODO Document function as running with `this` binding
function performSceneChange(sceneId) {
  this[entityManager_].clearEntities();
  this[keyboardController_].clear();

  const commandServices = {
    entity: this[entityManager_].entityWithTag.bind(this[entityManager_]),
    entities: this[entityManager_].entitiesWithTag.bind(this[entityManager_]),
    createEntity: this[entityManager_].createEntity.bind(this[entityManager_]),
    changeScene: this.changeScene.bind(this),
  };

  processScenePrefab(SCENE[sceneId], this[entityManager_],
    this[keyboardController_], commandServices);
}

export default class World {
  constructor(stage) {
    const entityServices = {
      // TODO Refactor so change scene is performed via store.state change
      changeScene: this.changeScene.bind(this),
    };
    this[entityManager_] = new EntityManager(stage, entityServices);
    this[keyboardController_] = new KeyboardController();
    this[nextScene_] = undefined;
  }

  changeScene(sceneId) {
    this[nextScene_] = sceneId;
  }

  update() {
    if (this[nextScene_]) {
      performSceneChange.bind(this)(this[nextScene_]);
      this[nextScene_] = undefined;
    }

    this[keyboardController_].update();

    this[entityManager_].update();
  }
}
