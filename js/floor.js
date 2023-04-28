class Floor {
    constructor(ctx, canvasSize, x, y, w, h) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.floorSpecs = {
            pos: { x, y },
            size: { w, h }
        }
        this.imageFloor = new Image();
        this.imageFloor.src = "./images/floor.png";
        this.init()
    }
    init() {

    }
    draw() {
        this.ctx.drawImage(
            this.imageFloor,
            this.floorSpecs.pos.x,
            this.floorSpecs.pos.y,
            this.floorSpecs.size.w,
            this.floorSpecs.size.h
        )
        // this.ctx.fillStyle = 'green';
        // this.ctx.fillRect(
        //     this.platformSpecs.pos.x,
        //     this.platformSpecs.pos.y,
        //     this.platformSpecs.size.w,
        //     this.platformSpecs.size.h);
    }
}