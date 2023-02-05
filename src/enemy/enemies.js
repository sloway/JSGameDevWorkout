export default class Enemy {
  constructor() {
    this.initSprite();
    this.initFrameRate();
    this.markedForDeletion = false;
  }

  initSprite() {
    this.frameX = 0;
    this.frameY = 0;
  }

  initFrameRate() {
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }

  update(deltaTime) {
    this.updateTransform();
    this.updateSprite(deltaTime);
    this.updateLifeCycle();
  }

  updateTransform() {
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
  }

  updateSprite(deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (++this.frameX >= this.frameCount) {
        this.frameX = 0;
      }
    } else {
      this.frameTimer += deltaTime;
    }
  }

  updateLifeCycle() {
    if (this.x + this.width < 0) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
