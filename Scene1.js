class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image('sea', 'assets/sprites/sea.png');
        this.load.image('plane', 'assets/sprites/plane_placeholder.png');
        this.load.image('diver', 'assets/sprites/scuba_placeholder.png');
        this.load.image('sub', 'assets/sprites/sub_placeholder.png');
        this.load.image('trash', 'assets/sprites/trash.png');
        this.load.image('trashboat', 'assets/sprites/ship_placeholder.png');
    }

    create() {
        this.add.text(20, 20, 'Loading...');
        this.scene.start('playGame');
    }
}