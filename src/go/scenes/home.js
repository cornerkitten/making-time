
import DOOR_PREFAB from '../prefabs/door';
import CHARACTER_PREFAB from '../prefabs/character';
import CONTROL_SCHEME from '../controls';

export default {
  controls: CONTROL_SCHEME.HOME,
  entities: [
    {
      prefab: DOOR_PREFAB,
    },
    {
      prefab: CHARACTER_PREFAB,
    },
  ],
};
