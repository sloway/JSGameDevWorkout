import { PlayerState } from "./playerState.js";
import { PlayerStateList } from "./playerStates.js";

export default class Sitting extends PlayerState {
  constructor(game) {
    super("SITTING", game);
  }

  enter() {
    this.game.player.frameCount = 5;
    this.game.player.frameX = 0;
    this.game.player.frameY = 5;
  }

  handleInput(input) {
    if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
      this.game.player.setState(PlayerStateList.RUNNING, 1);
    } else if (input.includes("Enter")) {
      this.game.player.setState(PlayerStateList.ROLLING, 2);
    }
  }
}
