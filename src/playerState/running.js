import { PlayerState } from "./playerState.js";
import { PlayerStateList } from "./playerStates.js";

export default class Running extends PlayerState {
  constructor(player) {
    super("RUNNING");
    this.player = player;
  }

  enter() {
    this.player.frameCount = 9;
    this.player.frameY = 3;
  }

  handleInput(input) {
    if (input.includes("ArrowDown")) {
      this.player.setState(PlayerStateList.SITTING, 0);
    } else if (input.includes("ArrowUp")) {
      this.player.setState(PlayerStateList.JUMPING, 1);
    } else if (input.includes("Enter")) {
      this.player.setState(PlayerStateList.ROLLING, 2);
    }
  }
}
