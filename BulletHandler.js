// --- import --- //
import Bullet from "./Bullets.js"


export default class BulletHandler {
    // --- array för skott --- //
    bullets = []
    timeTilNextShot = 0

    constructor(canvas){
        this.canvas = canvas
    }

    // --- gör så att det är lite tid mellan skott --- //
    fire(x,y,speed,damage,delay) {
        if (this.timeTilNextShot <= 0) {
            this.bullets.push(new Bullet(x, y, speed, damage))
            this.timeTilNextShot = delay
        }

        this.timeTilNextShot--
    }

    // --- kollar om skottet fortfarande är på skärmen och tar bort det om det inte är på skärmen --- //
    draw(c) {
        this.bullets.forEach((bullet) => {
            if(this.isBulletOffScreen(bullet)){
                const index = this.bullets.indexOf(bullet)
                this.bullets.splice(index, 1)
            }    
        bullet.draw(c)
        })
    }

    isBulletOffScreen(bullet){
        return bullet.x >= this.canvas.width
    }
}