import { PlayerState } from "./playerState.js";
import { PlayerStateList } from "./playerStates.js";

export default class Falling extends PlayerState {
  constructor(game) {
    super("FALLING", game);
  }

  enter() {
    this.game.player.frameCount = 7;
    this.game.player.frameY = 2;
  }

  handleInput() {
    if (this.game.player.isOnGround()) {
      this.game.player.setState(PlayerStateList.RUNNING, 1);
    }
  }
}
