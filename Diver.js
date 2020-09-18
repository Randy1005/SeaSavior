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

        // garbage collection counter
        this.maxGarbages = 6;
        this.garbageBin = [];

        config.scene.add.existing(this);
    }

    update() {
        this.moveDiverManager();
    }


    moveDiverManager() {
        this.body.setVelocity(0);

        if (this.cursorKeys.left.isDown) {

            this.body.setVelocityX(-this.playerSpeed);
        } else if (this.cursorKeys.right.isDown) {
            this.body.setVelocityX(this.playerSpeed);
        }

        if (this.cursorKeys.up.isDown) {
            this.body.setVelocityY(-this.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
            this.body.setVelocityY(this.playerSpeed);
        }

    }

    spriteCollision(sprite1, sprite2) {
        if (sprite2.objectID == 'GARBAGE' || sprite1.objectID == 'GARBAGE') {
            console.log("collide with trash");
        }

    }

}