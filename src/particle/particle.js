export default class Particle {
  constructor(game) {
    this.game = game;
    this.makredForDeletion = false;
  }

  update() {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= 0.95;
    if (this.size < 0.5) {
      this.makredForDeletion = true;
    }
  }
}
