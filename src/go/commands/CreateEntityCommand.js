
const entityManager_ = Symbol('entityManager');
const prefab_ = Symbol('prefab');

export default class CreateEntityCommand {
  constructor(entityManager, prefab) {
    this[entityManager_] = entityManager;
    this[prefab_] = prefab;
  }

  execute() {
    this[entityManager_].createEntity(this[prefab_]);
  }
}
