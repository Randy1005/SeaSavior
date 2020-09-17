class Scene1 extends Phaser.Scene {
	constructor() {
		super("bootGame");
	}
	
	preload() {
		this.load.image('sea', 'assets/sprites/sea.png');
		this.load.image('fish', 'assets/sprites/fish.png');
		this.load.image('plane', 'assets/sprites/plane.png');
	}
	
	create() {
		this.add.text(20, 20, "Loading...");
		this.scene.start("playGame");
	}
}