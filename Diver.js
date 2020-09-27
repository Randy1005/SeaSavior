class Diver extends Phaser.GameObjects.Sprite {
    constructor(config, playerSpeed, size) {
        super(config.scene, config.x, config.y, config.texture);

        this.objectID = 'DIVER';

        // set sprite size
        this.displayWidth = size[0];
        this.displayHeight = size[1];

        config.scene.physics.world.enableBody(this);
        this.body.gravity.y = 0;
        this.body.collideWorldBounds = true;

        // moving speed
        this.playerSpeed = playerSpeed;

        // input
        this.cursorKeys = config.scene.input.keyboard.createCursorKeys();
        this.spacebar = config.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // garbage collection counter
        this.maxGarbages = 10;
        this.garbageCnt = 0;

        // num of shot down planes
        this.numShotDownPlanes = 0;

        // add animation
        var numOfAnime = 0;
        this.play('diver_idle_anim');

        config.scene.add.existing(this);
    }

    playAnimation(animeNum) { // 0 for idle, 1 for left, 2 for right
        if (this.numOfAnime != animeNum){
            this.numOfAnime = animeNum;
            if (animeNum == 0) {
                this.texture = 'diver_idle';
                this.play('diver_idle_anim');
            }
            if (animeNum == 1) {
                this.texture = 'diver_left';
                this.play('diver_left_anim');     
            }
            if (animeNum == 2) {
                this.texture = 'diver_right';
                this.play('diver_right_anim');
            }
        }
    }

    moveDiverManager() {
        this.body.setVelocity(0);

        if (this.cursorKeys.left.isDown) {
            this.body.setVelocityX(-this.playerSpeed); 
            this.playAnimation(1);
        } else if (this.cursorKeys.right.isDown) {
            this.body.setVelocityX(this.playerSpeed);
            this.playAnimation(2);
        } else {
            this.playAnimation(0);
        }

        if (this.cursorKeys.up.isDown && this.y > 308) {
            this.body.setVelocityY(-this.playerSpeed);
        } else if (this.cursorKeys.down.isDown && this.y < 505) {
            this.body.setVelocityY(this.playerSpeed);
        }
    }

    diverActionManager(scene) {
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.shootGarbage(scene);
        }
    }

    addGarbage() {
        if (this.garbageCnt < this.maxGarbages) {
            this.garbageCnt++;
            console.log("garbage count: " + this.garbageCnt);
        } else
            return;
    }

    shootGarbage(scene) {
        if (this.garbageCnt > 0) {
            this.garbageCnt--;
            // create garbage
            var garbage = new Garbage({
                scene: scene,
                x: this.x,
                y: this.y - 60,
                texture: 'trash'
            }, [30, 41]);
            garbage.isShootBack = true;;
            scene.garbageList.add(garbage);
			scene.redrawHUD();
        }
        console.log("garbage count: " + this.garbageCnt);
    }


    update(scene) {
        this.moveDiverManager();
        this.diverActionManager(scene);
    }


}