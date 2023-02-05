export class PlayerState {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }

  enter() {
    throw `Enter method is not implemented yet in ${this.state} state`;
  }

  handleInput() {
    throw `handleInput method is implemented yet in ${this.state} state`;
  }
}
