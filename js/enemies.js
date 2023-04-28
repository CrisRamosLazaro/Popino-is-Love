class Enemies {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.enemySpecs = {
            pos: { x: this.canvasSize.w, y: Math.random() * (this.canvasSize.h - 50), },
            size: { w: 60, h: 60 },
            speed: 15
        }
        this.image = new Image();
        this.image.src = './images/hate insults.png';
        this.image.frames = 3;
        this.image.framesIndex = 0;

        this.destroyedImage = new Image();
        this.destroyedImage.src = './images/love.png';
        this.destroyedImage.frames = 2;
        this.destroyedImage.framesIndex = 0;

        this.isDestroyed = false
    }

    draw(framesCounter) {

        if (!this.isDestroyed) {
            this.ctx.drawImage(
                this.image,
                this.image.width / this.image.frames * this.image.framesIndex,
                0,
                this.image.width / this.image.frames,
                this.image.height,
                this.enemySpecs.pos.x,
                this.enemySpecs.pos.y,
                this.enemySpecs.size.w,
                this.enemySpecs.size.h
            );
        } else {
            this.ctx.drawImage(
                this.destroyedImage,
                this.destroyedImage.width / this.destroyedImage.frames * this.destroyedImage.framesIndex,
                0,
                this.destroyedImage.width / this.destroyedImage.frames,
                this.destroyedImage.height,
                this.enemySpecs.pos.x,
                this.enemySpecs.pos.y,
                this.enemySpecs.size.w,
                this.enemySpecs.size.h
            );

        }

        this.move()
        this.animate(framesCounter)
    }

    move() {
        this.enemySpecs.pos.x += -this.enemySpecs.speed
    }

    animate(framesCounter) {

        if (!this.isDestroyed) {
            if (framesCounter % 4 == 0) {
                this.image.framesIndex++;
            }

            if (this.image.framesIndex >= this.image.frames) {
                this.image.framesIndex = 0
            }
        } else {

            if (framesCounter % 3 == 0) {
                this.destroyedImage.framesIndex++;
            }

            if (this.destroyedImage.framesIndex >= this.destroyedImage.frames) {
                this.destroyedImage.framesIndex = 0
            }
        }
    }
}



