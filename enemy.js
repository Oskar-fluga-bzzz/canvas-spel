export default class Enemy{
    constructor(x,y,color,health) {
        // --- parametrar --- //
        this.x = x
        this.y = y
        this.color = color
        this.health = health
        this.radius = 50
        this.speed = 10
    }

    // TODO: fixa fiender
    draw(c) {
        this.movementPattern()
        c.fillStyle = this.color
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
        c.fill()
        c.closePath()
    }


    // --- Hur fienden rör sig --- //
    movementPattern() {
        this.x -= this.speed
    }
}