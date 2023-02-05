import { PlayerState } from "./playerState.js";
import { PlayerStateList } from "./playerStates.js";
import Fire from "../particle/fire.js";

export default class Diving extends PlayerState {
  constructor(game) {
    super("DIVING", game);
  }

  enter() {
    this.game.player.frameCount = 7;
    this.game.player.frameX = 0;
    this.game.player.frameY = 6;
    this.game.player.velocityY = 15;
  }

  handleInput(input) {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height
      )
    );
    if (this.game.player.isOnGround()) {
      this.game.player.setState(PlayerStateList.RUNNING, 1);
    } else if (input.includes("Enter") && this.game.player.isOnGround()) {
      this.game.player.setState(PlayerStateList.ROLLING, 2);
    }
  }
}
