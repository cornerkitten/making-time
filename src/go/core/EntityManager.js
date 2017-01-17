
/* eslint no-debugger: "off" */

import * as Pixi from 'pixi.js';

// TODO Consider if any dependencies should be removed
import { COMPONENT, DISPLAY_TYPE } from '../core/constants';
import { BEHAVIOR_CLASS } from '../resources';

const stage_ = Symbol('stage');
const entities_ = Symbol('entities');
const uniqueTags_ = Symbol('uniqueTags');

function createTags(config = [], uniqueTags) {
  const tags = new Set();

  for (const tag of config) {
    if (typeof tag === 'string') {
      tags.add(tag);
    } else {
      // TODO Assert expected format of of tag (i.e. tag = {title, isUnique})
      if (uniqueTags.has(tag.title)) {
        // TODO Throw exception
        debugger;
      }

      if (tag.isUnique) {
        uniqueTags.add(tag.title);
      }
      tags.add(tag.title);
    }
  }

  return tags;
}

function createDisplay(config = { type: DISPLAY_TYPE.CONTAINER }) {
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
    case DISPLAY_TYPE.TEXT:
      display = new Pixi.Text(config.text, config.style);
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

  // TODO Watch our for when config.component is undefined
  //      (e.g. using a constant which isn't defined)
  if (config.component === undefined || BEHAVIOR_CLASS[config.component] === undefined) {
    // TODO Throw exception
    debugger;
    return null;
  }

  return new BEHAVIOR_CLASS[config.component](params, services);
}

export default class EntityManager {
  constructor(stage) {
    this[stage_] = stage;
    this[entities_] = [];
    this[uniqueTags_] = new Set();
  }

  // TODO Update so created entities are queued to be added until between
  //      calls to engine update()
  createEntity(config) {
    const entity = {};

    entity.tags = createTags(config.tags, this[uniqueTags_]);

    // TODO If no display component is described,
    //      create container by default
    const display = createDisplay(config.display);
    this[stage_].addChild(display);
    entity.display = display;

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

    this[entities_].push(entity);

    return entity;
  }

  clearEntities() {
    this[stage_].removeChildren();
    this[entities_] = [];
    this[uniqueTags_].clear();
  }

  entityWithTag(tag) {
    const tagTitle = (typeof tag === 'string') ? tag : tag.title;

    // TODO Consider improving performance by keeping a mapping for each
    //      tag to the enities which hold it.
    return this[entities_].find(entity => entity.tags.has(tagTitle));
  }

  entitiesWithTag(tag) {
    const tagTitle = (typeof tag === 'string') ? tag : tag.title;

    // TODO Consider improving performance by keeping a mapping for each
    //      tag to the enities which hold it.
    return this[entities_].filter(entity => entity.tags.has(tagTitle));
  }

  update() {
    this[entities_].forEach((entity) => {
      entity.behaviors.forEach((behavior) => {
        if (behavior.update) {
          behavior.update();
        }
      });
    });
  }
}
