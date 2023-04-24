// --- import --- //
import Enemy from "./enemy.js"


// --- samma sak som bullet handler basically --- //
export default class EnemyHandler{
    enemies = []
    timeTilNextSpawn = 0

    constructor(canvas){
        this.canvas = canvas
    }

    // --- Gör så att det är lite tid mellan fiender --- //
    spawnEnemy(x, y, colour, health, speed, radius, damage, delay) {
                if (this.timeTilNextSpawn <= 0) {
                    this.enemies.push(new Enemy(x, y, colour, health, speed, radius, damage))
                    this.timeTilNextSpawn = delay
                }
                this.timeTilNextSpawn--
        }

        // --- kollar om fienden har lämnat skärmen ---  //
        draw(c) {
            this.enemies.forEach((enemy) => {
                if(this.isEnemyOffscreen(enemy)){
                    const index = this.enemies.indexOf(enemy)
                    this.enemies.splice(index, 1)
                }
            enemy.draw(c)
            })
        }

        isEnemyOffscreen(enemy){
            return enemy.x <= 0
        }

        playerCollide(sprite) {
            return this.enemies.some((enemy) =>{
                if (enemy.playerCollide(sprite)){
                    this.enemies.splice(this.enemies.indexOf(enemy), 1)
                    return true
                }
                return false
            })
        }
    }