
/* eslint no-debugger: "off" */

// TODO Consider if any dependencies should be removed
import EntityManager from '../core/EntityManager';
import KeyboardController from '../core/KeyboardController';
import PointerController from '../core/PointerController';
import { EVENT_TYPE } from '../core/constants';
import SCENE from '../scenes/all';
import COMMAND from '../commands/all';

const entityManager_ = Symbol('entityManager');
const keyboardController_ = Symbol('keyboardController');
const pointerController_ = Symbol('pointerController');
const nextScene_ = Symbol('nextScene');

// TODO Generalize and clean-up implementation (e.g. fewer magic indexes)
function createControl(config, services, keyboardController, pointerController) {
  let controller;
  const eventType = config.trigger.event.split('.')[0];
  const Command = COMMAND[config.action.commandId];
  // TODO Ensure params does not have unnecessary properties
  //      (e.g. params.commandId)
  const params = config.action;
  const command = new Command(services, params);

  switch (eventType) {
    case EVENT_TYPE.KEY:
      controller = keyboardController;
      break;
    case EVENT_TYPE.POINTER:
      controller = pointerController;
      break;
    default:
      // TODO Throw exception
      debugger;
      break;
  }

  controller.register(config.trigger, command);
}

function processScenePrefab(prefab, entityManager, keyboardController,
  pointerController, commandServices) {
  for (const entity of prefab.entities) {
    entityManager.createEntity(entity.prefab);
  }

  for (const control of prefab.controls) {
    createControl(control, commandServices, keyboardController,
      pointerController);
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
    this[keyboardController_], this[pointerController_], commandServices);
}

export default class World {
  constructor(stage, camera) {
    const entityServices = {
      // TODO Refactor so change scene is performed via store.state change
      changeScene: this.changeScene.bind(this),
      camera,
    };
    this[entityManager_] = new EntityManager(stage, entityServices);
    this[keyboardController_] = new KeyboardController();
    this[pointerController_] = new PointerController();
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
    this[pointerController_].update();

    this[entityManager_].update();
  }
}
