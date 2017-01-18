
const behavior_ = Symbol('behavior');

export default class {
  constructor(services, params) {
    this[behavior_] = services.entity(params.tag).behaviors[0];
  }

  execute() {
    this[behavior_].open();
  }
}
