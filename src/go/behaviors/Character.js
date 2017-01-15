
/* global window */

/* eslint no-useless-constructor: "off" */
/* eslint no-debugger: "off" */

import { COMPONENT } from '../core/constants';

const display_ = Symbol('display');

export default class Character {
  constructor(params, services) {
    this[display_] = services.component(COMPONENT.DISPLAY);
    this[display_].position.x = window.innerWidth / 2;
    this[display_].position.y = 500;
  }

  walk(amount) {
    this[display_].position.x += amount;
  }
}
