export class InputHandler {
  constructor() {
    this.supportedKeys = [
      "ArrowDown",
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight",
      "Enter",
    ];
    this.keys = [];
    window.addEventListener("keydown", (e) => this.onKeyDown(e.key));
    window.addEventListener("keyup", (e) => this.onKeyUp(e.key));
  }

  isSupportedKey(key) {
    return this.supportedKeys.includes(key);
  }

  onKeyDown(key) {
    if (!this.isSupportedKey(key)) {
      return;
    }

    if (!this.keys.includes(key)) {
      this.keys.push(key);
    }
  }

  onKeyUp(key) {
    if (!this.isSupportedKey(key)) {
      return;
    }

    if (this.keys.includes(key)) {
      this.keys.splice(this.keys.indexOf(key), 1);
    }
  }
}
