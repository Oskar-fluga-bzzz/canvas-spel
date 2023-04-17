export default class Player{


    // --- spelarens parametrar + eventlyssnare för tangentbord --- //
     constructor(x, y, bulletHandler){
        this.x = x
        this.y = y
        this.bulletHandler = bulletHandler
        this.width = 70
        this.height = 25
        this.speed = 10
        this.canvas = canvas

        document.addEventListener('keydown',this.keydown)
        document.addEventListener('keyup',this.keyup)
     }


    // --- ritar spelaren --- //
     draw(c){
        this.move()
        c.strokeStyle = 'white'
        c.fillStyle = 'white'
        c.beginPath()
        c.moveTo(this.x, this.y + this.height)
        c.lineTo(this.x + this.width, this.y)
        c.lineTo(this.x, this.y - this.height)
        c.closePath()
        c.fill()

        this.fire()
     }


    // --- skjuter om man trycker på spacebar --- //
     fire() {
        if(this.spacePress){
            console.log("om man tänder eld så blir den fire")
            // --- avfyrningens parametrar --- //
            const speed = 20
            const delay = 7
            const damage = 1
            const bulletX = this.x
            const bulletY = this.y
            this.bulletHandler.fire(bulletX, bulletY, speed, damage, delay)
        }
     }


    // --- metod för rörelse --- //
     move(){
        if(this.upPress) {
            this.y -= this.speed
        }
        if(this.downPress) {
            this.y += this.speed
        }
        if(this.leftPress) {
            this.x -= this.speed
        }
        if(this.rightPress) {
            this.x += this.speed
        }
     }


    // --- kollar efter tangenttryck --- //
     keydown =(e)=> {
        if(e.code === "ArrowUp" || e.code === "Up"){
            this.upPress = true
        } else if(e.code === "ArrowDown" || e.code === "Down"){
            this.downPress = true
        } else if(e.code === "ArrowLeft" || e.code === "Left"){
            this.leftPress = true
        } else if(e.code === "ArrowRight" || e.code === "Right"){
            this.rightPress = true
        } else if(e.code === "Space" || e.code === " ") {
            this.spacePress = true
        }
    }


    // --- kollar om man har släppt tangenten --- //
     keyup =(e)=> {
        if(e.code === "ArrowUp" || e.code === "Up"){
            this.upPress = false
        } else if(e.code === "ArrowDown" || e.code === "Down"){
            this.downPress = false
        } else if(e.code === "ArrowLeft" || e.code === "Left"){
            this.leftPress = false
        } else if(e.code === "ArrowRight" || e.code === "Right"){
            this.rightPress = false
        } else if(e.code === "Space" || e.code === " ") {
            this.spacePress = false
        }
     }
}