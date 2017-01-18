
import { BEHAVIOR, TEXTURE, TAG } from '../resources';
import { DISPLAY_TYPE } from '../core/constants';

export default {
  tags: [TAG.DOOR],
  display: {
    type: DISPLAY_TYPE.SPRITE,
    texture: TEXTURE.DOOR_CLOSED,
    position: {
      x: 256,
      y: 500,
    },
    anchor: {
      x: 0.5,
      y: 1.0,
    },
  },
  behaviors: [
    {
      component: BEHAVIOR.DOOR,
    },
  ],
};
