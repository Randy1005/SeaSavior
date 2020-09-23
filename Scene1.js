class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image('sea', 'assets/sprites/background.png');
        this.load.image('plane', 'assets/sprites/plane.png');
        this.load.image('diver', 'assets/sprites/scuba.png');
        this.load.image('trash', 'assets/sprites/trash.png');
        this.load.image('trashboat', 'assets/sprites/ship_placeholder.png');
    }

    create() {
        this.add.text(20, 20, 'Loading...');
        this.scene.start('playGame');
    }
}