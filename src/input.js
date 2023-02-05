export class InputHandler {
  constructor(game) {
    this.playKeys = [
      "ArrowDown",
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight",
      "Enter",
    ];
    this.debugKey = "d";
    this.keys = [];
    this.game = game;
    window.addEventListener("keydown", (e) => this.onKeyDown(e.key));
    window.addEventListener("keyup", (e) => this.onKeyUp(e.key));
  }

  isPlayKey(key) {
    return this.playKeys.includes(key);
  }

  isDebugKey(key) {
    return key == this.debugKey;
  }

  toggleDebugMode() {
    this.game.debug = !this.game.debug;
  }

  onKeyDown(key) {
    if (this.isDebugKey(key)) {
      this.toggleDebugMode();
    }

    if (!this.isPlayKey(key)) {
      return;
    }

    if (!this.keys.includes(key)) {
      this.keys.push(key);
    }
  }

  onKeyUp(key) {
    if (!this.isPlayKey(key)) {
      return;
    }

    if (this.keys.includes(key)) {
      this.keys.splice(this.keys.indexOf(key), 1);
    }
  }
}
