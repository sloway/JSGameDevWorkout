import { PlayerState } from "./playerState.js";
import { PlayerStateList } from "./playerStates.js";

export default class Rolling extends PlayerState {
  constructor(game) {
    super("ROLLING", game);
  }

  enter() {
    this.game.player.frameCount = 7;
    this.game.player.frameX = 0;
    this.game.player.frameY = 6;
  }

  handleInput(input) {
    if (input.includes("Enter")) {
      if (input.includes("ArrowUp") && this.game.player.isOnGround()) {
        this.game.player.velocityY -= 27;
      }
    } else {
      this.game.player.setState(
        this.game.player.isOnGround()
          ? PlayerStateList.RUNNING
          : PlayerStateList.FALLING,
        1
      );
    }
  }
}
