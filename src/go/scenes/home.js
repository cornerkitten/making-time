
// import DOOR_PREFAB from '../prefabs/door';
// import CHARACTER_PREFAB from '../prefabs/character';
import MOMENT_EMITTER from '../prefabs/momentEmitter';
import CONTROL_SCHEME from '../controls';

export default {
  controls: CONTROL_SCHEME.NONE,
  entities: [
    {
      prefab: MOMENT_EMITTER,
    },
    // {
    //   prefab: CHARACTER_PREFAB,
    // },
    // {
    //   prefab: DOOR_PREFAB,
    // },
  ],
};
