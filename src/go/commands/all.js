
import * as RESOURCES from '../resources';
import CHANGE_SCENE from '../commands/ChangeScene';
import CREATE_ENTITY from '../commands/CreateEntity';
import WALK from '../commands/Walk';
import OPEN from '../commands/Open';

export default {
  [RESOURCES.COMMAND_ID.CHANGE_SCENE]: CHANGE_SCENE,
  [RESOURCES.COMMAND_ID.CREATE_ENTITY]: CREATE_ENTITY,
  [RESOURCES.COMMAND_ID.WALK]: WALK,
  [RESOURCES.COMMAND_ID.OPEN]: OPEN,
};
