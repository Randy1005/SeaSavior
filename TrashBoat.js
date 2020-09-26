class TrashBoat extends Phaser.GameObjects.Sprite {
    constructor(config, boatSpeed, size) {
        super(config.scene, config.x, config.y, config.texture);

        // store a scene intance
        this.scene = config.scene;

        // do not update this object in scene
        this.setActive(false);

        // store its spawn position
        this.spawnPosition = {
            x: config.x,
            y: config.y
        }

        this.objectID = 'TRASHBOAT';

        // set sprite size
        this.displayWidth = size[0];
        this.displayHeight = size[1];

        config.scene.physics.world.enableBody(this);
        this.body.gravity.y = 0;
        this.body.collideWorldBounds = false;

        // moving speed
        this.boatSpeed = boatSpeed;

        config.scene.add.existing(this);
    }


    move() {
        // update this object if active, set back to spawn position if inactive
        if (this.active) {
            this.x -= this.boatSpeed;
            if (this.x < -20) {
                // resume event timer first before disabling update
                this.scene.trashBoatTimer.paused = false;
				this.scene.trashBoat.setTexture("trashboat0");
                this.setActive(false);
            }
        } else {
            this.setPosition(this.spawnPosition.x, this.spawnPosition.y);
        }
    }

    update() {
        this.move();
    }


}