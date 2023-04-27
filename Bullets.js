export default class Bullet {
  constructor(x, y, speed, damage) {
    // ---  parametrar för skottet --- //
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;
    this.radius = 10;
    this.color = "white";
  }

  // --- ritar skotten --- //
  draw(c) {
    c.fillStyle = this.color;
    this.x += this.speed;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    c.fill();
    c.closePath;
  }

  collideWith(sprite) {
    const dx = sprite.x - this.x;
    const dy = sprite.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance <= sprite.radius + this.radius) {
      sprite.ouchie(this.damage);
      return true;
    }
    return false;
  }
}
