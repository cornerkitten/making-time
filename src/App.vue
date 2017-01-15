<template>
  <div id="app">
    <canvas ref="gameView" id="game-view"></canvas>
  </div>
</template>

<script>
/* global window */

import Engine from './go/core/Engine';
import { SCENE } from './go/resources';

export default {
  name: 'app',
  mounted() {
    const engine = new Engine();
    engine.init(this.$refs.gameView, SCENE.HOME, window.innerWidth, window.innerHeight);
  },
};
</script>

<style lang="scss">
html, body {
  background-color: hsla(0, 0%, 3%, 1);
  margin: 0;
}

#game-view {
  height: 100vh;
  position: fixed;
  width: 100vw;
}
</style>
