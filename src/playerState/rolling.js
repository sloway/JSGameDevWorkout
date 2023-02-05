import { PlayerState } from "./playerState.js";
import { PlayerStateList } from "./playerStates.js";

export default class Rolling extends PlayerState {
  constructor(player) {
    super("ROLLING");
    this.player = player;
  }

  enter() {
    this.player.frameCount = 7;
    this.player.frameX = 0;
    this.player.frameY = 6;
  }

  handleInput(input) {
    if (input.includes("Enter")) {
      if (input.includes("ArrowUp") && this.player.isOnGround()) {
        this.player.velocityY -= 27;
      }
    } else {
      this.player.setState(
        this.player.isOnGround()
          ? PlayerStateList.RUNNING
          : PlayerStateList.FALLING,
        1
      );
    }
  }
}
