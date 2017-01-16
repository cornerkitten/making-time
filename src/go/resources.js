
// TODO Freeze all constants

// Behaviors
import Character from './behaviors/Character';
import Door from './behaviors/Door';
import Dialogue from './behaviors/Dialogue';

export const TEXTURE = {
  CHARACTER: 'static/img/go-stone-white-flat.svg',
  DOOR_CLOSED: 'static/img/door-closed.svg',
};

export const SCENE = {
  HOME: 'home',
  PHONE: 'phone',
};

export const BEHAVIOR = {
  CHARACTER: 'character',
  DOOR: 'door',
  DIALOGUE: 'dialogue',
};

export const BEHAVIOR_CLASS = {
  [BEHAVIOR.CHARACTER]: Character,
  [BEHAVIOR.DOOR]: Door,
  [BEHAVIOR.DIALOGUE]: Dialogue,
};
