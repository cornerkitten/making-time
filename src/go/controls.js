
import { KEY } from './core/constants';
import { SCENE_ID, COMMAND_ID, UNIQUE_TAG } from './resources';
import DIALOGUE_PREFAB from './prefabs/dialogue';

export default {
  HOME: [
    {
      trigger: {
        event: KEY.START.SPACE,
      },
      action: {
        commandId: COMMAND_ID.CHANGE_SCENE,
        sceneId: SCENE_ID.PHONE,
      },
    },
    {
      trigger: {
        event: KEY.PRESS.LEFT,
      },
      action: {
        commandId: COMMAND_ID.WALK,
        tag: UNIQUE_TAG.PLAYER,
        amount: -8,
      },
    },
    {
      trigger: {
        event: KEY.PRESS.RIGHT,
      },
      action: {
        commandId: COMMAND_ID.WALK,
        tag: UNIQUE_TAG.PLAYER,
        amount: 8,
      },
    },
    {
      trigger: {
        event: KEY.START.ENTER,
      },
      action: {
        commandId: COMMAND_ID.CREATE_ENTITY,
        prefab: DIALOGUE_PREFAB,
      },
    },
  ],
  PHONE: [
    {
      trigger: {
        event: KEY.START.SPACE,
      },
      action: {
        commandId: COMMAND_ID.CHANGE_SCENE,
        sceneId: SCENE_ID.HOME,
      },
    },
    {
      trigger: {
        event: KEY.PRESS.LEFT,
      },
      action: {
        commandId: COMMAND_ID.WALK,
        tag: UNIQUE_TAG.PLAYER,
        amount: -8,
      },
    },
    {
      trigger: {
        event: KEY.PRESS.RIGHT,
      },
      action: {
        commandId: COMMAND_ID.WALK,
        tag: UNIQUE_TAG.PLAYER,
        amount: 8,
      },
    },
    {
      trigger: {
        event: KEY.START.ENTER,
      },
      action: {
        commandId: COMMAND_ID.CREATE_ENTITY,
        prefab: DIALOGUE_PREFAB,
      },
    },
  ],
};
