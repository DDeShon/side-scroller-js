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
      y: 0,
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
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    else this.velocity.y = 0;
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

addEventListener("keydown", ({ keyCode }) => {
  //   console.log(keyCode);
  switch (keyCode) {
    case 65:
      console.log("left");
      player.velocity.x -= 1;
      break;

    case 68:
      console.log("right");
      player.velocity.x += 1;
      break;

    case 87:
      console.log("up");
      player.velocity.y -= 10;
      break;

    case 83:
      console.log("down");
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  //   console.log(keyCode);
  switch (keyCode) {
    case 65:
      // console.log("left");
      player.velocity.x = 0;
      break;

    case 68:
      // console.log("right");
      player.velocity.x = 0;
      break;

    case 87:
      // console.log("up");
      break;

    case 83:
      // console.log("down");
      break;
  }
});
