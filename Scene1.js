class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image('sea0', 'assets/sprites/ocean_bg_v5_pollution_0.png');
        this.load.image('sea1', 'assets/sprites/ocean_bg_v5_pollution_1.png');
        this.load.image('sea2', 'assets/sprites/ocean_bg_v5_pollution_2.png');
        this.load.image('sea3', 'assets/sprites/ocean_bg_v5_pollution_3.png');
        this.load.image('UIbar', 'assets/sprites/trash_bar_short.png');
        this.load.image('plane', 'assets/sprites/plane_resize.png');
        this.load.image('trash', 'assets/sprites/t_trash_bag_v2_25_34.png');
        this.load.image('trashboat0', 'assets/sprites/trashLoader0.png');
        this.load.image('trashboat1', 'assets/sprites/trashLoader1.png');
        this.load.image('endGameScreen', 'assets/sprites/game_over_screen_with_bg.png')
        this.load.spritesheet('diver_idle', 'assets/sprites/t_cha_idle_sheet.png', {
            frameWidth: 70,
            frameHeight: 70
        });
        this.load.spritesheet('diver_left', 'assets/sprites/t_cha_move_left_sheet.png', {
            frameWidth: 70,
            frameHeight: 70
        });
        this.load.spritesheet('diver_right', 'assets/sprites/t_cha_move_right_sheet.png', {
            frameWidth: 70,
            frameHeight: 70
        });
    }

    create() {
        this.add.text(20, 20, 'Loading...');
        this.scene.start('playGame');

        this.anims.create({
            key: 'diver_idle_anim',
            frames: this.anims.generateFrameNumbers("diver_idle"),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'diver_left_anim',
            frames: this.anims.generateFrameNumbers("diver_left"),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'diver_right_anim',
            frames: this.anims.generateFrameNumbers("diver_right"),
            frameRate: 10,
            repeat: -1
        });
    }
}