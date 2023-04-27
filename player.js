export default class Player {
  // --- spelarens parametrar + eventlyssnare för tangentbord --- //
  constructor(x, y, bulletHandler) {
    this.x = x;
    this.y = y;
    this.canvas_x = this.x * 7;
    this.canvas_y = this.y * 2;
    this.bulletHandler = bulletHandler;
    this.width = 80;
    this.height = 60;
    this.speed = 10;
    this.health = 0;
    this.damage = 1;

    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }

  // --- ritar spelaren --- //
  draw(c) {
    this.move();

    c.shadowColor = "white";
    c.strokeStyle = "white";
    c.fillStyle = "white";
    c.shadowBlur = this.health / 2;
    if (this.health <= 30) {
      c.shadowColor = "red"
      c.fillStyle = "red"
      c.strokeStyle = "red"
    } else if (this.health > 100) {
      this.health = 100
    }
    c.beginPath();
    c.moveTo(this.x, this.y + this.height / 2);
    c.lineTo(this.x + this.width, this.y);
    c.lineTo(this.x, this.y - this.height / 2);
    c.closePath();
    c.fill();

    /*         const img = new Image()
        img.onload = () => {
            c.beginPath()
              c.drawImage(img, this.x, this.y - 100)
              c.closePath()
        };
        img.src = "stolen assets/ship.png" */

    this.fire(this.damage);
  }

  // --- skjuter om man trycker på spacebar --- //
  fire(damage) {
    if (this.spacePress) {
      // --- avfyrningens parametrar --- //
      const speed = 30;
      const bulletX = this.x + this.width;
      const bulletY = this.y;
      const delay = 5;
      this.bulletHandler.fire(bulletX, bulletY, speed, damage, delay);
    }
  }

  // --- metod för rörelse --- //
  move() {
    if (this.upPress) {
      this.y = Math.max(this.y - this.speed, this.height / 2);
    }
    if (this.downPress) {
      this.y = Math.min(this.y + this.speed, this.canvas_y - this.height / 2);
    }
    if (this.leftPress) {
      this.x = Math.max(this.x - this.speed, 0);
    }
    if (this.rightPress) {
      this.x = Math.min(this.x + this.speed, this.canvas_x - this.width);
    }
  }

  // --- kollar efter tangenttryck --- //
  keydown = (e) => {
    if (e.code === "ArrowUp" || e.code === "Up") {
      this.upPress = true;
    } else if (e.code === "ArrowDown" || e.code === "Down") {
      this.downPress = true;
    } else if (e.code === "ArrowLeft" || e.code === "Left") {
      this.leftPress = true;
    } else if (e.code === "ArrowRight" || e.code === "Right") {
      this.rightPress = true;
    } else if (e.code === "Space" || e.code === " ") {
      this.spacePress = true;
    }
  };

  // --- kollar om man har släppt tangenten --- //
  keyup = (e) => {
    if (e.code === "ArrowUp" || e.code === "Up") {
      this.upPress = false;
    } else if (e.code === "ArrowDown" || e.code === "Down") {
      this.downPress = false;
    } else if (e.code === "ArrowLeft" || e.code === "Left") {
      this.leftPress = false;
    } else if (e.code === "ArrowRight" || e.code === "Right") {
      this.rightPress = false;
    } else if (e.code === "Space" || e.code === " ") {
      this.spacePress = false;
    }
  };
}
