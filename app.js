// --- import --- //
import Player from "./player.js"


// --- canvas fönstret --- //
const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.width = "100%"
canvas.style.height = "100%"


// --- misc --- //
var myMusic


// --- spawnar in spelaren --- //
const player = new Player(canvas.width/7, canvas.height/2)


// --- main loop --- //
function gameLoop() {
  setStyle()
  // --- spelar musik --- //
/*   myMusic = new sound("content/Guitarmass.mp3")
  myMusic.play() */
  c.fillStyle = "black"
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.draw(c)
}


// --- musik konstruktör --- //
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


// --- stil funktion --- //
function setStyle() {
  c.shadowColor = "blue"
  c.shadowBlur = 30
  c.lineJoin = "bevel"
  c.lineWidth = 5
}


// --- intervall --- //
setInterval(gameLoop, 1000 / 60)