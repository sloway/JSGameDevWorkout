import { Sitting, Running, Jumping, Falling } from "./playerStates.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.initTransform();
    this.initState();
    this.initSprite();
    this.initFrameRate();
  }

  initFrameRate() {
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }

  initSprite() {
    this.image = document.getElementById("player");
    this.frameX = 0;
    this.frameY = 0;
    this.frameCount = 5;
  }

  initTransform() {
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.velocityY = 0;
    this.weight = 1;
    this.speedX = 0;
    this.maxSpeedX = 10;
  }

  initState() {
    this.states = [
      new Sitting(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
    ];

    this.setState(0, 0);
  }

  update(input, deltaTime) {
    this.currentState.handleInput(input);
    this.updateX();
    this.updateSpeedX(input);
    this.updateY();
    this.updateVelocityY();
    this.updateSprite(deltaTime);
  }

  updateX() {
    this.x += this.speedX;

    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width;
    }
  }

  updateSpeedX(input) {
    if (input.includes("ArrowRight")) {
      this.speedX = this.maxSpeedX;
    } else if (input.includes("ArrowLeft")) {
      this.speedX = -this.maxSpeedX;
    } else {
      this.speedX = 0;
    }
  }

  updateY() {
    this.y += this.velocityY;
  }

  updateVelocityY() {
    if (this.isOnGround()) {
      this.velocityY = 0;
    } else {
      this.velocityY += this.weight;
    }
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

  draw(context) {
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  isOnGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
    this.frameX = 0;
  }
}
