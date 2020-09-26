var config = {
    width: 960,
    height: 600,
    backgroundColor: 0xFFFFFF,
    scene: [Scene1, Scene2],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
	health: 100
}



var game = new Phaser.Game(config);