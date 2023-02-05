import { PlayerState } from "./playerState.js";
import { PlayerStateList } from "./playerStates.js";

export default class Sitting extends PlayerState {
  constructor(player) {
    super("SITTING");
    this.player = player;
  }

  enter() {
    this.player.frameCount = 5;
    this.player.frameY = 5;
  }

  handleInput(input) {
    if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
      this.player.setState(PlayerStateList.RUNNING, 1);
    }
  }
}
