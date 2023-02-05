import { PlayerState } from "./playerState.js";
import { PlayerStateList } from "./playerStates.js";

export default class Jumping extends PlayerState {
  constructor(game) {
    super("JUMPING", game);
  }

  enter() {
    if (this.game.player.isOnGround()) {
      this.game.player.velocityY -= 27;
    }
    this.game.player.frameCount = 7;
    this.game.player.frameX = 0;
    this.game.player.frameY = 1;
  }

  handleInput(input) {
    if (this.isAtPeak()) {
      this.game.player.setState(PlayerStateList.FALLING, 1);
    } else if (input.includes("Enter")) {
      this.game.player.setState(PlayerStateList.ROLLING, 2);
    } else if (input.includes("ArrowDown")) {
      this.game.player.setState(PlayerStateList.DIVING, 0);
    }
  }

  isAtPeak() {
    return this.game.player.velocityY > this.game.player.weight;
  }
}
