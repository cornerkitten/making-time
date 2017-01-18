
/* global window */

import * as Pixi from 'pixi.js';
import TweenLite from 'gsap';
import { COMPONENT } from '../core/constants';

const textDisplay_ = Symbol('textDisplay');

export default class Dialogue {
  constructor(params, services) {
    const display = services.component(COMPONENT.DISPLAY);
    const style = {
      // TODO Customize style away from example found in Pixi.js's examples
      //      <http://pixijs.github.io/examples/#/basics/text.js>
      fontFamily: 'Arial',
      fontSize: '36px',
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: '#4a1850',
      stroke: '#F7EDCA',
      strokeThickness: 5,
      dropShadow: false,
      dropShadowColor: '#F7EDCA',
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 3,
      wordWrap: true,
      wordWrapWidth: 440,
    };
    this[textDisplay_] = new Pixi.Text('i arrived', style);
    this[textDisplay_].position.x = window.innerWidth / 2;
    this[textDisplay_].position.y = window.innerHeight / 2;
    display.addChild(this[textDisplay_]);

    TweenLite.to([this[textDisplay_].position], 1, { y: 0 });
  }

  // update() {
  //   this[textDisplay_].position.y -= 5;
  // }
}
