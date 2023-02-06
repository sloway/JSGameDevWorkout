import Stats from "./Stats.js";
import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./enemy/enemies.js";
import { UI } from "./UI.js";
import { getMedia } from "./webcam.js";
var stats;
function initPerformanceMonitor() {
  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);
}

window.addEventListener("load", async () => {
  initPerformanceMonitor();

  await getMedia();

  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1600;
  canvas.height = 900;

  const webcam = document.getElementById("webcam");
  webcam.width = canvas.width;
  webcam.height = canvas.height;
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 150;
      this.speed = 0;
      this.maxSpeed = 3;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.maxPartiles = 200;
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.debug = false;
      this.score = 0;
      this.winningScore = 40;
      this.fontColor = "black";
      this.time = 0;
      this.maxTime = 300000;
      this.gameOver = false;
      this.lives = 50;
      this.player.setDefaultState();
    }

    update(deltaTime) {
      this.time += deltaTime;
      if (this.time > this.maxTime) {
        this.gameOver = true;
      }
      this.background.update(deltaTime);
      this.player.update(this.input.keys, deltaTime);

      if (this.enemyTimer > this.enemyInterval) {
        this.enemyTimer = 0;
        this.addEnemy();
      } else {
        this.enemyTimer += deltaTime;
      }

      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
      });

      this.floatingMessages.forEach((message) => {
        message.update(deltaTime);
      });

      this.particles.forEach((particle) => {
        particle.update();
      });

      if (this.particles.length > this.maxPartiles) {
        this.particles.length = this.maxPartiles;
      }

      this.collisions.forEach((collision) => {
        collision.update(deltaTime);
      });

      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      this.particles = this.particles.filter(
        (particle) => !particle.markedForDeletion
      );
      this.collisions = this.collisions.filter(
        (collision) => !collision.markedForDeletion
      );
      this.floatingMessages = this.floatingMessages.filter(
        (message) => !message.markedForDeletion
      );
    }

    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      this.particles.forEach((particle) => {
        particle.draw(context);
      });
      this.collisions.forEach((collision) => {
        collision.draw(context);
      });
      this.floatingMessages.forEach((message) => {
        message.draw(context);
      });
      this.UI.draw(context);
    }

    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5) {
        this.enemies.push(new GroundEnemy(this));
      } else if (this.speed > 0) {
        this.enemies.push(new ClimbingEnemy(this));
      }
      this.enemies.push(new FlyingEnemy(this));
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
    if (!game.gameOver) {
      requestAnimationFrame(animate);
    }
  }

  animate(0);
});
