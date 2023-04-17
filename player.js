export default class Player{

    // --- spelarens koordinater och proportioner --- //
     constructor(x, y){
        this.x = x
        this.y = y
        this.width = 70
        this.height = 25
        this.speed = 4

        document.addEventListener('keydown',this.keydown)
        document.addEventListener('keyup',this.keyup)
     }

    // --- ritar spelaren --- //
     draw(c){
        c.strokeStyle = 'white'
        c.fillStyle = 'white'
        c.beginPath()
        c.moveTo(this.x, this.y + this.height)
        c.lineTo(this.x + this.width, this.y)
        c.lineTo(this.x, this.y - this.height)
        c.closePath()
        c.fill()
     }

    // --- metod för rörelse --- //
     move(){
        
     }

     // --- kollar efter tangenttryck --- //
     keydown =(e)=> {
        if(e.code === "ArrowUp"){
            this.upPress = true
        } else if(e.code === "ArrowDown"){
            this.upPress = true
        } else if(e.code === "ArrowLeft"){
            this.upPress = true
        } else if(e.code === "ArrowRight"){
            this.upPress = true
        }
    }

    // --- kollar om man har släppt tangenten --- //
     keyup =(e)=> {
        if(e.code === "ArrowUp"){
            this.upPress = false
        } else if(e.code === "ArrowDown"){
            this.upPress = false
        } else if(e.code === "ArrowLeft"){
            this.upPress = false
        } else if(e.code === "ArrowRight"){
            this.upPress = false
        }
     }
}