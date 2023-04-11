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
let rightPressed = false;
let leftPressed = false;


// --- spawnar spelaren --- //
function spawnPlayer() {
    c.beginPath()
    c.moveTo(paddle_x, paddle_y + 200) // midX , midY
    c.lineTo(paddle_x - 30, paddle_y + 300) // midX - 30 , midY + 50
    c.lineTo(paddle_x + 30, paddle_y + 300) // midX + 60 , midY + 50
    c.closePath()

    c.lineWidth = 10
    c.strokeStyle = "white"
    c.stroke()

    c.fillStyle = "white"
    c.fill()
}

// --- draw funktion --- //
function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    spawnPlayer()
    if (rightPressed) { // if sats som kollar efter knapptryck
        paddle_x = Math.min(paddle_x + 7, canvas.width - 30);
      } else if (leftPressed) {
        paddle_x = Math.max(paddle_x - 7, 0);
      }
}

draw()

// --- mera knapptryck --- //
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
  }
  
  function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    }
  }


// --- intervall --- //
setInterval(draw, 10);