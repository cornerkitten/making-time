
/* eslint no-debugger: "off" */
/* eslint no-console: "off" */

/* global window */

const keyDownBindings_ = Symbol('keyDownBindings');
const keysInDownState_ = Symbol('keysInDownState');
const keysInUpState_ = Symbol('keysInUpState');

export default class KeyboardController {
  constructor() {
    this[keyDownBindings_] = {};
    this[keysInDownState_] = new Set();
    this[keysInUpState_] = new Set();

    window.addEventListener('keydown', this.onKeyDown.bind(this), false);
    window.addEventListener('keyup', this.onKeyUp.bind(this), false);
  }

  registerKeyDown(key, command) {
    if (this[keyDownBindings_][key] === undefined) {
      this[keyDownBindings_][key] = [];
    }

    this[keyDownBindings_][key].push(command);
  }

  onKeyDown(e) {
    console.info(e.keyCode);
    this[keysInUpState_].delete(e.keyCode);
    this[keysInDownState_].add(e.keyCode);
  }

  onKeyUp(e) {
    this[keysInUpState_].add(e.keyCode);
    this[keysInDownState_].delete(e.keyCode);
  }

  clear() {
    this[keyDownBindings_] = {};
  }

  update() {
    this[keysInDownState_].forEach((keyCode) => {
      if (this[keyDownBindings_][keyCode]) {
        this[keyDownBindings_][keyCode].forEach((command) => {
          command.execute();
        });
      }
    });
  }
}
