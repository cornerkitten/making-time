
// import { BEHAVIOR, TEXTURE } from '../resources';
import { BEHAVIOR, TEXTURE, UNIQUE_TAG } from '../resources';
import { DISPLAY_TYPE } from '../core/constants';

export default {
  tags: [UNIQUE_TAG.PLAYER],
  display: {
    type: DISPLAY_TYPE.SPRITE,
    texture: TEXTURE.CHARACTER,
    position: {
      x: 64,
      y: 64,
    },
    anchor: {
      x: 0.5,
      y: 1.0,
    },
  },
  behaviors: [
    {
      component: BEHAVIOR.CHARACTER,
    },
  ],
};
