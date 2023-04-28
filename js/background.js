class Background {

    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.imageBg = new Image();
        this.imageBg.src = "./images/background-bien.png";

        this.bgSpecs = {
            pos: { x: 0, y: 0 },
            vel: { x: 0, y: 0 }
        }

    }


    draw() {
        this.ctx.drawImage(this.imageBg, this.bgSpecs.pos.x, this.bgSpecs.pos.y, this.canvasSize.w, this.canvasSize.h);
        this.ctx.drawImage(this.imageBg, this.bgSpecs.pos.x + this.canvasSize.w, this.bgSpecs.pos.y, this.canvasSize.w, this.canvasSize.h);
        this.move()
    }

    move() {
        if (this.bgSpecs.pos.x <= -this.canvasSize.w) {
            this.bgSpecs.pos.x = 0;
        }
        this.bgSpecs.pos.x -= this.bgSpecs.vel.x;
    }
}
