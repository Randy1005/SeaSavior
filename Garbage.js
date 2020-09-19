class Garbage extends Phaser.GameObjects.Sprite {
    constructor(config, size) {
        super(config.scene, config.x, config.y, config.texture);
        this.objectID = 'GARBAGE';
        this.displayWidth = size[0];
        this.displayHeight = size[1];
<<<<<<< HEAD
        config.scene.physics.world.enableBody(this);
        this.body.gravity.y = 100;
        this.body.collideWorldBounds = true;

        config.scene.add.existing(this);
=======
        config.scene.add.existing(this); 
>>>>>>> bd2f3f5edcd16de8c53a08d781f94e3062ab3d33
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