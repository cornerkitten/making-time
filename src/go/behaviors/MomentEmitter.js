
/* global setInterval */

import * as Pixi from 'pixi.js';
import TweenLite from 'gsap';
import { COMPONENT } from '../core/constants';

const display_ = Symbol('display');
const nextMomentPosition_ = Symbol('nextMomentPosition');
const currentHour_ = Symbol('currentHour');
const momentTexture_ = Symbol('momentTexture');

export default class {
  constructor(params, services) {
    this[display_] = services.component(COMPONENT.DISPLAY);
    this[currentHour_] = new Pixi.particles.ParticleContainer();
    this[currentHour_].x = 128;
    this[currentHour_].y = 512;
    this[display_].addChild(this[currentHour_]);

    this[nextMomentPosition_] = {
      x: 0,
      y: 0,
    };

    const moment = new Pixi.Graphics();
    moment.beginFill(0xd6f5ff);
    moment.drawRect(0, 0, 4, 4);
    moment.endFill();
    this[momentTexture_] = moment.generateTexture();

    setInterval(this.emit.bind(this), 250);
  }

  // TODO Ideas
  //  - Fade in particle as it falls
  emit() {
    const nextPos = this[nextMomentPosition_];
    const momentSprite = new Pixi.Sprite(this[momentTexture_]);
    momentSprite.x = nextPos.x;
    momentSprite.y = -this[currentHour_].y;
    this[currentHour_].addChild(momentSprite);

    TweenLite.to(momentSprite, 1.5, { y: nextPos.y });

    nextPos.x += 2;
    if (nextPos.x >= 60) {
      nextPos.x = 0;
      nextPos.y -= 8;
    }
  }

  // update() {
  //   // this.emit();
  // }
}
