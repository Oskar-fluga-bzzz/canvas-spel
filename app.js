// --- import --- //
import Player from "./player.js"
import BulletHandler from "./BulletHandler.js"
import EnemyHandler from "./EnemyHandler.js"


// --- canvas fönstret --- //
const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.width = "100%"
canvas.style.height = "100%"


// --- SOUNDENGINE5000MK2 --- //
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


// --- ändrar utseendet lite --- //
function setStyle() {
  c.shadowBlur = 30
  c.lineJoin = "bevel"
  c.lineWidth = 5
}


// --- spawnfunktion för fiender --- //
function enemySpawn() {
  const enemy_x = canvas.width
  const enemy_y = canvas.height / 2
  const enemy_colour = "red"
  const enemy_health = 3
  const enemy_speed = 10
  const enemy_radius = 50
  const enemy_damage = 20
  const enemy_delay = 40
  enemyHandler.spawnEnemy(enemy_x, enemy_y, enemy_colour, enemy_health, enemy_speed, enemy_radius, enemy_damage, enemy_delay)
}


// --- hanterar skott --- //
const bulletHandler = new BulletHandler(canvas)

// --- tar in spelaren --- //
const player = new Player(canvas.width / 7, canvas.height / 2, bulletHandler)

// --- fiender --- //
const enemyHandler = new EnemyHandler(canvas)

// --- main loop --- //
function gameLoop() {
  setStyle()
  c.fillStyle = "black"
  c.fillRect(0, 0, canvas.width, canvas.height)

  bulletHandler.draw(c)
  player.draw(c)

  enemyHandler.draw(c)
  enemySpawn()

  // --- kollosion --- //
  enemyHandler.enemies.forEach((enemy) => {
    if (bulletHandler.collideWith(enemy)) {
      if(enemy.health <= 0) {
        const index = enemyHandler.enemies.indexOf(enemy)
        enemyHandler.enemies.splice(index, 1)
      }
    }
  })

}

// --- spelar musik --- //
//var myMusic
//myMusic = new sound("content/Guitarmass.mp3")
//myMusic.play()


// --- intervall --- //
setInterval(gameLoop, 1000 / 60)