class TrashBoat extends Phaser.GameObjects.Sprite {
    constructor(config, boatSpeed, size) {
        super(config.scene, config.x, config.y, config.texture);

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
        this.x -= this.boatSpeed;
    }

    update() {
        this.move();
    }


}