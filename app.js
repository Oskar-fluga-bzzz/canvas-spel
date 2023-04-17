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
var player_x = midX
var player_y = midY


// --- knapptryck --- //
let upPressed = false;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;

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
    } else if (e.key === " " || e.key === 32) {
      spacePressed = true;
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
    c.moveTo(player_x - 400, player_y) // midX , midY
    c.lineTo(player_x - 450, player_y + 20) // midX - 30 , midY + 50
    c.lineTo(player_x - 450, player_y - 20) // midX + 60 , midY + 50
    c.closePath()

    c.lineWidth = 10
    c.strokeStyle = "white"
    c.stroke()

    c.fillStyle = "white"
    c.fill()
}


function projectileSpawn(){
  c.arc(projectile_x, projectile_y, 10, 0, Math.PI * 2);
  c.fill();
}
let projectile_x = player_x - 400
let projectile_y = player_y


// --- draw funktion --- //
function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    spawnPlayer()


    // if sats som kollar efter knapptryck
    if (upPressed) {
        player_y = Math.max(player_y - 7, 30);
      } 
    if (downPressed) {
        player_y = Math.min(player_y + 7, canvas.height - 30);
      } 
    if (rightPressed) {
        player_x = Math.min(player_x + 7, canvas.width + 375);
      } 
    if (leftPressed) {
        player_x = Math.max(player_x - 7, 450);
      }
    if (spacePressed) {
      projectileSpawn()
    }

      projectile_x += 2
}

draw()

// --- intervall --- //
setInterval(draw, 10);