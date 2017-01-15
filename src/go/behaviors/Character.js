
/* global window */

/* eslint no-useless-constructor: "off" */
/* eslint no-debugger: "off" */

import { COMPONENT } from '../core/constants';

export default class Character {
  constructor(params, services) {
    const display = services.component(COMPONENT.DISPLAY);
    display.position.x = window.innerWidth / 2;
    display.position.y = 500;
  }
}
