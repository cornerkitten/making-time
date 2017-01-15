
// TODO Consider if any dependencies should be removed
import EntityManager from '../core/EntityManager';
import KeyboardController from '../core/KeyboardController';
import { SCENE } from '../resources';
// Prefabs
import characterPrefab from '../prefabs/character';
import doorPrefab from '../prefabs/door';
// Comamnds
import WalkCommand from '../commands/WalkCommand';
import ChangeSceneCommand from '../commands/ChangeSceneCommand';

const entityManager_ = Symbol('entityManager');
const keyboardController_ = Symbol('keyboardController');
const nextScene_ = Symbol('nextScene');

// TODO Document function as running with `this` binding
function performSceneChange(sceneId) {
  this[entityManager_].clearEntities();
  this[keyboardController_].clear();

  switch (sceneId) {
    case SCENE.HOME: {
      this[entityManager_].createEntity(doorPrefab);
      const character = this[entityManager_].createEntity(characterPrefab);
      const walkRightCommand = new WalkCommand(character.behaviors[0], 8);
      const walkLeftCommand = new WalkCommand(character.behaviors[0], -8);
      const changeSceneCommand = new ChangeSceneCommand(this, SCENE.PHONE);
      this[keyboardController_].registerKeyDown(39, walkRightCommand);
      this[keyboardController_].registerKeyDown(37, walkLeftCommand);
      this[keyboardController_].registerKeyDown(32, changeSceneCommand);
      break;
    }
    case SCENE.PHONE: {
      // this[entityManager_].createEntity(doorPrefab);
      const character = this[entityManager_].createEntity(characterPrefab);
      const walkRightCommand = new WalkCommand(character.behaviors[0], 8);
      const walkLeftCommand = new WalkCommand(character.behaviors[0], -8);
      const changeSceneCommand = new ChangeSceneCommand(this, SCENE.HOME);
      this[keyboardController_].registerKeyDown(39, walkRightCommand);
      this[keyboardController_].registerKeyDown(37, walkLeftCommand);
      this[keyboardController_].registerKeyDown(8, changeSceneCommand);
      break;
    }
    default:
      break;
  }
}

export default class World {
  constructor(stage) {
    this[entityManager_] = new EntityManager(stage);
    this[keyboardController_] = new KeyboardController();
    this[nextScene_] = undefined;
  }

  changeScene(sceneId) {
    this[nextScene_] = sceneId;
  }

  update() {
    if (this[nextScene_]) {
      performSceneChange.bind(this)(this[nextScene_]);
      this[nextScene_] = undefined;
    }

    this[keyboardController_].update();
  }
}
