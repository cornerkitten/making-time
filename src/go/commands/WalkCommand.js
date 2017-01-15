
const behavior_ = Symbol('behavior');
const amount_ = Symbol('amount');

export default class {
  constructor(behavior, amount) {
    this[behavior_] = behavior;
    this[amount_] = amount;
  }

  execute() {
    this[behavior_].walk(this[amount_]);
  }
}
