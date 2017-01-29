
/* global setInterval */

import * as Pixi from 'pixi.js';
import TweenLite from 'gsap';
import { COMPONENT } from '../core/constants';

const display_ = Symbol('display');
const nextMomentPosition_ = Symbol('nextMomentPosition');
const currentHour_ = Symbol('currentHour');

export default class {
  constructor(params, services) {
    this[display_] = services.component(COMPONENT.DISPLAY);
    this[currentHour_] = new Pixi.ParticleContainer();
    this[nextMomentPosition_] = {
      x: 128,
      y: 512,
    };

    setInterval(this.emit.bind(this), 250);
  }

  emit() {
    const nextPos = this[nextMomentPosition_];
    const moment = new Pixi.Graphics(this.x);
    moment.x = nextPos.x;
    moment.beginFill(0xd6f5ff);
    moment.drawRect(0, 0, 8, 8);
    moment.endFill();
    this[display_].addChild(moment);

    TweenLite.to(moment, 1.5, { y: nextPos.y });

    nextPos.x += 2;
    if (nextPos.x >= 128 + 60) {
      nextPos.x = 128;
      nextPos.y -= 8;
    }
  }

  // update() {
  //   // this.emit();
  // }
}
