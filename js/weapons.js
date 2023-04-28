class Weapons {
    constructor(ctx, canvasSize, shootOriginX, shootOriginY) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.weaponSpecs = {
            pos: { x: shootOriginX, y: shootOriginY },
            size: { w: 90, h: 45 },
            speed: 20
        }

        this.imageWeapon = new Image();
        this.imageWeapon.src = "./images/weapon.png";
        this.init()
    }

    init() {

    }
    draw() {
        this.move()
        this.ctx.drawImage(
            this.imageWeapon,
            this.weaponSpecs.pos.x,
            this.weaponSpecs.pos.y,
            this.weaponSpecs.size.w,
            this.weaponSpecs.size.h
        )
    }
    move() {

        this.weaponSpecs.pos.x += this.weaponSpecs.speed


    }
}