class Scene2 extends Phaser.Scene {
	constructor() {
		super("playGame");
	}
	
	create() {
		// background
		this.background = this.add.image(0, 0, 'sea');
		this.background.setOrigin(0,0);
		
		// planes
		this.plane1 = this.add.image(20, 10, 'plane');
		this.plane2 = this.add.image(50, 40, 'plane');
		this.plane3 = this.add.image(500, 70, 'plane');
		this.plane3.flipX = true;
		this.plane4 = this.add.image(480, 100, 'plane');
		this.plane4.flipX = true;
		
		// player
		this.diver = this.physics.add.image(config.width / 2, 300, 'diver');
		this.diver.setCollideWorldBounds(true);
		
		// input
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		
	}
	
	moveHorizontal(plane, speed, goLeft) {
		if (goLeft)
		{
			plane.x -= speed;
			if (plane.x < -50)
				plane.x = config.width + 50;
		}
		else
		{
			plane.x += speed;
			if (plane.x > config.width + 50)
				plane.x = -50;
		}
	}
	
	moveDiverManager() {
		this.diver.setVelocity(0);
		
		if (this.cursorKeys.left.isDown) {
			this.diver.setVelocityX(-gameSettings.playerSpeed);
		} else if (this.cursorKeys.right.isDown) {
			this.diver.setVelocityX(gameSettings.playerSpeed);
		}

		if (this.cursorKeys.up.isDown) {
			this.diver.setVelocityY(-gameSettings.playerSpeed);
		} else if (this.cursorKeys.down.isDown) {
			this.diver.setVelocityY(gameSettings.playerSpeed);
		}
		
	}
	
	

	update() {
		this.moveHorizontal(this.plane1, 0.8, false);
		this.moveHorizontal(this.plane2, 1.7, false);
		this.moveHorizontal(this.plane3, 2, true);
		this.moveHorizontal(this.plane4, 0.9, true);
		
		this.moveDiverManager();
		
	}
}