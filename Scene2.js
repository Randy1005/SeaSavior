class Scene2 extends Phaser.Scene {
	constructor() {
		super("playGame");
	}
	
	create() {
		this.background = this.add.image(0, 0, 'sea');
		this.background.setOrigin(0,0);
		
		this.plane1 = this.add.image(20, 10, 'plane');
		this.plane2 = this.add.image(50, 40, 'plane');
		this.plane3 = this.add.image(500, 70, 'plane');
		this.plane3.flipX = true;
		this.plane4 = this.add.image(480, 100, 'plane');
		this.plane4.flipX = true;
				
		this.fish = this.add.image(200, 300, 'fish')
		
		
		/*this.add.text(20, 20, 'haha...', {
			font: '30px Arial', fill: 'red'
			});*/
	}
	
	moveHorizontal(plane, speed, goLeft) {
		if (goLeft)
		{
			plane.x -= speed;
		}
		else
		{
			plane.x += speed;
		}
	}
	
	moveVertical(plane, speed, goUp) {
		if (goUp)
		{
			plane.y -= speed;
		}
		else
		{
			plane.y += speed;
		}
	}
	

	update() {
		this.moveHorizontal(this.plane1, 1, false);
		this.moveHorizontal(this.plane2, 2, false);
		this.moveHorizontal(this.plane3, 2, true);
		this.moveHorizontal(this.plane4, 1, true);
	}
}