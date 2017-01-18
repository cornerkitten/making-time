
/* global window */

/* eslint no-useless-constructor: "off" */
/* eslint no-debugger: "off" */

import TweenLite from 'gsap';

import { COMPONENT } from '../core/constants';

const display_ = Symbol('display');
const services_ = Symbol('services');

export default class Character {
  constructor(params, services) {
    this[display_] = services.component(COMPONENT.DISPLAY);
    this[services_] = services;
    // this[display_].position.x = window.innerWidth / 2;
    // this[display_].position.y = 100;
  }

  open() {
    TweenLite.to(this[display_].anchor, 0.5, { x: 0.5, y: 0.5 });
    TweenLite.to(this[display_].position, 0.5, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    TweenLite.to(this[display_], 0.5, {
      width: window.innerWidth * 4,
      height: window.innerHeight * 2,
      onComplete: () => this[services_].changeScene('phone'),
    });
  }
}
