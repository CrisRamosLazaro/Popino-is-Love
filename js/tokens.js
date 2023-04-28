class Tokens {
    constructor(ctx, canvasSize, x, y) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.tokenSpecs = {
            pos: { x, y },
            size: { w: 55, h: 25 }

        }
        this.imageToken = new Image();
        this.imageToken.src = "./images/token.png";
        this.init()
    }

    init() {

    }
    draw() {
        this.move()
        this.ctx.drawImage(
            this.imageToken,
            this.tokenSpecs.pos.x,
            this.tokenSpecs.pos.y,
            this.tokenSpecs.size.w,
            this.tokenSpecs.size.h
        )
    }
    move() {
        // this.tokenSpecs.pos.y += -this.tokenSpecs.speed

        const angle = Math.sin(Date.now() / 250) * Math.PI * 0.005
        this.tokenSpecs.pos.y = this.tokenSpecs.pos.y + Math.sin(angle) * 50
    }

}