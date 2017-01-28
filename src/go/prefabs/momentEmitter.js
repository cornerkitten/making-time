
import { BEHAVIOR } from '../resources';
import { DISPLAY_TYPE } from '../core/constants';

export default {
  display: {
    type: DISPLAY_TYPE.CONTAINER,
  },
  behaviors: [
    {
      component: BEHAVIOR.MOMENT_EMITTER,
    },
  ],
};
