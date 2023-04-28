class Platform {
    constructor(ctx, canvasSize, x, y, w, h) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.platformSpecs = {
            pos: { x, y },
            size: { w, h }
        }
        this.imagePlatform = new Image();
        this.imagePlatform.src = "./images/platform.png";
        this.init()
    }
    init() {

    }
    draw() {
        this.ctx.drawImage(
            this.imagePlatform,
            this.platformSpecs.pos.x,
            this.platformSpecs.pos.y,
            this.platformSpecs.size.w,
            this.platformSpecs.size.h
        )
        // this.ctx.fillStyle = 'green';
        // this.ctx.fillRect(
        //     this.platformSpecs.pos.x,
        //     this.platformSpecs.pos.y,
        //     this.platformSpecs.size.w,
        //     this.platformSpecs.size.h);
    }
}