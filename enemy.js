export default class Enemy{
    constructor(x, y, colour, health, speed, radius, damage) {
        // --- parametrar --- //
        this.x = x
        this.y = y
        this.colour = colour
        this.health = health
        this.speed = speed
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
        this.x -= this.speed
    }


    ouchie(damage){
        this.health -= damage
    }

    playerCollide(sprite){
        const dx = this.x - sprite.x
        const dy = this.y - sprite.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if(
            distance <= sprite.width + this.radius
        ){
        sprite.health -= this.damage
        return true
        }
        return false
    }
}