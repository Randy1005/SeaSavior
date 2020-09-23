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
        this.maxGarbages = 6;
        this.garbageCnt = 6;

        config.scene.add.existing(this);
    }

    moveDiverManager() {
        this.body.setVelocity(0);

        if (this.cursorKeys.left.isDown) {
            this.body.setVelocityX(-this.playerSpeed);
			this.flipX = false;
        } else if (this.cursorKeys.right.isDown) {
            this.body.setVelocityX(this.playerSpeed);
			this.flipX = true;
        }

        if (this.cursorKeys.up.isDown && this.y > 308) {
            this.body.setVelocityY(-this.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
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
				}, [25, 30]);
			garbage.isShootBack = true;;
			scene.garbageList.add(garbage);
		}
		console.log("garbage count: " + this.garbageCnt);
	}


    update(scene) {
        this.moveDiverManager();
		this.diverActionManager(scene);
    }


}