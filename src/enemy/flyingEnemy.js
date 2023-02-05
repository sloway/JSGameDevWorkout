import Enemy from "./enemies.js";

export default class FlyingEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.width = 60;
    this.height = 44;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.frameCount = 6;
    this.image = document.getElementById("enemy_fly");
    this.angle = 0;
    this.velocityAngle = Math.random() * 0.1 + 0.1;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.velocityAngle;
    this.y += Math.sin(this.angle);
  }
}
