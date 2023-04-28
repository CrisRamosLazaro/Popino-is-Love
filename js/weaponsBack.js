class WeaponsBack {
    constructor(ctx, canvasSize, shootOriginX, shootOriginY) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.weaponBackSpecs = {
            pos: { x: shootOriginX, y: shootOriginY },
            size: { w: 90, h: 45 },
            speed: 20
        }

        this.imageWeapon = new Image();
        this.imageWeapon.src = "./images/weaponBack.png";
        this.init()
    }

    init() {

    }
    draw() {
        this.move()
        this.ctx.drawImage(
            this.imageWeapon,
            this.weaponBackSpecs.pos.x,
            this.weaponBackSpecs.pos.y,
            this.weaponBackSpecs.size.w,
            this.weaponBackSpecs.size.h
        )
    }
    move() {

        this.weaponBackSpecs.pos.x += -this.weaponBackSpecs.speed


    }
}