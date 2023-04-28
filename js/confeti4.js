class Confeti4 {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.confeti4Specs = {
            pos: { x: Math.random() * (this.canvasSize.w), y: 0 },
            size: { w: 50, h: 70 },
            vel: { x: 0, y: Math.random() * 5 },
            gravity: 2
        }

        this.image = new Image();
        this.image.src = "./images/confeti4.png";


    }

    draw() {

        this.ctx.drawImage(
            this.image,
            this.confeti4Specs.pos.x,
            this.confeti4Specs.pos.y,
            this.confeti4Specs.size.w,
            this.confeti4Specs.size.h
        )



        this.move()
    }

    move() {

        this.confeti4Specs.pos.y += this.confeti4Specs.vel.y
    }
}