class Garbage extends Phaser.GameObjects.Sprite {
    constructor(config, size) {   
        super (config.scene, config.x, config.y, config.texture);
        this.displayWidth = size[0];
        this.displayHeight = size[1];
        config.scene.add.existing(this); 
    }
	
	setGravityOn(scene) {
		scene.physics.world.enableBody(this);
		this.body.collideWorldBounds = true;
		this.body.gravity.y = 100;
	}

    Update() {
        console.log(this.body.gravity.y);
    }
}