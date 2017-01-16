
/* global window */

import * as Pixi from 'pixi.js';
import { COMPONENT } from '../core/constants';

const textDisplay_ = Symbol('textDisplay');

export default class Dialogue {
  constructor(params, services) {
    const display = services.component(COMPONENT.DISPLAY);
    const style = {
      fill: '#eee',
    };
    this[textDisplay_] = new Pixi.Text('i arrived', style);
    this[textDisplay_].position.x = window.innerWidth / 2;
    this[textDisplay_].position.y = window.innerHeight / 2;
    display.addChild(this[textDisplay_]);
  }

  update() {
    this[textDisplay_].position.y -= 5;
  }
}
