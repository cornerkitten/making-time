
const world_ = Symbol('world');
const sceneId_ = Symbol('sceneId');

export default class ChangeSceneCommand {
  constructor(world, sceneId) {
    this[world_] = world;
    this[sceneId_] = sceneId;
  }

  execute() {
    this[world_].changeScene(this[sceneId_]);
  }
}
