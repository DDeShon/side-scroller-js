const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.5;

const image = new Image();
image.src = "./img/ground.png";
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

class Ground {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
      image,
    };

    this.image = image;
    this.width = 599;
    this.height = image.height;
  }

  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

const player = new Player();
const grounds = [
  new Ground({ x: 0, y: 900, image }),
  new Ground({ x: 800, y: 900, image }),
  new Ground({ x: 1600, y: 900, image }),
];

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  grounds.forEach((ground) => {
    ground.draw();
  });

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    grounds.forEach((ground) => {
      if (keys.right.pressed) {
        ground.position.x -= 5;
      } else if (keys.left.pressed) {
        ground.position.x += 5;
      }
    });
  }

  // ground collision detection
  grounds.forEach((ground) => {
    if (
      player.position.y + player.height <= ground.position.y &&
      player.position.y + player.height + player.velocity.y >=
        ground.position.y &&
      player.position.x + player.width >= ground.position.x &&
      player.position.x <= ground.position.x + ground.width
    ) {
      player.velocity.y = 0;
    }
  });

  player.update();
}
animate();

addEventListener("keydown", ({ keyCode }) => {
  //   console.log(keyCode);
  switch (keyCode) {
    case 65:
      keys.left.pressed = true;
      break;

    case 68:
      keys.right.pressed = true;
      break;

    case 87:
      player.velocity.y = -10;
      break;

    case 83:
      player.velocity.y = 10;
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  //   console.log(keyCode);
  switch (keyCode) {
    case 65:
      keys.left.pressed = false;
      break;

    case 68:
      keys.right.pressed = false;
      break;

    case 87:
      break;

    case 83:
      break;
  }
});
