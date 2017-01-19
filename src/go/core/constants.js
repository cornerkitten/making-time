
// default: DISPLAY_TYPE.CONTAINER
export const DISPLAY_TYPE = {
  CONTAINER: 'container',
  SPRITE: 'sprite',
  TEXT: 'text',
};

export const COMPONENT = {
  DISPLAY: 'display',
};

export const EVENT_TYPE = {
  KEY: 'key',
  POINTER: 'pointer',
};

// TODO Create tests to ensure these values match their constant paths
export const KEY = {
  START: {
    SPACE: 'key.start.space',
    ENTER: 'key.start.enter',
  },
  PRESS: {
    LEFT: 'key.press.left',
    RIGHT: 'key.press.right',
  },
};

export const KEY_STATE = {
  START: 'start',
  PRESS: 'press',
  END: 'end',
};

export const KEY_NAME = {
  ENTER: 'enter',
  SPACE: 'space',
  LEFT: 'left',
  RIGHT: 'right',
};

export const KEY_CODE = {
  [KEY_NAME.ENTER]: 13,
  [KEY_NAME.SPACE]: 32,
  [KEY_NAME.LEFT]: 37,
  [KEY_NAME.RIGHT]: 39,
};
