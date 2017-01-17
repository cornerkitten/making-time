
/* eslint no-debugger: "off" */

// TODO Consider if any dependencies should be removed
import EntityManager from '../core/EntityManager';
import KeyboardController from '../core/KeyboardController';
import { SCENE_ID, UNIQUE_TAG } from '../resources';
import SCENE from '../scenes/all';
// Prefabs
import dialoguePrefab from '../prefabs/dialogue';
// Comamnds
import WalkCommand from '../commands/WalkCommand';
import ChangeSceneCommand from '../commands/ChangeSceneCommand';
import CreateEntityCommand from '../commands/CreateEntityCommand';

const entityManager_ = Symbol('entityManager');
const keyboardController_ = Symbol('keyboardController');
const nextScene_ = Symbol('nextScene');

function processScenePrefab(prefab, entityManager) {
  for (const entity of prefab.entities) {
    entityManager.createEntity(entity.prefab);
  }
}

// TODO Record current scene ID
// TODO Document function as running with `this` binding
function performSceneChange(sceneId) {
  this[entityManager_].clearEntities();
  this[keyboardController_].clear();

  processScenePrefab(SCENE[sceneId], this[entityManager_]);
  const services = {
    entity: this[entityManager_].entityWithTag.bind(this[entityManager_]),
    entities: this[entityManager_].entitiesWithTag.bind(this[entityManager_]),
    createEntity: this[entityManager_].createEntity.bind(this[entityManager_]),
    changeScene: this.changeScene.bind(this),
  };

  const walkRightCommand = new WalkCommand(services, {
    tag: UNIQUE_TAG.PLAYER,
    amount: 8,
  });
  const walkLeftCommand = new WalkCommand(services, {
    tag: UNIQUE_TAG.PLAYER,
    amount: -8,
  });
  const createDialogueCommand = new CreateEntityCommand(services, {
    prefab: dialoguePrefab,
  });
  let changeSceneCommand;

  switch (sceneId) {
    case SCENE_ID.HOME: {
      changeSceneCommand = new ChangeSceneCommand(services, {
        sceneId: SCENE_ID.PHONE,
      });
      break;
    }
    case SCENE_ID.PHONE: {
      changeSceneCommand = new ChangeSceneCommand(services, {
        sceneId: SCENE_ID.HOME,
      });
      break;
    }
    default:
      // TODO Throw exception
      debugger;
      break;
  }

  this[keyboardController_].registerKeyDown(39, walkRightCommand);
  this[keyboardController_].registerKeyDown(37, walkLeftCommand);
  this[keyboardController_].registerKeyStart(32, changeSceneCommand);
  this[keyboardController_].registerKeyStart(13, createDialogueCommand);
}

export default class World {
  constructor(stage) {
    this[entityManager_] = new EntityManager(stage);
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
