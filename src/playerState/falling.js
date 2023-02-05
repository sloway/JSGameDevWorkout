import { PlayerState } from "./playerState.js";
import { PlayerStateList } from "./playerStates.js";

export default class Falling extends PlayerState {
  constructor(player) {
    super("FALLING");
    this.player = player;
  }

  enter() {
    this.player.frameCount = 7;
    this.player.frameY = 2;
  }

  handleInput() {
    if (this.player.isOnGround()) {
      this.player.setState(PlayerStateList.RUNNING, 1);
    }
  }
}
