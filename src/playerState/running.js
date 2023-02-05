import { PlayerState } from "./playerState.js";
import { PlayerStateList } from "./playerStates.js";
import Dust from "../particle/dust.js";

export default class Running extends PlayerState {
  constructor(game) {
    super("RUNNING", game);
  }

  enter() {
    this.game.player.frameCount = 9;
    this.game.player.frameX = 0;
    this.game.player.frameY = 3;
  }

  handleInput(input) {
    this.game.particles.unshift(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.6,
        this.game.player.y + this.game.player.height
      )
    );
    if (input.includes("ArrowDown")) {
      this.game.player.setState(PlayerStateList.SITTING, 0);
    } else if (input.includes("ArrowUp")) {
      this.game.player.setState(PlayerStateList.JUMPING, 1);
    } else if (input.includes("Enter")) {
      this.game.player.setState(PlayerStateList.ROLLING, 2);
    }
  }
}
