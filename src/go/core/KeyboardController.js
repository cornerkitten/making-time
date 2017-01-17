
/* eslint no-debugger: "off" */
/* eslint no-console: "off" */

/* global window */

const keyDownBindings_ = Symbol('keyDownBindings');
const keyStartBindings_ = Symbol('keyStartBindings');
const keysInDownState_ = Symbol('keysInDownState');
const keysInUpState_ = Symbol('keysInUpState');
const keysInStartState_ = Symbol('keysInStartState');

export default class KeyboardController {
  constructor() {
    this[keyDownBindings_] = {};
    this[keyStartBindings_] = {};
    this[keysInDownState_] = new Set();
    this[keysInUpState_] = new Set();
    this[keysInStartState_] = new Set();

    window.addEventListener('keydown', this.onKeyDown.bind(this), false);
    window.addEventListener('keyup', this.onKeyUp.bind(this), false);
  }

  registerKeyDown(key, command) {
    if (this[keyDownBindings_][key] === undefined) {
      this[keyDownBindings_][key] = [];
    }

    this[keyDownBindings_][key].push(command);
  }

  registerKeyStart(key, command) {
    if (this[keyStartBindings_][key] === undefined) {
      this[keyStartBindings_][key] = [];
    }

    this[keyStartBindings_][key].push(command);
  }

  onKeyDown(e) {
    console.info(e.keyCode);
    if (this[keysInDownState_].has(e.keyCode) === false) {
      this[keysInUpState_].delete(e.keyCode);
      this[keysInDownState_].add(e.keyCode);
      this[keysInStartState_].add(e.keyCode);
    }
  }

  onKeyUp(e) {
    this[keysInUpState_].add(e.keyCode);
    this[keysInDownState_].delete(e.keyCode);
  }

  clear() {
    this[keyDownBindings_] = {};
    this[keyStartBindings_] = {};
  }

  update() {
    this[keysInStartState_].forEach((keyCode) => {
      if (this[keyStartBindings_][keyCode]) {
        this[keyStartBindings_][keyCode].forEach((command) => {
          command.execute();
        });
      }
    });
    this[keysInStartState_].clear();

    this[keysInDownState_].forEach((keyCode) => {
      if (this[keyDownBindings_][keyCode]) {
        this[keyDownBindings_][keyCode].forEach((command) => {
          command.execute();
        });
      }
    });
  }
}
