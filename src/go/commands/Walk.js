
const behavior_ = Symbol('behavior');
const amount_ = Symbol('amount');

export default class {
  constructor(services, params) {
    // TODO Avoid hard-coded 0-index for retrieval
    this[behavior_] = services.entity(params.tag).behaviors[0];
    this[amount_] = params.amount;
  }

  execute() {
    this[behavior_].walk(this[amount_]);
  }
}
