import Enemy from "./enemies.js";

export default class ClimbingEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.width = 120;
    this.height = 144;
    this.x = this.game.width;
    this.y = Math.random() * this.width * 0.8;
    this.image = document.getElementById("enemy_spider_big");
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
    this.frameCount = 6;
  }

  update(deltaTime) {
    super.update(deltaTime);
    if (this.isAtGround()) {
      this.speedY *= -1;
    }
    if (this.isOutOfBound()) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    super.draw(context);
    context.beginPath();
    context.moveTo(this.x + this.width / 2, 0);
    context.lineTo(this.x + this.width / 2, this.y + 50);
    context.stroke();
  }

  isAtGround() {
    return this.y > this.game.height - this.height - this.game.groundMargin;
  }

  isOutOfBound() {
    return this.y < -this.height;
  }
}
