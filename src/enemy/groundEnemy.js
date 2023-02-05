import Enemy from "./enemies.js";

export default class GroundEnemy extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 60;
    this.height = 87;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = document.getElementById("enemy_plant");
    this.speedX = 0;
    this.speedY = 0;
    this.frameCount = 2;
  }
}
