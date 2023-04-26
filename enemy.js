export default class Enemy{
    constructor(x, y, colour, health, xspeed, yspeed, radius, damage) {
        // --- parametrar --- //
        this.x = x
        this.y = y
        this.canvas_x = this.x
        this.canvas_y = this.y * 2
        this.colour = colour
        this.health = health
        this.xSpeed = xspeed
        this.ySpeed = yspeed
        this.radius = radius
        this.damage = damage
    }


    // --- ritar fiender --- //
    draw(c) {
        this.movementPattern()
        if (this.health >= 2) {
            c.strokeStyle = "orange"
        } else {
            c.strokeStyle = this.colour
        }
        c.fillStyle = this.colour
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)

        c.fill()
        c.stroke()
        c.fillStyle = "black"
        c.font = "25px Arial"
        c.fillText(
            this.health,
            this.x,
            this.y
        )
        c.closePath()
    }


    // --- Hur fienden rör sig --- //
    movementPattern() {
        this.x -= this.xSpeed
        if (this.y + this.radius > this.canvas_y)
        this.ySpeed = 0 - this.ySpeed

        if (this.y - this.radius < 0)
        this.ySpeed = 0 - this.ySpeed

        this.y = this.y + this.ySpeed
    }


    /// --- när man tar skada --- ///
    ouchie(damage){
        this.health -= damage
    }


    playerCollide(sprite){
        const dx = this.x - sprite.x - sprite.width / 2 + 100
        const dy = this.y - sprite.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if(
            distance <= sprite.height + this.radius
        ){
        sprite.health -= this.damage
        return true
        }
        return false
    }
}