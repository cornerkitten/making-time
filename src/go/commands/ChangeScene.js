
const services_ = Symbol('services_');
const sceneId_ = Symbol('sceneId');

export default class {
  constructor(services, params) {
    this[services_] = services;
    this[sceneId_] = params.sceneId;
  }

  execute() {
    this[services_].changeScene(this[sceneId_]);
  }
}
