class Scene2 extends Phaser.Scene {


    constructor() {
        super("playGame");
    }

    create() {
        // background
        this.background = this.add.image(0, 0, 'sea');
        this.background.setOrigin(0, 0);

        // planes
        this.planes = this.physics.add.group();

        var plane1 = new Plane(this, 20, 20, 0.8, false);
        var plane2 = new Plane(this, 50, 40, 1.7, false);
        var plane3 = new Plane(this, 500, 70, 2, true);
        var plane4 = new Plane(this, 480, 100, 0.9, true);

        // garbages
        this.garbageList = this.physics.add.group();

        // player
        this.diver = new Diver({
            scene: this,
            x: game.config.width / 2,
            y: 300,
            texture: 'diver'
        }, 100, [40, 60]);


        this.gb = new Garbage({
            scene: this,
            x: game.config.width / 2,
            y: 2,
            texture: 'trash'
        }, [25, 30])

    }


    update() {
        for (var i = 0; i < this.planes.getChildren().length; i++) {
            var temp = this.planes.getChildren()[i];
            temp.update();
        }

        this.diver.update();
        this.gb.Update();

    }
}