class Confeti1 {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.confetiSpecs = {
            pos: { x: Math.random() * (this.canvasSize.w), y: 0 },
            size: { w: 50, h: 70 },
            vel: { x: 0, y: Math.random() * 5 },
            gravity: 2
        }

        this.image = new Image();
        this.image.src = "./images/confeti1.png";





    }

    draw() {

        this.ctx.drawImage(
            this.image,
            this.confetiSpecs.pos.x,
            this.confetiSpecs.pos.y,
            this.confetiSpecs.size.w,
            this.confetiSpecs.size.h
        )



        this.move()
    }

    move() {

        this.confetiSpecs.pos.y += this.confetiSpecs.vel.y
    }
}