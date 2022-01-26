const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");

class Player {
  constructor() {
    this.position = {
      x: 50,
      y: 50,
    };
    this.width = 100;
    this.height = 100;
  }

  draw() {
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const player = new Player();
player.draw();
