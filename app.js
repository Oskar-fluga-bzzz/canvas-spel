// --- import --- //
import Player from "./player.js"
import BulletHandler from "./BulletHandler.js"
import Enemy from "./enemy.js"


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
  c.shadowColor = "blue"
  c.shadowBlur = 30
  c.lineJoin = "bevel"
  c.lineWidth = 5
}


// --- hanterar skott --- //
const bulletHandler = new BulletHandler(canvas)

// --- spawnar in spelaren --- //
const player = new Player(canvas.width / 7, canvas.height / 2, bulletHandler)


// --- main loop --- //
function gameLoop() {
  setStyle()
  c.fillStyle = "black"
  c.fillRect(0, 0, canvas.width, canvas.height)
  bulletHandler.draw(c)
  player.draw(c)
}

// --- spelar musik --- //
//var myMusic
//myMusic = new sound("content/Guitarmass.mp3")
//myMusic.play()


// --- intervall --- //
setInterval(gameLoop, 1000 / 60)