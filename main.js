import Stats from "./Stats.js";
import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
var stats;
function initPerformanceMonitor() {
  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
}

window.addEventListener("load", () => {
  initPerformanceMonitor();

  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 80;
      this.speed = 3;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler();
    }

    update(deltaTime) {
      this.background.update(deltaTime);
      this.player.update(this.input.keys, deltaTime);
    }

    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
    }
  }

  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;
  function animate(timestamp) {
    stats.begin();

    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);

    stats.end();
    requestAnimationFrame(animate);
  }

  animate(0);
});
