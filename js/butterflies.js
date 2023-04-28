class Butterflies {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.butterflySpecs = {
            pos: { x: this.canvasSize.w, y: Math.random() * 350 },
            size: { w: 25, h: 25 },
            speed: 2
        }

        this.image = new Image()
        this.image.src = './images/butterflysprite.png'
        this.image.frames = 4;
        this.image.framesIndex = 0;

    }

    draw(framesCounter) {

        this.ctx.drawImage(
            this.image,
            this.image.width / this.image.frames * this.image.framesIndex,
            0,
            this.image.width / this.image.frames,
            this.image.height,
            this.butterflySpecs.pos.x,
            this.butterflySpecs.pos.y,
            this.butterflySpecs.size.w,
            this.butterflySpecs.size.h
        )
        this.move()
        this.animate(framesCounter)

        // this.ctx.beginPath();
        // this.ctx.fillStyle = "blue";
        // this.ctx.arc(this.butterflySpecs.pos.x, this.butterflySpecs.pos.y, 10, 0, Math.PI * 2);
        // this.ctx.fill();
        // this.ctx.closePath();
    }

    move() {
        this.butterflySpecs.pos.x += -this.butterflySpecs.speed

        const angle = Math.sin(Date.now() / 70) * Math.PI * 0.02
        this.butterflySpecs.pos.y = this.butterflySpecs.pos.y + Math.sin(angle) * 50


    }

    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.image.framesIndex++;
        }

        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0
        }

    }
}