class Scene2 extends Phaser.Scene {

    constructor() {
        super("playGame");
    }

    create() {
        var seaSurfaceDepth = 290;

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

        // trashboat
        this.trashBoat = new TrashBoat({
            scene: this,
            x: game.config.width + 60,
            y: seaSurfaceDepth,
            texture: 'trashboat'
        }, 0.6, [60, 60]);


        // a timer to create garbage
        this.time.addEvent({
            delay: 5000,
            callback: this.creatingGarbage,
            callbackScope: this,
            loop: true
        });

        // a timer to activate trash boat
        this.trashBoatTimer = this.time.addEvent({
            delay: 1000 * 2,
            callback: this.activateTrashBoat,
            callbackScope: this,
            loop: true,
            paused: false
        });



        // add overlap listener for garbages and trashboat
        this.physics.add.overlap(this.trashBoat, this.garbageList, this.trashBoatCollectGarbage, null, this);


        // add overlap listener to diver and grabages
        this.physics.add.overlap(this.diver, this.garbageList, this.collectGarbage, null, this);
        // add collision listener to plane and grabages
        this.physics.add.overlap(this.planes, this.garbageList, this.shootingPlane, null, this);
    }

    creatingGarbage() {
        for (var i = 0; i < this.planes.getChildren().length; i++) {
            var oneplane = this.planes.getChildren()[i];
            oneplane.createGarbage(this);
        }
    }

    droppingGarbage() {
        for (var i = 0; i < this.garbageList.getChildren().length; i++) {
            var g = this.garbageList.getChildren()[i];
            g.Update(this);
        }
    }

    shootingGarbage(plane, garbage) {
        if (garbage.isShootBack) {
            garbage.destroy();
            plane.destroy();
        }
    }
    respwanPlane(planeY, planeSpeed, planeDir) {
        console.log("creating a plane");
        var plane = new Plane(this, -50, planeY, planeSpeed, planeDir);
    }

    shootingPlane(plane, garbage) {
        if (garbage.isShootBack) {
            garbage.destroy();
            this.time.delayedCall(5000, this.respwanPlane, [plane.y, plane.speed, plane.goLeft], this);
            plane.destroy();
        }
    }


    // for diver to update garbage collection
    collectGarbage(diver, garbage) {
        //garbage.body.enable = false;
        if (garbage.active && diver.garbageCnt < 6) {
            garbage.destroy();
            diver.addGarbage();
        } else {
            return;
        }
    }


    // for trash boat to collect garbage (no limits)
    trashBoatCollectGarbage(trashBoat, garbage) {
        if (garbage.active) {
            garbage.destroy();
        } else
            return;
    }

    // activate trash boat after a specific time interval
    activateTrashBoat() {
        this.trashBoat.setActive(true);
        this.trashBoatTimer.paused = true;
    }


    update() {
        for (var i = 0; i < this.planes.getChildren().length; i++) {
            var oneplane = this.planes.getChildren()[i];
            oneplane.update();
        }
        this.diver.update(this);
        this.droppingGarbage();

        this.trashBoat.update();
        this.droppingGarbage();
    }
}