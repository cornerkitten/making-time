
/* eslint no-debugger: "off" */

import * as Pixi from 'pixi.js';
import { COMPONENT, DISPLAY_TYPE } from '../core/constants';
import KeyboardController from '../core/KeyboardController';

import { SCENE, BEHAVIOR } from '../resources';

// TODO Remove as depenency
// Prefabs
import characterPrefab from '../prefabs/character';
import doorPrefab from '../prefabs/door';
// Behaviors
import Character from '../behaviors/Character';
import Door from '../behaviors/Door';
// Comamnds
import WalkCommand from '../commands/WalkCommand';

const stage_ = Symbol('stage');
const keyboardController_ = Symbol('keyboardController');

function createDisplay(config) {
  const type = config.type || DISPLAY_TYPE.CONTAINER;
  let display;

  switch (type) {
    case DISPLAY_TYPE.SPRITE:
      display = Pixi.Sprite.from(config.texture);
      if (config.anchor) {
        display.anchor.x = config.anchor.x || 0;
        display.anchor.y = config.anchor.y || 0;
      }
      if (config.position) {
        display.position.x = config.position.x || 0;
        display.position.y = config.position.y || 0;
      }
      break;
    case DISPLAY_TYPE.CONTAINER:
      display = new Pixi.Container();
      break;
    default:
      break;
  }
  display.alpha = config.alpha || 1;

  return display;
}

function createBehaviorParam(param) {
  if (param.component === undefined) {
    return param;
  }

  switch (param.component) {
    case COMPONENT.DISPLAY:
      return createDisplay(param);
    default:
      // TODO Throw exception
      return null;
  }
}

// TODO Protect the passed in services
function createBehavior(config, services) {
  const params = {};

  if (config.params) {
    const paramKeys = Object.keys(config.params);
    paramKeys.forEach((paramKey) => {
      params[paramKey] = createBehaviorParam(config.params[paramKey]);
    });
  }

  // TODO Generalize process
  // TODO Watch our for when config.component is undefined
  //      (e.g. using a constant which isn't defined)
  switch (config.component) {
    case BEHAVIOR.CHARACTER:
      return new Character(params, services);
    case BEHAVIOR.DOOR:
      return new Door(params, services);
    default:
      // TODO Throw exception
      debugger;
      return null;
  }
}

export default class World {
  constructor(stage) {
    this[stage_] = stage;
    this[keyboardController_] = new KeyboardController();
  }

  initScene(sceneId) {
    switch (sceneId) {
      case SCENE.HOME: {
        this.createEntity(doorPrefab);
        const character = this.createEntity(characterPrefab);
        const walkRightCommand = new WalkCommand(character.behaviors[0], 8);
        const walkLeftCommand = new WalkCommand(character.behaviors[0], -8);
        this[keyboardController_].registerKeyDown(39, walkRightCommand);
        this[keyboardController_].registerKeyDown(37, walkLeftCommand);
        break;
      }
      default:
        break;
    }
  }

  createEntity(config) {
    const entity = {};

    // TODO If no display component is described,
    //      create container by default
    let display;
    if (config.display) {
      display = createDisplay(config.display);
      this[stage_].addChild(display);
      entity.display = display;
    }

    const services = {
      component: (componentId) => {
        switch (componentId) {
          case COMPONENT.DISPLAY:
            return display;
          default:
            return null;
        }
      },
    };
    entity.services = services;

    if (config.behaviors) {
      entity.behaviors = [];

      for (let i = 0; i < config.behaviors.length; i += 1) {
        const behavior = createBehavior(config.behaviors[i], services);
        entity.behaviors.push(behavior);
      }
    }

    return entity;
  }

  update() {
    this[keyboardController_].update();
  }
}
