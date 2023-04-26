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
  c.shadowBlur = 0
  c.lineJoin = "bevel"
  c.lineWidth = 10
}


// --- random nummer --- //
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}


// --- färger för fiender --- //
const colours = [
  "#1afe49",
  "#f887ff",
  "#de004e",
  "#e96d5e",
  "#ff9760",
  "#ff124f",
  "#ff00a0",
  "#fe75f3",
  "#73fffe",
  "#ff6e27",
  "#c4ffff",
  "#08deea",
  "#1261d1",
  "#65dc98",
  "#a0ffe3",
  "#ff2a6d",
  "#05d9e8"
]


let enemy_x
let enemy_y
let enemy_colour
let enemy_health
let enemy_xspeed
let enemy_yspeed
let enemy_radius
let enemy_damage
let enemy_delay
let timeTilRefresh = 0
let diffThreshold = 0
let waveCounter = 0
// --- spawnfunktion för fiender --- //
function enemySpawn() {
  // --- Slumpar fienders egenskaper --- //
  if (timeTilRefresh <= 0) {
    enemy_colour = colours[getRandomArbitrary(0, colours.length)]
    enemy_health = getRandomArbitrary(3 + diffThreshold, 5 + diffThreshold)
    enemy_xspeed = getRandomArbitrary(3 + diffThreshold, 5 + diffThreshold)
    enemy_yspeed = getRandomArbitrary(-6, 6)
    enemy_radius = 30 + enemy_health * 5
    enemy_damage = 1
    enemy_delay = getRandomArbitrary(15, 20)
    enemy_x = canvas.width + enemy_radius
    enemy_y = getRandomArbitrary(enemy_radius, canvas.height - enemy_radius)
    timeTilRefresh = 100
    waveCounter += 1
  }
  // --- gör spelet svårare med tiden --- //
  if (waveCounter == 10){
    player.damage += 0.5
    diffThreshold ++
    waveCounter = 0
  }
  timeTilRefresh --
  enemyHandler.spawnEnemy(enemy_x, enemy_y, enemy_colour, enemy_health, enemy_xspeed, enemy_yspeed, enemy_radius, enemy_damage, enemy_delay, canvas.width, canvas.height)
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

  c.fillStyle = "white"
  c.font = "75px Arial"
  c.fillText(
    player.health,
    50,
    100
  )

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