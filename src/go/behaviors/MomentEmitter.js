
/* global setInterval */

import * as Pixi from 'pixi.js';
import TweenLite from 'gsap';
import { COMPONENT } from '../core/constants';

const display_ = Symbol('display');
const nextMomentPosition_ = Symbol('nextMomentPosition');
const currentHour_ = Symbol('currentHour');
const hours_ = Symbol('hours');
const momentTexture_ = Symbol('momentTexture');

export default class {
  constructor(params, services) {
    this[display_] = services.component(COMPONENT.DISPLAY);
    this[currentHour_] = 0;
    this[hours_] = [];
    const HOUR_WIDTH = 128;
    const HOUR_HEIGHT = HOUR_WIDTH;
    const HOUR_SPACING = 64;
    const HOURS_PER_ROW = 4;

    for (let i = 0; i < 12; i += 1) {
      const column = i % HOURS_PER_ROW;
      const row = Math.floor(i / 4);
      const hourContainer = new Pixi.particles.ParticleContainer();
      hourContainer.x = 128 + (column * (HOUR_WIDTH + HOUR_SPACING));
      hourContainer.y = 512 - (row * (HOUR_HEIGHT + HOUR_SPACING));
      this[hours_].push(hourContainer);
      this[display_].addChild(hourContainer);
    }

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
    momentSprite.y = -this[hours_][this[currentHour_]].y;
    this[hours_][this[currentHour_]].addChild(momentSprite);

    TweenLite.to(momentSprite, 1.5, { y: nextPos.y });

    nextPos.x += 2;
    if (nextPos.x >= 60) {
      nextPos.x = 0;
      nextPos.y -= 8;
    }
    if (nextPos.y <= -32) {
      this[currentHour_] += 1;
      nextPos.y = 0;
    }
    if (this[currentHour_] >= this[hours_].length) {
      this[currentHour_] = 0;
      this[hours_].forEach((hourContainer) => {
        hourContainer.removeChildren();
      });
    }
  }

  // update() {
  //   // this.emit();
  // }
}
