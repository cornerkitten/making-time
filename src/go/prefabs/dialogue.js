
import { DISPLAY_TYPE } from '../core/constants';
import { BEHAVIOR } from '../resources';

export default {
  // display: {
  //   type: DISPLAY_TYPE.TEXT,
  //   text: 'hello world',
  //   style: {
  //     fill: '#eee',
  //   },
  // },
  display: {
    type: DISPLAY_TYPE.CONTAINER,
  },
  behaviors: [
    {
      component: BEHAVIOR.DIALOGUE,
    },
  ],
};
