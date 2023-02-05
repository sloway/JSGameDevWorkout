import { PlayerState } from "./playerState.js";
import { PlayerStateList } from "./playerStates.js";

export default class Hit extends PlayerState {
  constructor(game) {
    super("HIT", game);
  }

  enter() {
    this.game.player.frameCount = 11;
    this.game.player.frameX = 0;
    this.game.player.frameY = 4;
  }

  handleInput() {
    if (this.game.player.frameX >= this.game.player.frameCount - 1) {
      if (this.game.player.isOnGround()) {
        this.game.player.setState(PlayerStateList.RUNNING, 1);
      } else {
        this.game.player.setState(PlayerStateList.FALLING, 1);
      }
    }
  }
}
