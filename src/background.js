class Layer {
  constructor(game, width, height, speedModifier, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }

  update() {
    if (this.x < -this.width) {
      this.x = 0;
    } else {
      this.x -= this.game.speed * this.speedModifier;
    }
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = this.game.width;
    this.height = this.game.height;
    this.initLayers();
  }

  initLayers() {
    this.backgroundLayers = [];
    for (let i = 1; i < 5; ++i) {
      let image = document.getElementById("layer" + (i + 1));
      let speedModifier = 0.2 + 0.2 * i;
      this.backgroundLayers.push(
        new Layer(this.game, this.width, this.height, speedModifier, image)
      );
    }
  }

  update() {
    this.backgroundLayers.forEach((layer) => {
      layer.update();
    });
  }

  draw(context) {
    this.backgroundLayers.forEach((layer) => {
      layer.draw(context);
    });
  }
}
