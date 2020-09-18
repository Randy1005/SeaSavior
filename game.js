var config = {
  width: 728,
  height: 410,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2],
  pixelArt: true,
  physics: {
	default: "arcade",
	  arcade:{
		  debug: false
	}
  }
}

var gameSettings = {
	playerSpeed: 100
}


var game = new Phaser.Game(config);