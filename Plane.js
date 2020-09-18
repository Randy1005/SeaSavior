class Plane extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, speed, goLeft) {

        super(scene, x, y, 'plane');

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        scene.planes.add(this);
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.goLeft = goLeft;

        if (goLeft) {
            this.flipX = true;
        }
    }

    moveHorizontal() {
        if (this.goLeft) {

            this.x -= this.speed;
            if (this.x < -50)
                this.x = config.width + 50;
        } else {
            this.x += this.speed;
            if (this.x > config.width + 50)
                this.x = -50;
        }
    }

    dropGarbage() {

    }

    update() {
        this.moveHorizontal();
    }
}