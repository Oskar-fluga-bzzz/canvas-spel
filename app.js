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


// --- spawnar spelaren --- //
function spawnPlayer() {
    c.beginPath()
    c.moveTo(midX, midY + 200) // midX , midY
    c.lineTo(midX - 30, midY + 300) // midX - 30 , midY + 50
    c.lineTo(midX + 30, midY + 300) // midX + 60 , midY + 50
    c.closePath()

    c.lineWidth = 10
    c.strokeStyle = "white"
    c.stroke()

    c.fillStyle = "white"
    c.fill()
}
spawnPlayer()