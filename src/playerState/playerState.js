export class PlayerState {
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
