
/* global setInterval */

import * as Pixi from 'pixi.js';
import TweenLite from 'gsap';
import { COMPONENT } from '../core/constants';

const display_ = Symbol('display');
const nextMomentPosition_ = Symbol('nextMomentPosition');

export default class {
  constructor(params, services) {
    this[display_] = services.component(COMPONENT.DISPLAY);
    this[nextMomentPosition_] = {
      x: 0,
      y: 200,
    };

    setInterval(this.emit.bind(this), 250);
  }

  emit() {
    const nextPos = this[nextMomentPosition_];
    const moment = new Pixi.Graphics(this.x);
    moment.x = nextPos.x;
    moment.beginFill(0x111111);
    moment.drawRect(0, 0, 8, 8);
    moment.endFill();
    this[display_].addChild(moment);

    TweenLite.to(moment, 1.5, { y: nextPos.y });

    nextPos.x += 0.25;
    if (nextPos.x >= 60) {
      nextPos.x = 0;
      nextPos.y -= 8;
    }
  }

  // update() {
  //   // this.emit();
  // }
}
