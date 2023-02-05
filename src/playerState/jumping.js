import { PlayerState } from "./playerState.js";
import { PlayerStateList } from "./playerStates.js";

export default class Jumping extends PlayerState {
  constructor(player) {
    super("JUMPING");
    this.player = player;
  }

  enter() {
    if (this.player.isOnGround()) {
      this.player.velocityY -= 27;
    }
    this.player.frameCount = 7;
    this.player.frameY = 1;
  }

  handleInput(input) {
    if (this.isAtPeak()) {
      this.player.setState(PlayerStateList.FALLING, 1);
    } else if (input.includes("Enter")) {
      this.player.setState(PlayerStateList.ROLLING, 2);
    }
  }

  isAtPeak() {
    return this.player.velocityY > this.player.weight;
  }
}
