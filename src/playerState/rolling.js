import { PlayerState } from "./playerState.js";
import { PlayerStateList } from "./playerStates.js";
import Fire from "../particle/fire.js";

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
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );

    if (!input.includes("Enter") && this.game.player.isOnGround()) {
      this.game.player.setState(PlayerStateList.RUNNING, 1);
    } else if (!input.includes("Enter") && !this.game.player.isOnGround()) {
      this.game.player.setState(PlayerStateList.FALLING, 1);
    } else if (
      input.includes("Enter") &&
      input.includes("ArrowUp") & this.game.player.isOnGround()
    ) {
      this.game.player.velocityY -= 27;
    } else if (input.includes("ArrowDown") && !this.game.player.isOnGround()) {
      this.game.player.setState(PlayerStateList.DIVING, 0);
    }
  }
}
