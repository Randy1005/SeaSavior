class Garbage extends Phaser.GameObjects.Sprite {
    constructor(config, size) {   
        super (config.scene, config.x, config.y, config.texture);
        this.displayWidth = size[0];
        this.displayHeight = size[1];
        config.scene.physics.world.enableBody(this);
        this.body.gravity.y = 100;
        this.body.collideWorldBounds = true;

        config.scene.add.existing(this); 
    }

    Update() {
        console.log(this.body.position);
    }
}