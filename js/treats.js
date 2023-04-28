class Treats {
    constructor(ctx, canvasSize, x, y) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.treatSpecs = {
            pos: { x, y },
            size: { w: 50, h: 45 }
        }
        this.imageTreat = new Image();
        this.imageTreat.src = "./images/treat.png";
        this.init()
    }

    init() {

    }
    draw() {
        this.move()
        this.ctx.drawImage(
            this.imageTreat,
            this.treatSpecs.pos.x,
            this.treatSpecs.pos.y,
            this.treatSpecs.size.w,
            this.treatSpecs.size.h
        )
    }
    move() {
        // this.tokenSpecs.pos.y += -this.tokenSpecs.speed

        const angle = Math.sin(Date.now() / 250) * Math.PI * 0.005
        this.treatSpecs.pos.y = this.treatSpecs.pos.y + Math.sin(angle) * 50
    }

}