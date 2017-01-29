
/* global window.innerWidth */
/* global window.innerHeight */

const renderer_ = Symbol('renderer');

export default class {
  constructor(renderer) {
    this[renderer_] = renderer;
  }

  get width() {
    return this[renderer_].width;
  }

  get height() {
    return this[renderer_].height;
  }
}
