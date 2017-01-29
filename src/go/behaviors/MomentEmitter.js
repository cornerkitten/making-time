
/* global setInterval */

import * as Pixi from 'pixi.js';
import TweenLite from 'gsap';
import { COMPONENT } from '../core/constants';

const nextMomentPosition_ = Symbol('nextMomentPosition');
const currentHour_ = Symbol('currentHour');
const hours_ = Symbol('hours');
const momentTexture_ = Symbol('momentTexture');
const momentSize_ = Symbol('momentSize');
const hourWidth_ = Symbol('hourWidth_');
const hourHeight_ = Symbol('hourHeight_');
const hourSpacing_ = Symbol('hourSpacing_');
// TODO Consider placing all private properties under single object of
//      this[_] or this[private_] or something to that effect...
//      const _ = Symbol('_');

export default class {
  constructor(params, services) {
    const display = services.component(COMPONENT.DISPLAY);
    this[currentHour_] = 0;
    this[hours_] = [];
    const camera = services.camera;
    this[hourWidth_] = camera.width / 9; // 128;
    this[hourHeight_] = camera.height / 7;
    this[hourSpacing_] = {
      x: camera.width / 9, // 64
      y: camera.height / 7,
    };
    this[momentSize_] = (this[hourSpacing_].y / 4) * 0.5;
    const HOURS_PER_ROW = 4;

    for (let i = 0; i < 12; i += 1) {
      const column = i % HOURS_PER_ROW;
      const row = Math.floor(i / HOURS_PER_ROW);
      const hourContainer = new Pixi.particles.ParticleContainer(
        15000,
        {
          alpha: true,
        },
      );
      hourContainer.x = this[hourSpacing_].x + (column * (this[hourWidth_] + this[hourSpacing_].x));
      hourContainer.y = (camera.height - this[hourSpacing_].y) -
        (row * (this[hourHeight_] + this[hourSpacing_].y));
      this[hours_].push(hourContainer);
      display.addChild(hourContainer);
    }

    this[nextMomentPosition_] = {
      x: 0,
      y: 0,
    };

    const moment = new Pixi.Graphics();
    moment.beginFill(0xd6f5ff);
    moment.drawRect(0, 0, this[momentSize_], this[momentSize_]);
    moment.endFill();
    this[momentTexture_] = moment.generateTexture();

    setInterval(this.emit.bind(this), 1000); // 250
  }

  // TODO Ideas
  //  - Fade in particle as it falls
  emit() {
    const nextPos = this[nextMomentPosition_];
    const moment = new Pixi.Sprite(this[momentTexture_]);
    moment.x = nextPos.x;
    moment.y = -this[hours_][this[currentHour_]].y;
    moment.alpha = 0.25;
    this[hours_][this[currentHour_]].addChild(moment);

    TweenLite.to(moment, 1.5, { y: nextPos.y });
    TweenLite.to(moment, 1, { alpha: 1 });

    nextPos.x += this[momentSize_] * 0.75; // 2
    if (nextPos.x >= this[hourWidth_]) { // 60
      nextPos.x = 0;
      nextPos.y -= this[hourHeight_] / 4; // 12
    }
    if (nextPos.y <= -this[hourHeight_]) { // nextPos.y <= -48
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
