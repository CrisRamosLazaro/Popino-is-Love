class Confeti3 {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.confeti3Specs = {
            pos: { x: Math.random() * (this.canvasSize.w), y: 0 },
            size: { w: 50, h: 70 },
            vel: { x: 0, y: Math.random() * 5 },
            gravity: 2
        }

        this.image = new Image();
        this.image.src = "./images/confeti3.png";





    }

    draw() {

        this.ctx.drawImage(
            this.image,
            this.confeti3Specs.pos.x,
            this.confeti3Specs.pos.y,
            this.confeti3Specs.size.w,
            this.confeti3Specs.size.h
        )

        this.move()
    }

    move() {

        this.confeti3Specs.pos.y += this.confeti3Specs.vel.y
    }
}