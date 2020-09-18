class Scene2 extends Phaser.Scene {
	constructor() {
		super("playGame");
	}
	
	create() {
		// background
		this.background = this.add.image(0, 0, 'sea');
		this.background.setOrigin(0,0);
		
		// planes
		this.planes = this.physics.add.group();
		
		var plane1 = new Plane(this, 20, 20, 0.8, false);
		var plane2 = new Plane(this, 50, 40, 1.7, false);
		var plane3 = new Plane(this, 500, 70, 2, true);
		var plane4 = new Plane(this, 480, 100, 0.9, true);
		
		// garbages
		this.garbageList = this.physics.add.group();
		
		// player
		this.diver = this.physics.add.image(config.width / 2, 300, 'diver');
		this.diver.setCollideWorldBounds(true);
		
		// input
		this.cursorKeys = this.input.keyboard.createCursorKeys();
		
		
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
		for (var i = 0; i < this.planes.getChildren().length; i++) {
			var temp = this.planes.getChildren()[i];
			temp.update();
			//console.log("here!");
		}

		this.moveDiverManager();
		
	}
}