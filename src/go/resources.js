
// TODO Freeze all constants
// TODO In order to avoid circular references,
//      ensure resources.js has few, if any, imports

// Behaviors
import Character from './behaviors/Character';
import Door from './behaviors/Door';
import Dialogue from './behaviors/Dialogue';

export const TEXTURE = {
  CHARACTER: 'static/img/go-stone-white-flat.svg',
  DOOR_CLOSED: 'static/img/door-closed.svg',
};

export const SCENE_ID = {
  HOME: 'home',
  PHONE: 'phone',
};

export const COMMAND_ID = {
  CHANGE_SCENE: 'changeScene',
  CREATE_ENTITY: 'createEntity',
  WALK: 'walk',
};

// TODO Consider whether this should be named PREFAB_ID
// export const ENTITY = {
//   CHARACTER: 'character',
//   DIALOGUE: 'dialogue',
//   DOOR: 'door',
// };

// TODO Consider whetehr this should be named BEHAVIOR_ID
export const BEHAVIOR = {
  CHARACTER: 'character',
  DOOR: 'door',
  DIALOGUE: 'dialogue',
};

// TODO Consider whether this should be placed in separate file
//      (perhaps behaviors/all.js) in order to avoid potential circular
//      references
export const BEHAVIOR_CLASS = {
  [BEHAVIOR.CHARACTER]: Character,
  [BEHAVIOR.DOOR]: Door,
  [BEHAVIOR.DIALOGUE]: Dialogue,
};

// export const TAG = {
//   CHARACTER: { title: 'character', isUnique: true },
// };

export const UNIQUE_TAG = {
  PLAYER: { title: 'player', isUnique: true },
};
