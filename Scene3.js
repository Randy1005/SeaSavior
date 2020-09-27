class Scene3 extends Phaser.Scene {
    constructor() {
        super("endGame");
    }

    create() {
        this.background = this.add.image(0, 0, 'endGameScreen');
        this.background.setOrigin(0, 0);
        this.spacebar = this.input.keyboard.addKey('SPACE');
    }

    update() {
        if (this.spacebar.isDown)
            this.scene.start('playGame');
            config.health = 100;
    }

}