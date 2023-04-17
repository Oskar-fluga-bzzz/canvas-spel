// --- canvas rutan --- //
let canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = 1 * window.innerHeight
canvas.style.width = "100%"
canvas.style.height = "100%"

const c = canvas.getContext("2d")
c.fillStyle = "#FF0000"
const midX = canvas.width / 2
const midY = canvas.height / 2
var paddle_x = midX
var paddle_y = midY


// --- knapptryck --- //
let upPressed = false;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;

// --- mera knapptryck --- //
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Up" || e.key === "ArrowUp") {
      upPressed = true;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
      downPressed = true;
    } else if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.key === "Up" || e.key === "ArrowUp") {
      upPressed = false;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
      downPressed = false;
    } else if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }


// --- spawnar spelaren --- //
function spawnPlayer() {
    c.beginPath()
    c.moveTo(paddle_x - 400, paddle_y) // midX , midY
    c.lineTo(paddle_x - 450, paddle_y + 20) // midX - 30 , midY + 50
    c.lineTo(paddle_x - 450, paddle_y - 20) // midX + 60 , midY + 50
    c.closePath()

    c.lineWidth = 10
    c.strokeStyle = "white"
    c.stroke()

    c.fillStyle = "white"
    c.fill()
}


function projectileSpawn(){
  c.beginPath()
  c.arc(240, 160, 20, 0, math.PI * 2, false)
  c.fillStyle = "red"
  c.fill()
  c.closePath()
}

// --- draw funktion --- //
function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    spawnPlayer()
    if (upPressed) { // if sats som kollar efter knapptryck
        paddle_y = Math.max(paddle_y - 7, 30);
      } else if (downPressed) {
        paddle_y = Math.min(paddle_y + 7, canvas.height - 30);
      } else if (rightPressed) {
        paddle_x = Math.min(paddle_x + 7, canvas.width + 375);
      } else if (leftPressed) {
        paddle_x = Math.max(paddle_x - 7, 450);
      }
}

draw()

// --- intervall --- //
setInterval(draw, 10);