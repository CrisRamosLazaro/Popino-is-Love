class Confeti2 {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.confeti2Specs = {
            pos: { x: Math.random() * (this.canvasSize.w), y: 0 },
            size: { w: 50, h: 70 },
            vel: { x: 0, y: Math.random() * 5 },
            gravity: 2
        }

        this.image = new Image();
        this.image.src = "./images/confeti2.png";





    }

    draw() {

        this.ctx.drawImage(
            this.image,
            this.confeti2Specs.pos.x,
            this.confeti2Specs.pos.y,
            this.confeti2Specs.size.w,
            this.confeti2Specs.size.h
        )



        this.move()
    }

    move() {

        this.confeti2Specs.pos.y += this.confeti2Specs.vel.y
    }
}