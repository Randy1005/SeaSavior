class Garbage extends Phaser.GameObjects.Sprite {
    constructor(config, size) {
        super(config.scene, config.x, config.y, config.texture);
        this.objectID = 'GARBAGE';
        this.displayWidth = size[0];
        this.displayHeight = size[1];
        config.scene.add.existing(this);
        // status if it is been throwed back
        this.isShootBack = false;
		this.startDecaying = 0;
    }

    setGravityOn(scene) {
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        this.body.gravity.y = 100;
        //this.body.velocity.y = 100;
    }

    setGravityUp(scene) {
        scene.physics.world.enableBody(this);
        this.body.collideWorldBounds = true;
        //this.body.gravity.y = 100;
        this.body.velocity.y = -250;
        this.isShootBack = true;
    }
	
	decay(scene)
	{
		config.health -= 10;
		this.destroy();
	}

    Update(scene) {
        if (this.isShootBack)
            this.setGravityUp(scene);
        else
            this.setGravityOn(scene);
        if (this.y < 30)
            this.isShootBack = false;
        if (this.y > 320 && !this.isShootBack) {
            this.body.gravity.y = 0;
            this.body.velocity.y = 20;
        }
		if (this.y > 524 && this.startDecaying == 0) {
			scene.time.delayedCall(2000, this.decay, [], this);
			this.startDecaying++;
		}
    }
}