const secretGame = {
    appName: 'Secret Game',
    author: 'Cris y Paula',
    version: '1.0.0',
    license: undefined,
    description: 'Save the world',
    ctx: undefined,
    player: undefined,
    background: undefined,
    movingPlat: [],
    //video:[],
    floor: [],
    platforms: [],
    confeti: [],
    tokens: [],
    treats: [],
    enemies: [],
    butterflies: [],
    weapons: [],
    weaponsBack: [],
    confeti1: [],
    confeti2: [],
    confeti3: [],
    confeti4: [],
    frameIndex: 0,
    FPS: 25,
    tokenCounter: 0,
    weaponCounter: 0,
    lifeCounter: 5,
    score: 0,
    canvasSize: {
        w: 1280,
        h: 720
    },
    scrollOffset: 0,
    keys: {
        ArrowRight: { pressed: false },
        ArrowLeft: { pressed: false },
        ArrowUp: { pressed: false },
        Space: { pressed: false },
        Enter: { pressed: false },
    },


    init() {
        this.setContext()
        this.setEventListeners()
        this.createBackground()
        this.createPlayer()
        this.createPlatforms()
        //this.createMovingPlatforms()
        this.createFloor()
        this.createTokens()
        this.createTreats()
        this.createConfeti()
        this.music()
        this.start()
    },

    setContext() {
        this.ctx = document.querySelector('canvas').getContext('2d')
    },

    start() {
        const intervalID = setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.clearObjects()
            this.detectCollisionWithEnemies()
            this.drawWeapons()
            this.drawWeaponsBack()

            this.frameIndex++
        }, 1000 / this.FPS)
    },

    drawAll() {

        this.drawBackground()
        this.drawPlatforms()
        this.drawFloor()
        this.drawTokens()
        this.drawTreats()
        this.drawEnemies()
        this.drawButterflies()
        this.drawScore()
        this.player?.draw(this.frameIndex)
        this.detectCollisionWithPlatforms()
        //this.detectCollisionWithMovingPlatforms()
        //this.drawMovingPlatforms()
        this.detectCollisionWeaponsEnemies()
        this.detectCollisionWeaponsBackEnemies()
        this.detectCollisionWithTokens()
        this.detectCollisionWithTreats()
        this.detectCollisionWithFloor()
        this.detectDeathPits()
        this.drawWeaponCounter()


        // start with still player on x-axis
        this.player.playerSpecs.vel.x = 0

        // contain player to canvas & responsive platform movement

        if (this.player.playerSpecs.pos.x < 75 && (this.canvasSize.w - 1280) < 0) { this.player.playerSpecs.pos.x = 0 }
        if (this.player.keys.ArrowRight.pressed &&
            this.player.playerSpecs.pos.x + this.player.playerSpecs.size.w < this.canvasSize.w * 0.66) //---> more padding for platform moving 
            this.player.playerSpecs.vel.x = 12
        else if (this.player.keys.ArrowLeft.pressed && this.player.playerSpecs.pos.x > 75)
            this.player.playerSpecs.vel.x = -12
        else {
            if (this.player.keys.ArrowRight.pressed) {
                this.scrollOffset += 12
                this.platforms.forEach((plat) => plat.platformSpecs.pos.x -= 12)
                this.floor.forEach(flr => flr.floorSpecs.pos.x -= 12)

                this.movingPlat.forEach(mPlat => {
                    if (mPlat.movingPlatSpecs.vel.x <= 0) {
                        mPlat.stopIncrement()
                        mPlat.movingPlatSpecs.pos.x -= 12
                    } else if (mPlat.movingPlatSpecs.vel.x > 0) {
                        mPlat.incrementLeft()
                        mPlat.movingPlatSpecs.pos.x -= 12
                    }

                })

                this.treats.forEach((treat) => treat.treatSpecs.pos.x -= 12)
                this.weapons.forEach((weapon) => weapon.weaponSpecs.pos.x -= 12)
                this.weaponsBack.forEach((weaponB) => weaponB.weaponBackSpecs.pos.x -= 12)
                this.tokens.forEach((token) => token.tokenSpecs.pos.x -= 12)
                this.butterflies.forEach((butter) => butter.butterflySpecs.pos.x -= 12)

            } else if (this.player.keys.ArrowLeft.pressed) {
                this.scrollOffset -= 12
                this.platforms.forEach((plat) => plat.platformSpecs.pos.x += 12)
                this.floor.forEach(flr => flr.floorSpecs.pos.x += 12)

                this.movingPlat.forEach(mPlat => {
                    if (mPlat.movingPlatSpecs.vel.x <= 0) {
                        mPlat.stopIncrement()
                        mPlat.movingPlatSpecs.pos.x += 12
                    } else if (mPlat.movingPlatSpecs.vel.x > 0) {
                        mPlat.incrementRight()
                        mPlat.movingPlatSpecs.pos.x += 12
                    }

                })
                this.tokens.forEach((token) => token.tokenSpecs.pos.x += 12)
                this.treats.forEach((treat) => treat.treatSpecs.pos.x += 12)
                this.weapons.forEach((weapon) => weapon.weaponSpecs.pos.x += 12)
                this.weaponsBack.forEach((weaponB) => weaponB.weaponBackSpecs.pos.x += 12)
                this.butterflies.forEach((butter) => butter.butterflySpecs.pos.x += 12)

            } else if (!this.player.keys.ArrowLeft.pressed && this.player.keys.ArrowRight.pressed) {
                this.movingPlat.forEach(mPlat => {
                    mPlat.stopIncrement()

                })
            }
        }

        if (this.player.playerSpecs.pos.y <= 0)
            this.player.playerSpecs.pos.y = 0

        //win scenario
        if (this.scrollOffset > 4100) {

            this.youWin()
            this.drawConfeti()

            // clearInterval(1)
        }
    },
    // VIDEO
    // playVideo() {
    //     console.log('hola')
    //     this.video.push(new Video1(this.ctx, this.canvasSize))    
    // },



    // MUSIC
    music() {
        this.backgroundSound = new Audio()
        this.backgroundSound.src = './images/popino-music.mp3'
        this.backgroundSound.volume = 1
        this.backgroundSound.play()
    },

    killEnemy() {
        this.killEnemySound = new Audio()
        this.killEnemySound.src = './images/kill enemy.mp3'
        this.killEnemySound.volume = 1
        this.killEnemySound.play()
    },

    takeToken() {
        this.takeTokenSound = new Audio()
        this.takeTokenSound.src = './images/take token.mp3'
        this.takeTokenSound.volume = 1
        this.takeTokenSound.play()
    },

    TouchEnemy() {
        this.touchEnemySound = new Audio()
        this.touchEnemySound.src = './images/touchEnemy.mp3'
        this.touchEnemySound.volume = 1
        this.touchEnemySound.play()
    },

    youLose() {
        this.youLoseSound = new Audio()
        this.youLoseSound.src = './images/youLose.mp3'
        this.youLoseSound.volume = 1
        this.youLoseSound.play()
    },

    //-- BACKGROUND
    createBackground() {
        this.background = new Background(this.ctx, this.canvasSize)
    },

    drawBackground() {
        this.background.draw()
    },

    //-- PLAYER METHODS

    createPlayer() {
        this.player = new Player(this.ctx, this.canvasSize)
    },

    //-- FLOOR METHODS

    createFloor() {
        this.floor.push(
            new Floor(this.ctx, this.canvasSize, 0, this.canvasSize.h - 60, this.canvasSize.w - 100, 60), //suelo 1
            new Floor(this.ctx, this.canvasSize, this.canvasSize.w + 350, this.canvasSize.h - 60, 900, 60), //suelo 2
            new Floor(this.ctx, this.canvasSize, this.canvasSize.w + 1520, this.canvasSize.h - 60, 500, 60), //suelo 3
            new Floor(this.ctx, this.canvasSize, this.canvasSize.w + 2500, this.canvasSize.h - 60, 75, 60), //suelo 4
            new Floor(this.ctx, this.canvasSize, this.canvasSize.w + 3500, this.canvasSize.h - 60, 200, 60), //suelo 5          
        )
    },

    drawFloor() {
        this.floor.forEach(flr => flr.draw())
    },

    //-- PLATFORM METHODS

    createPlatforms() {
        this.platforms.push(
            new Platform(this.ctx, this.canvasSize, 300, 570, 180, 50), //plataforma 1
            new Platform(this.ctx, this.canvasSize, 490, 400, 180, 50), //plataforma 2 *token
            new Platform(this.ctx, this.canvasSize, 975, 500, 180, 50), //plataforma 3
            new Platform(this.ctx, this.canvasSize, 1320, 550, 160, 50), //plataforma 4 *token
            new Platform(this.ctx, this.canvasSize, 1800, 460, 160, 50), //plataforma 5
            new Platform(this.ctx, this.canvasSize, 2020, 350, 160, 50), //plataforma 6
            //extra live 
            new Platform(this.ctx, this.canvasSize, 2300, 250, 160, 55), //plataforma 7 *token
            new Platform(this.ctx, this.canvasSize, 2480, 360, 70, 50), //plataforma 8
            new Platform(this.ctx, this.canvasSize, 2880, 460, 60, 50), //plataforma 9
            //extra live + token
            new Platform(this.ctx, this.canvasSize, 3100, 363, 160, 30), //plataforma 10 *token
            new Platform(this.ctx, this.canvasSize, this.canvasSize.w + 2525, 533, 160, 30), //plat 11
            new Platform(this.ctx, this.canvasSize, this.canvasSize.w + 2670, 333, 160, 50), //plataforma 12 *power up
            new Platform(this.ctx, this.canvasSize, this.canvasSize.w + 3100, 643, 160, 50), //plataforma 14
            // new Platform(this.ctx, this.canvasSize, this.canvasSize.w + 3100, 443, 160, 30), //plataforma 13
        )
    },

    drawPlatforms() {
        this.platforms.forEach(plat => plat.draw())
    },

    //-- MOVING PLATFORM METHODS

    // createMovingPlatforms() {
    //     this.movingPlat.push(
    //         new MovingPlatform(this.ctx, this.canvasSize, 100, 533, 160, 30),
    //         new MovingPlatform(this.ctx, this.canvasSize, this.canvasSize.w + 2525, 533, 160, 30)
    //     )
    // },

    // drawMovingPlatforms() {
    //     this.movingPlat.forEach(plat => plat.draw())
    // },

    //-- ENEMIES METHODS

    createEnemies() {
        this.enemies.push(new Enemies(this.ctx, this.canvasSize))
    },

    drawEnemies() {
        this.enemies.forEach(enemy => enemy.draw(this.frameIndex))
        if (this.frameIndex % 20 === 0) this.createEnemies()
    },

    //-- WEAPON METHODS

    createWeapons() {
        this.weapons.push(new Weapons(this.ctx, this.canvasSize, this.player.playerSpecs.pos.x + this.player.playerSpecs.size.w, this.player.playerSpecs.pos.y + 3))
    },

    createWeaponsBack() {
        this.weaponsBack.push(new WeaponsBack(this.ctx, this.canvasSize, this.player.playerSpecs.pos.x, this.player.playerSpecs.pos.y + 3))
    },

    drawWeapons() {
        this.weapons.forEach(weapon => weapon.draw())
    },

    drawWeaponsBack() {
        this.weaponsBack.forEach(weaponB => weaponB.draw())
    },


    //-- TOKEN METHODS

    createTokens() {
        this.tokens.push(new Tokens(this.ctx, this.canvasSize, 560, 340))
        this.tokens.push(new Tokens(this.ctx, this.canvasSize, 1383, 490))
        this.tokens.push(new Tokens(this.ctx, this.canvasSize, 2363, 190))
        this.tokens.push(new Tokens(this.ctx, this.canvasSize, 3000, 600))
        this.tokens.push(new Tokens(this.ctx, this.canvasSize, 4013, 285)) //powerup
    },

    drawTokens() {
        this.tokens.forEach(token => token.draw())
    },

    //-- treat METHODS

    createTreats() {
        this.treats.push(new Treats(this.ctx, this.canvasSize, 2080, 600))
        this.treats.push(new Treats(this.ctx, this.canvasSize, 2943, 600))
    },

    drawTreats() {
        this.treats.forEach(treat => treat.draw())
    },

    //-- BUTTERFLY METHODS

    createButterflies() {
        this.butterflies.push(new Butterflies(this.ctx, this.canvasSize))
    },

    drawButterflies() {
        this.butterflies.forEach(butterfly => butterfly.draw(this.frameIndex))
        if (this.frameIndex % 300 === 0) this.createButterflies()
    },

    //-- CONFETI METHODS

    createConfeti() {
        this.confeti1.push(new Confeti1(this.ctx, this.canvasSize))
        this.confeti2.push(new Confeti2(this.ctx, this.canvasSize))
        this.confeti3.push(new Confeti3(this.ctx, this.canvasSize))
        this.confeti4.push(new Confeti4(this.ctx, this.canvasSize))
    },

    drawConfeti() {
        this.confeti1.forEach(confeti => confeti.draw())
        if (this.frameIndex % 50 === 0) this.createConfeti()

        this.confeti2.forEach(confeti => confeti.draw())
        if (this.frameIndex % 70 === 0) this.createConfeti()

        this.confeti3.forEach(confeti => confeti.draw())
        if (this.frameIndex % 60 === 0) this.createConfeti()

        this.confeti4.forEach(confeti => confeti.draw())
        if (this.frameIndex % 80 === 0) this.createConfeti()

    },

    //-- SCORES METHODS

    drawWeaponCounter() {

        this.signImage = new Image()
        this.signImage.src = './images/wood_sign.png'

        this.ctx.drawImage(
            this.signImage,
            45, 0, 320, 150
        )

        this.ctx.font = 'bold 22px Courier';
        this.ctx.fillStyle = '#FFEACD';
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;
        this.ctx.shadowBlur = 1;
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillText(`Aliento`, 135, 97, 97, 50);
        this.ctx.fillText(`Power`, 135, 122, 97, 50);
        this.ctx.font = 'bold 28px Courier';
        this.ctx.fillText(`:${this.weaponCounter}`, 235, 112, 60, 50);
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;

    },

    drawScore() {

        this.image = new Image()
        this.image.src = './images/cartel-vidas.png';

        this.ctx.drawImage(
            this.image, this.canvasSize.w - 250, 0, 180, 180
        );
        this.ctx.font = 'bold 22px Courier';
        this.ctx.fillStyle = '#FFEACD';
        this.ctx.shadowOffsetX = 2;
        this.ctx.shadowOffsetY = 2;
        this.ctx.shadowBlur = 1;
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillText(`SCORE`, this.canvasSize.w - 195, 70, 180, 80);
        //this.ctx.fillText(`Destroyed:`, this.canvasSize.w - 200, 90, 180, 80);
        this.ctx.font = 'bold 30px Courier';
        this.ctx.fillText(`${this.score}`, this.canvasSize.w - 168, 98, 180, 80);
        this.ctx.font = 'bold 22px Courier';
        this.ctx.fillText(`Energy`, this.canvasSize.w - 200, 140, 180, 80);
        this.ctx.font = 'bold 30px Courier';
        this.ctx.fillText(`${this.lifeCounter}`, this.canvasSize.w - 168, 168, 180, 80); //Evil Destroyed
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
    },

    //-- GAME STOP METHODS   

    youWin() {
        this.image = new Image()
        this.image.src = './images/YouWin.png';

        this.ctx.drawImage(
            this.image, this.canvasSize.w / 2 - 250, this.canvasSize.h / 2 - 175, 500, 350
        );

        this.ctx.font = 'bold 35px Courier New';
        this.ctx.fillStyle = '#492B00';
        this.ctx.fillText(`You Win!`, this.canvasSize.w / 2 - 95, this.canvasSize.h / 2 + 45);

    },

    gamePaused() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(this.canvasSize.w / 2 - 100, this.canvasSize.h / 2 - 50, 280, 90);
        this.ctx.font = 'bold 35px Courier';
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillText(`Game Paused`, this.canvasSize.w / 2 - 85, this.canvasSize.h / 2 + 5);
    },


    gameOver() {

        this.image = new Image()
        this.image.src = './images/GameOver.png';

        this.ctx.drawImage(
            this.image, this.canvasSize.w / 2 - 250, this.canvasSize.h / 2 - 175, 500, 350
        );

        this.ctx.font = 'bold 35px Courier New';
        this.ctx.fillStyle = 'red';
        this.ctx.shadowOffsetX = 1;
        this.ctx.shadowOffsetY = 1;
        this.ctx.fillText(`GAME OVER!`, this.canvasSize.w / 2 - 95, this.canvasSize.h / 2 + 40);
        this.ctx.font = 'bold 17px Courier New';
        this.ctx.fillStyle = '#492B00';
        this.ctx.shadowOffsetX = 0.5;
        this.ctx.shadowOffsetY = 0.5;
        this.ctx.shadowBlur = 2;
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillText(`(don't worry,`, this.canvasSize.w / 2 - 100, this.canvasSize.h / 2 + 70);
        this.ctx.fillText(`Popino still loves you)`, this.canvasSize.w / 2 - 95, this.canvasSize.h / 2 + 90);
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;

        //clearInterval(1)

    },

    //-- COLLISION METHODS

    detectCollisionWithEnemies() {
        let isColliding = false

        this.enemies.forEach((enemy) => {
            if (!enemy.isDestroyed &&
                this.player.playerSpecs.pos.x < enemy.enemySpecs.pos.x + enemy.enemySpecs.size.w &&
                this.player.playerSpecs.pos.x + this.player.playerSpecs.size.w > enemy.enemySpecs.pos.x &&
                this.player.playerSpecs.pos.y < enemy.enemySpecs.pos.y + enemy.enemySpecs.size.h &&
                this.player.playerSpecs.size.h + this.player.playerSpecs.pos.y > enemy.enemySpecs.pos.y)

                isColliding = true
            // this.TouchEnemy()

        })

        if (isColliding && !this.player.wasColliding) {
            this.lifeCounter--
            if (this.lifeCounter === 0) {
                this.gameOver()
                this.drawScore()
                clearInterval(1)

            }
        }

        this.player.wasColliding = isColliding

    },

    detectDeathPits() {
        if (this.player.playerSpecs.pos.y + this.player.playerSpecs.size.h >= this.canvasSize.h) {

            this.gameOver()
            clearInterval(1)
        }
    },

    detectCollisionWithPlatforms() {

        this.platforms.forEach((plat) => {
            if (this.player.playerSpecs.pos.y + this.player.playerSpecs.size.h <= plat.platformSpecs.pos.y &&
                this.player.playerSpecs.pos.y + this.player.playerSpecs.size.h + this.player.playerSpecs.vel.y >= plat.platformSpecs.pos.y &&
                this.player.playerSpecs.pos.x + this.player.playerSpecs.size.w >= plat.platformSpecs.pos.x &&
                this.player.playerSpecs.pos.x <= plat.platformSpecs.pos.x + plat.platformSpecs.size.w
            ) {
                //CODIGO PAULA QUE PODRIA HABERNOS AHORRADO UN DIA DE BORRA-TRABAJO
                this.player.jumpCounter = 0
                this.player.playerSpecs.vel.y = 0
            }
        })
    },

    // detectCollisionWithMovingPlatforms() {

    //     this.movingPlat.forEach((movPlat) => {
    //         if (this.player.playerSpecs.pos.y + this.player.playerSpecs.size.h <= movPlat.movingPlatSpecs.pos.y &&
    //             this.player.playerSpecs.pos.y + this.player.playerSpecs.size.h + this.player.playerSpecs.vel.y >= movPlat.movingPlatSpecs.pos.y &&
    //             this.player.playerSpecs.pos.x + this.player.playerSpecs.size.w >= movPlat.movingPlatSpecs.pos.x &&
    //             this.player.playerSpecs.pos.x <= movPlat.movingPlatSpecs.pos.x + movPlat.movingPlatSpecs.size.w
    //         ) {
    //             //CODIGO PAULA QUE PODRIA HABERNOS AHORRADO UN DIA DE BORRA-TRABAJO
    //             this.player.jumpCounter = 0
    //             this.player.playerSpecs.vel.y = 0
    //         }
    //     })
    // },

    detectCollisionWithFloor() {

        this.floor.forEach((flr) => {
            if (this.player.playerSpecs.pos.y + this.player.playerSpecs.size.h <= flr.floorSpecs.pos.y &&
                this.player.playerSpecs.pos.y + this.player.playerSpecs.size.h + this.player.playerSpecs.vel.y >= flr.floorSpecs.pos.y &&
                this.player.playerSpecs.pos.x + this.player.playerSpecs.size.w >= flr.floorSpecs.pos.x &&
                this.player.playerSpecs.pos.x <= flr.floorSpecs.pos.x + flr.floorSpecs.size.w
            ) {
                //CODIGO PAULA QUE PODRIA HABERNOS AHORRADO UN DIA DE BORRA-TRABAJO
                this.player.jumpCounter = 0
                this.player.playerSpecs.vel.y = 0
            }
        })
    },

    detectCollisionWithTokens() {
        this.tokens.forEach((token, i) => {
            if (this.player.playerSpecs.pos.x < token.tokenSpecs.pos.x + token.tokenSpecs.size.w &&
                this.player.playerSpecs.pos.x + this.player.playerSpecs.size.w > token.tokenSpecs.pos.x &&
                this.player.playerSpecs.pos.y < token.tokenSpecs.pos.y + token.tokenSpecs.size.h &&
                this.player.playerSpecs.size.h + this.player.playerSpecs.pos.y > token.tokenSpecs.pos.y) {

                this.tokens.splice(i, 1)
                this.tokenCounter++
                this.weaponCounter += 10
                this.takeToken()

            }
        })
    },
    detectCollisionWithTreats() {
        this.treats.forEach((treat, i) => {
            if (this.player.playerSpecs.pos.x < treat.treatSpecs.pos.x + treat.treatSpecs.size.w &&
                this.player.playerSpecs.pos.x + this.player.playerSpecs.size.w > treat.treatSpecs.pos.x &&
                this.player.playerSpecs.pos.y < treat.treatSpecs.pos.y + treat.treatSpecs.size.h &&
                this.player.playerSpecs.size.h + this.player.playerSpecs.pos.y > treat.treatSpecs.pos.y) {

                this.treats.splice(i, 1)
                this.lifeCounter++

            }
        })
    },

    detectCollisionWeaponsEnemies() {

        this.enemies.forEach((enemy) => {

            this.weapons.forEach((weapon, j) => {

                if (enemy.enemySpecs.pos.x + enemy.enemySpecs.size.w > weapon.weaponSpecs.pos.x &&
                    enemy.enemySpecs.pos.x < weapon.weaponSpecs.pos.x + weapon.weaponSpecs.size.w &&
                    enemy.enemySpecs.pos.y + enemy.enemySpecs.size.h > weapon.weaponSpecs.pos.y &&
                    enemy.enemySpecs.pos.y < weapon.weaponSpecs.pos.y + weapon.weaponSpecs.size.h) {

                    enemy.isDestroyed = true
                    this.weapons.splice(j, 1)
                    this.score += 5
                    this.killEnemy()
                }
            })
        })

    },

    detectCollisionWeaponsBackEnemies() {

        this.enemies.forEach((enemy) => {

            this.weaponsBack.forEach((weaponB, j) => {

                if (enemy.enemySpecs.pos.x + enemy.enemySpecs.size.w > weaponB.weaponBackSpecs.pos.x &&
                    enemy.enemySpecs.pos.x < weaponB.weaponBackSpecs.pos.x + weaponB.weaponBackSpecs.size.w &&
                    enemy.enemySpecs.pos.y + enemy.enemySpecs.size.h > weaponB.weaponBackSpecs.pos.y &&
                    enemy.enemySpecs.pos.y < weaponB.weaponBackSpecs.pos.y + weaponB.weaponBackSpecs.size.h) {

                    enemy.isDestroyed = true
                    this.weaponsBack.splice(j, 1)
                    this.score += 5
                    this.killEnemy()
                }
            })
        })

    },


    //-- CLEAR METHODS

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    clearObjects() {
        this.enemies = this.enemies.filter(eachEnemy => eachEnemy.enemySpecs.pos.x > 0)
        this.butterflies = this.butterflies.filter(eachButterfly => eachButterfly.butterflySpecs.pos.x > 0)
        this.weapons = this.weapons.filter(eachWeapon => eachWeapon.weaponSpecs.pos.x > 0)
        this.weaponsBack = this.weaponsBack.filter(eachWeaponB => eachWeaponB.weaponBackSpecs.pos.x > 0)
    },

    //-- COMMAND METHODS

    setEventListeners() {
        window.addEventListener('keydown', (event) => {

            switch (event.key) {
                case 'ArrowLeft':
                    this.player.keys.ArrowLeft.pressed = true
                    break
                case 'ArrowRight':
                    this.player.keys.ArrowRight.pressed = true
                    break
                case 'ArrowUp':
                    this.player.keys.ArrowUp.pressed = true
                    if (this.player.jumpCounter < 2) {
                        this.player.jumpCounter++
                        this.player.playerSpecs.vel.y = -20
                    }
                    break

                case 'b':
                    this.weaponCounter--
                    if (this.weaponCounter > 0) {
                        this.createWeapons()
                    }
                    if (this.weaponCounter < 0) this.weaponCounter = 0
                    break

                case 'v':
                    this.weaponCounter--
                    if (this.weaponCounter > 0) {
                        this.createWeaponsBack()

                    }
                    if (this.weaponCounter < 0) this.weaponCounter = 0
                    break

                case 'p':
                    this.gamePaused()
                    clearInterval(1)
                    break
                case 'o':
                    this.player.keys.o.pressed = true
                    this.init()
                    break
                case 'Enter':
                    this.music()
                    break
            }

        })

        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.player.keys.ArrowLeft.pressed = false
                    break
                case 'ArrowRight':
                    this.player.keys.ArrowRight.pressed = false
                    break
                case ' ':
                    this.player.keys.Space.pressed = false
                    break
                case 'o':
                    this.player.keys.o.pressed = false
                    break
                // case
                // this.keys.Enter.pressed = false
                // break
            }
        })
    },

}