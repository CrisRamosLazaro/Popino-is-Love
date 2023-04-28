class Player {

    constructor(ctx, canvasSize, keys) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.keys = {
            ArrowRight: { pressed: false },
            ArrowLeft: { pressed: false },
            ArrowUp: { pressed: false },
            Space: { pressed: false },

        }
        this.playerSpecs = {
            pos: { x: 25, y: 0 },
            size: { w: 90, h: 75 },
            vel: { x: 0, y: 1.5 },
            gravity: 2
        }

        this.jumpCounter = 0
        this.isJumping = false
        this.wasColliding = false

        this.image = new Image()
        this.image.src = './images/popino.png'
        this.image.frames = 3;
        this.image.framesIndex = 0;

        this.turnedImage = new Image()
        this.turnedImage.src = './images/popino_back.png'
        this.turnedImage.frames = 3;
        this.turnedImage.framesIndex = 0;

        this.init()
    }

    init() {

    }

    draw(framesCounter) {

        if (this.keys.ArrowLeft.pressed) {
            this.ctx.drawImage(
                this.turnedImage,
                this.turnedImage.width / this.turnedImage.frames * this.turnedImage.framesIndex,
                0,
                this.turnedImage.width / this.image.frames,
                this.turnedImage.height,
                this.playerSpecs.pos.x,
                this.playerSpecs.pos.y,
                this.playerSpecs.size.w,
                this.playerSpecs.size.h
            )

        } else {

            this.ctx.drawImage(
                this.image,
                this.image.width / this.image.frames * this.image.framesIndex,
                0,
                this.image.width / this.image.frames,
                this.image.height,
                this.playerSpecs.pos.x,
                this.playerSpecs.pos.y,
                this.playerSpecs.size.w,
                this.playerSpecs.size.h
            )
        }


        if (this.keys.ArrowLeft.pressed || this.keys.ArrowRight.pressed || this.keys.ArrowUp.pressed) {

            this.animate(framesCounter)
        }

        this.move()

        // this.ctx.fillStyle = 'black';
        // this.ctx.fillRect(
        //     this.playerSpecs.pos.x,
        //     this.playerSpecs.pos.y,
        //     this.playerSpecs.size.w,
        //     this.playerSpecs.size.h);
    }

    animate(framesCounter) {

        if (this.keys.ArrowLeft.pressed) {

            if (framesCounter % 4 == 0) {
                this.turnedImage.framesIndex++;
            }

            if (this.turnedImage.framesIndex >= this.turnedImage.frames) {
                this.turnedImage.framesIndex = 0
            }

        } else if (this.keys.ArrowRight.pressed) {

            if (framesCounter % 4 == 0) {
                this.image.framesIndex++;
            }

            if (this.image.framesIndex >= this.image.frames) {
                this.image.framesIndex = 0
            }
        }





    }


    move() {
        //this.draw()

        this.playerSpecs.pos.x += this.playerSpecs.vel.x
        this.playerSpecs.pos.y += this.playerSpecs.vel.y

        if (this.playerSpecs.pos.y + this.playerSpecs.size.h + this.playerSpecs.vel.y < this.canvasSize.h) {
            this.playerSpecs.vel.y += this.playerSpecs.gravity
            this.isJumping = true
        }

        else {
            this.playerSpecs.vel.y = 0
            this.isJumping = false
            this.jumpCounter = 0
        }
        // if (this.playerSpecs.vel.y < 0) this.isJumping = true

        // if (this.isJumping = true) this.playerSpecs.vel.y = -20

    }
}