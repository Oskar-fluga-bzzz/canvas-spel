export default class Enemy{
    constructor(x, y, colour, health, xspeed, yspeed, radius, damage, cx, cy) {
        // --- parametrar --- //
        this.x = x
        this.y = y
        this.canvas_x = cx
        this.canvas_y = cy
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
        c.strokeStyle = this.colour
        c.fillStyle = "black"
        c.lineWidth = this.health * 4
        c.shadowColor = this.colour
        c.shadowBlur = 10
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
        const dx = this.x - sprite.x - sprite.width / 2
        const dy = this.y - sprite.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if(
            distance <= sprite.height + this.radius - 50
        ){
        sprite.health -= this.damage
        return true
        }
        return false
    }
}