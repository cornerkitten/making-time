
/* global setInterval */
/* global clearInterval */

import * as Pixi from 'pixi.js';
import TweenLite from 'gsap';
import { COMPONENT } from '../core/constants';

const nextMomentPosition_ = Symbol('nextMomentPosition');
const currentHour_ = Symbol('currentHour');
const currentQuarter_ = Symbol('currentQuarter');
const currentQuarterRow_ = Symbol('currentQuarterRow');
const currentQuarterColumn_ = Symbol('currentQuarterColumn');
const hours_ = Symbol('hours');
const momentTexture_ = Symbol('momentTexture');
const momentSize_ = Symbol('momentSize');
const hourWidth_ = Symbol('hourWidth_');
const hourHeight_ = Symbol('hourHeight_');
const hourSpacing_ = Symbol('hourSpacing_');
const startIntervalId_ = Symbol('startIntervalId');
const startSeconds_ = Symbol('startSeconds_');
// TODO Consider placing all private properties under single object of
//      this[_] or this[private_] or something to that effect...
//      const _ = Symbol('_');

export default class {
  constructor(params, services) {
    const display = services.component(COMPONENT.DISPLAY);
    this[currentHour_] = 0;
    this[currentQuarter_] = 0;
    this[currentQuarterRow_] = 0;
    this[currentQuarterColumn_] = 0;
    this[hours_] = [];
    const camera = services.camera;
    this[hourWidth_] = camera.width / 9; // 128;
    this[hourHeight_] = camera.height / 7;
    this[hourSpacing_] = {
      x: camera.width / 9, // 64
      y: camera.height / 7,
    };
    this[momentSize_] = (this[hourSpacing_].y / 4 / 4) * 0.75; // * 0.5;
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

    const now = new Date();
    this[startSeconds_] = now.getSeconds();
    this[startSeconds_] += now.getMinutes() * 60;
    this[startSeconds_] += (now.getHours() % 12) * 60 * 60;

    this[startIntervalId_] = setInterval(this.fastForward.bind(this), 5); // 1000); // 250
  }

  fastForward() {
    const secondsInQuarter = 900; // 15 minutes * 60 secs/min
    const rowsInQuarter = 4;
    const secondsInQuarterRow = secondsInQuarter / rowsInQuarter;
    if (this[startSeconds_] > secondsInQuarterRow) {
      for (let i = 0; i < secondsInQuarterRow; i += 1) {
        this.emit();
      }
      this[startSeconds_] -= secondsInQuarterRow;
    } else {
      for (let i = 0; i < this[startSeconds_]; i += 1) {
        this.emit();
        this[startSeconds_] = 0;
      }
      clearInterval(this[startIntervalId_]);
      setInterval(this.emit.bind(this), 1000);
    }
  }

  // TODO Ideas
  //  - Fade in particle as it falls
  emit() {
    const secondsInQuarter = 900; // 15 minutes * 60 secs/min
    const rowsInQuarter = 4;
    const secondsInQuarterRow = secondsInQuarter / rowsInQuarter;
    const columnWidth = this[hourWidth_] / secondsInQuarterRow;
    const rowHeight = this[hourHeight_] / rowsInQuarter;
    // const newPos = this[nextMomentPosition_];
    const newPos = {
      x: this[currentQuarterColumn_] * columnWidth,
      y: -(
        (this[currentQuarter_] * rowHeight) +
        (this[currentQuarterRow_] * (this[momentSize_] - 1))
      ),
    };
    const moment = new Pixi.Sprite(this[momentTexture_]);
    moment.x = newPos.x;
    moment.y = -this[hours_][this[currentHour_]].y;
    moment.alpha = 0.25;
    this[hours_][this[currentHour_]].addChild(moment);

    const duration = (this[startSeconds_] > 0 ? 0.75 : 1.5);
    TweenLite.to(moment, duration, { y: newPos.y });
    TweenLite.to(moment, 1, { alpha: 1 });

    this.prepareNextPos();
  }

  prepareNextPos() {
    // const nextPos = this[nextMomentPosition_];
    const secondsInQuarter = 900; // 15 minutes * 60 secs/min
    const rowsInQuarter = 4;
    const secondsInQuarterRow = secondsInQuarter / rowsInQuarter;

    this[currentQuarterColumn_] += 1;
    if (this[currentQuarterColumn_] >= secondsInQuarterRow) {
      this[currentQuarterColumn_] = 0;
      this[currentQuarterRow_] += 1;
    }

    if (this[currentQuarterRow_] >= rowsInQuarter) {
      this[currentQuarterRow_] = 0;
      this[currentQuarter_] += 1;
    }

    if (this[currentQuarter_] >= 4) {
      this[currentQuarter_] = 0;
      this[currentHour_] += 1;
    }

    if (this[currentHour_] >= 12) {
      this[currentHour_] = 0;
      this[hours_].forEach((hourContainer) => {
        hourContainer.removeChildren();
      });
    }

    // if (nextPos.x >= this[hourWidth_]) { // 60
    //   nextPos.x = 0;
    //   nextPos.y -= this[momentSize_] - 2; // this[hourHeight_] / 4; // 12
    // }
    // if (nextPos.y <= -this[hourHeight_]) { // nextPos.y <= -48
    //   this[currentHour_] += 1;
    //   nextPos.y = 0;
    // }
    // if (this[currentHour_] >= this[hours_].length) {
    //   this[currentHour_] = 0;
    //   this[hours_].forEach((hourContainer) => {
    //     hourContainer.removeChildren();
    //   });

    // nextPos.x += this[momentSize_] * 0.75; // 2
    // if (nextPos.x >= this[hourWidth_]) { // 60
    //   nextPos.x = 0;
    //   nextPos.y -= this[momentSize_] - 2; // this[hourHeight_] / 4; // 12
    // }
    // if (nextPos.y <= -this[hourHeight_]) { // nextPos.y <= -48
    //   this[currentHour_] += 1;
    //   nextPos.y = 0;
    // }
    // if (this[currentHour_] >= this[hours_].length) {
    //   this[currentHour_] = 0;
    //   this[hours_].forEach((hourContainer) => {
    //     hourContainer.removeChildren();
    //   });
    // }
  }

  // update() {
  //   // this.emit();
  // }
}
