class MovingPlatform {
    constructor(ctx, canvasSize, x, y, w, h) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.movingPlatSpecs = {
            pos: { x, y },
            size: { w, h },
            vel: { x: 5, y: 0 },
            increment: 0
        }
        //this.movementFunction = undefined,
        this.imagePlatform = new Image();
        this.imagePlatform.src = "./images/platform.png";
        this.init()
    }

    init() {

    }

    draw() {
        this.ctx.drawImage(
            this.imagePlatform,
            this.movingPlatSpecs.pos.x,
            this.movingPlatSpecs.pos.y,
            this.movingPlatSpecs.size.w,
            this.movingPlatSpecs.size.h
        )
        this.move()
    }

    move() {
        if (this.movingPlatSpecs.pos.x >= 100) this.turn()
        if (this.movingPlatSpecs.pos.x <= 180) this.turn()

        this.movingPlatSpecs.pos.x += (this.movingPlatSpecs.vel.x + this.movingPlatSpecs.increment)
    }

    incrementLeft() {
        this.movingPlatSpecs.increment = -12
    }

    incrementRight() {
        this.movingPlatSpecs.increment = 12
    }
    stopIncrement() {
        this.movingPlatSpecs.increment = 0
    }


    turn() {
        this.movingPlatSpecs.vel.x *= -1
    }
}