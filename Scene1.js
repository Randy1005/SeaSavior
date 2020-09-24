class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image('sea0', 'assets/sprites/ocean_bg_v5_pollution_0.png');
		this.load.image('sea1', 'assets/sprites/ocean_bg_v5_pollution_1.png');
		this.load.image('sea2', 'assets/sprites/ocean_bg_v5_pollution_2.png');
		this.load.image('sea3', 'assets/sprites/ocean_bg_v5_pollution_3.png');
        this.load.image('plane', 'assets/sprites/plane_resize.png');
        this.load.image('diver', 'assets/sprites/scuba.png');
        this.load.image('trash', 'assets/sprites/t_trash_bag_30_41.png');
        this.load.image('trashboat', 'assets/sprites/ship_resize.png');
    }

    create() {
        this.add.text(20, 20, 'Loading...');
        this.scene.start('playGame');
    }
}