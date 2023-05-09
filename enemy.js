export default class Enemy {
  constructor(x, y, colour, health, xspeed, yspeed, radius, damage, cx, cy) {
    // --- parametrar --- //
    this.x = x;
    this.y = y;
    this.canvas_x = cx;
    this.canvas_y = cy;
    this.colour = colour;
    this.health = health;
    this.xSpeed = xspeed;
    this.ySpeed = yspeed;
    this.radius = radius;
    this.damage = damage;
  }

  // --- ritar fiender --- //
  draw(c) {
    this.movementPattern();
    c.strokeStyle = this.colour;
    c.fillStyle = "black";
    c.lineWidth = this.health * 4;
    c.shadowColor = this.colour;
    c.shadowBlur = 30;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    c.fill();
    c.stroke();
    c.closePath();
  }

  // --- Hur fienden rör sig --- //
  movementPattern() {
    this.x -= this.xSpeed;
    if (this.y + this.radius > this.canvas_y - 50) this.ySpeed = 0 - this.ySpeed;

    if (this.y - this.radius < 0) this.ySpeed = 0 - this.ySpeed;

    this.y = this.y + this.ySpeed;
  }

  /// --- när man tar skada --- ///
  ouchie(damage) {
    this.health -= damage;
  }

  playerCollide(sprite) {
    const dx1 = this.x - sprite.x;
    const dy1 = this.y - sprite.y - sprite.height / 2;
    const dx2 = this.x - sprite.x - sprite.width;
    const dy2 = this.y - sprite.y;
    const dx3 = this.x - sprite.x;
    const dy3 = this.y - sprite.y + sprite.height / 2;

    const distance_1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    const distance_2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
    const distance_3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);
    if (
      distance_1 <= this.radius ||
      distance_2 <= this.radius ||
      distance_3 <= this.radius
    ) {
      sprite.health -= this.damage;
      return true;
    }
    return false;
  }
}
