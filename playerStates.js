const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
};

class State {
  constructor(state) {
    this.state = state;
  }

  enter() {
    throw `Enter method is not implemented yet in ${this.state} state`;
  }

  handleInput() {
    throw `handleInput method is implemented yet in ${this.state} state`;
  }
}

export class Sitting extends State {
  constructor(player) {
    super("SITTING");
    this.player = player;
  }

  enter() {
    this.player.frameY = 5;
  }

  handleInput(input) {
    if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
      this.player.setState(states.RUNNING);
    }
  }
}

export class Running extends State {
  constructor(player) {
    super("RUNNING");
    this.player = player;
  }

  enter() {
    this.player.frameY = 3;
  }

  handleInput(input) {
    if (input.includes("ArrowDown")) {
      this.player.setState(states.SITTING);
    } else if (input.includes("ArrowUp")) {
      this.player.setState(states.JUMPING);
    }
  }
}

export class Jumping extends State {
  constructor(player) {
    super("JUMPING");
    this.player = player;
  }

  enter() {
    if (this.player.isOnGround()) {
      this.player.velocityY -= 27;
    }
    this.player.frameY = 1;
  }

  handleInput() {
    if (this.isAtPeak()) {
      this.player.setState(states.FALLING);
    }
  }

  isAtPeak() {
    return this.player.velocityY > this.player.weight;
  }
}

export class Falling extends State {
  constructor(player) {
    super("FALLING");
    this.player = player;
  }

  enter() {
    this.player.frameY = 2;
  }

  handleInput() {
    if (this.player.isOnGround()) {
      this.player.setState(states.RUNNING);
    }
  }
}
