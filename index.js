const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.5;
class Player {
  constructor() {
    this.position = {
      x: 50,
      y: 50,
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.width = 50;
    this.height = 50;
  }

  draw() {
    context.fillStyle = "blue";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.velocity.y += gravity;
  }
}

const player = new Player();
player.update();

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
}
animate();
