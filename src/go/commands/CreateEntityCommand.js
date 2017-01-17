
const services_ = Symbol('services');
const prefab_ = Symbol('prefab');

export default class CreateEntityCommand {
  constructor(services, params) {
    this[services_] = services;
    this[prefab_] = params.prefab;
  }

  execute() {
    this[services_].createEntity(this[prefab_]);
  }
}
