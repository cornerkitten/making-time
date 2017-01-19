
/* eslint no-debugger: "off" */
/* eslint no-console: "off" */

/* global window */

import { POINTER_STATE } from '../core/constants';

const pendingOnTap_ = Symbol('pendingOnClick');
const onTapBindings_ = Symbol('onTapBindings');

export default class PointerController {
  constructor() {
    this[pendingOnTap_] = undefined;
    this[onTapBindings_] = [];
    window.addEventListener('click', this.onClick.bind(this));
    window.addEventListener('touchend', this.onClick.bind(this));
  }

  // TODO Make private
  onClick(e) {
    this[pendingOnTap_] = e;
  }

  register(trigger, command) {
    const event = trigger.event.split('.');
    const eventState = event[1];
    let bindings;

    switch (eventState) {
      case POINTER_STATE.TAP:
        bindings = this[onTapBindings_];
        break;
      default:
        // TODO Throw exception
        debugger;
        break;
    }

    bindings.push(command);
  }

  clear() {
    this[onTapBindings_] = [];
    // TODO Consider whether this[pendingOnTap_] should be cleared
  }

  update() {
    if (this[pendingOnTap_]) {
      console.info('tap pending');
      // TODO Consider constructing special pointer event for pointer command
      for (const command of this[onTapBindings_]) {
        command.execute(this[pendingOnTap_]);
      }

      this[pendingOnTap_] = undefined;
    }
  }
}
