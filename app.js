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


// --- random nummer --- //
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}


const colours = [
  "92140C",
  "297373",
  "CF1259",
  "7EBDC3",
  "7BF1A8",
  "90F1EF"
]


// --- spawnfunktion för fiender --- //
let enemy_x = canvas.width
let enemy_y = canvas.height / 2
let enemy_colour = "red"
let enemy_health = 3
let enemy_xspeed = 3
let enemy_yspeed = 3
let enemy_radius = 40
let enemy_damage = 1
let enemy_delay = 11
let timeTilRefresh = 0
function enemySpawn() {
  if (timeTilRefresh <= 0) {
    enemy_colour = colours[getRandomArbitrary(1, 4)]
    enemy_health = getRandomArbitrary(3, 5)
    enemy_xspeed = getRandomArbitrary(1, 3)
    enemy_yspeed = getRandomArbitrary(-7, 7)
    enemy_radius = enemy_health * 10
    enemy_delay = getRandomArbitrary(10, 15)
    timeTilRefresh = 500
  }
  timeTilRefresh --
  enemyHandler.spawnEnemy(enemy_x, enemy_y, enemy_colour, enemy_health, enemy_xspeed, enemy_yspeed, enemy_radius, enemy_damage, enemy_delay)
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

  c.fillStyle = "white"
  c.font = "75px Arial"
  c.fillText(
    player.health,
    50,
    100
  )

  // --- kollosion --- //
  enemyHandler.enemies.forEach((enemy) => {
    if (bulletHandler.collideWith(enemy)) {
      if(enemy.health <= 0) {
        const index = enemyHandler.enemies.indexOf(enemy)
        enemyHandler.enemies.splice(index, 1)
      }
    }
    if (enemyHandler.playerCollide(player)) {
      if (player.health <= 0) {
      clearInterval(intervalID)
      c.fillStyle = "black"
      c.fillRect(0, 0, canvas.width, canvas.height)
      c.fillStyle = "red"
      c.font = "75px Arial"
      c.fillText(
          "You Are Dead",
          50,
          100
      )
      }
    }
  })

}

// --- spelar musik --- //
var myMusic
myMusic = new sound("content/Guitarmass.mp3")
myMusic.play()


// --- intervall --- //
let intervalID
intervalID = setInterval(gameLoop, 1000 / 60)