export class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height;
    this.image = document.getElementById("player");
    this.velocityY = 0;
    this.weight = 1;
    this.velocityX = 0;
    this.maxVelocityX = 10;
  }

  update(input) {
    this.updateX();
    this.updateVelocityX(input);
    this.updateY(input);
    this.updateVelocityY();
  }

  updateX() {
    this.x += this.velocityX;

    if (this.x < 0) this.x = 0;
    else if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
  }

  updateVelocityX(input) {
    if (input.includes("ArrowRight")) this.velocityX = this.maxVelocityX;
    else if (input.includes("ArrowLeft")) this.velocityX = -this.maxVelocityX;
    else this.velocityX = 0;
  }

  updateY(input) {
    if (input.includes("ArrowUp") && this.isOnGround()) this.velocityY -= 20;
    this.y += this.velocityY;
  }

  updateVelocityY() {
    if (this.isOnGround()) {
      this.velocityY = 0;
    } else {
      this.velocityY += this.weight;
    }
  }

  draw(context) {
    context.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  isOnGround() {
    return this.y >= this.game.height - this.height;
  }
}
