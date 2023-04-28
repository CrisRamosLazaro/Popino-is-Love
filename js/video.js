class Video1 {
    constructor(this.ctx, this.canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.videoSpecs = {
            pos: { x: this.canvasSize, y: this.canvasSize },
            size: { w: this.canvasSize, h: this.canvasSize },
        }
        this.video = new Video()
        this.video.src = ''
        this.init()
    }
    draw() {
        this.ctx.drawVideo(
            this.video,
            this.videoSpecs.pos.x,
            this.videoSpecs.pos.y,
            this.videoSpecs.size.w,
            this.videoSpecs.size.h
        )
    }
}
