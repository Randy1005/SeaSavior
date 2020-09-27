class Scene2 extends Phaser.Scene {

    constructor() {
        super("playGame");
    }

    create() {
        var seaSurfaceDepth = 293;

        // background
        this.background = this.add.image(0, 0, 'sea0');
        this.background.setOrigin(0, 0);

        // planes
        this.planes = this.physics.add.group();

        var plane1 = new Plane(this, 20, 20, 0.8, false);
        var plane2 = new Plane(this, 50, 40, 1.7, false);
        var plane3 = new Plane(this, 500, 70, 2, true);
        var plane4 = new Plane(this, 480, 100, 0.9, true);
        this.garbageSpawnInterval = 5000;


        // garbages
        this.garbageList = this.physics.add.group();

        // player
        this.diver = new Diver({
            scene: this,
            x: game.config.width / 2,
            y: 310,
            texture: 'diver_idle'
        }, 200, [70, 70]);

        // trashboat
        this.trashBoat = new TrashBoat({
            scene: this,
            x: game.config.width + 80,
            y: seaSurfaceDepth,
            texture: 'trashboat0'
        }, 0.6, [150, 150]);


        // a timer to create garbage
        this.garbageSpawnTimer = this.time.addEvent({
            delay: this.garbageSpawnInterval,
            callback: this.creatingGarbage,
            callbackScope: this,
            loop: true
        });

        // a timer to activate trash boat
        this.trashBoatTimer = this.time.addEvent({
            delay: 1000 * 20,
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

        // HUD
        this.garbageHUD = this.add.group();
        for (var i = 0; i < this.diver.maxGarbages; i++) {
            var g = this.add.image(i * 60 + 180, 570, 'trash');
            g.setAlpha(0.5);
            this.garbageHUD.add(g);
        }

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

            // increment shot down planes
            this.diver.numShotDownPlanes++;
        }
    }


    // for diver to update garbage collection
    collectGarbage(diver, garbage) {
        //garbage.body.enable = false;
        if (garbage.active && diver.garbageCnt < diver.maxGarbages) {
            garbage.destroy();
            diver.addGarbage();
            this.redrawHUD();
        } else {
            return;
        }
    }


    // for trash boat to collect garbage (no limits)
    trashBoatCollectGarbage(trashBoat, garbage) {
        if (garbage.active) {
            garbage.destroy();
            this.trashBoat.setTexture("trashboat1");
        } else
            return;
    }

    // activate trash boat after a specific time interval
    activateTrashBoat() {
        this.trashBoat.setActive(true);
        this.trashBoatTimer.paused = true;
    }

    redrawHUD() {
        var i = 0;
        for (; i < this.diver.garbageCnt; i++) {
            this.garbageHUD.getChildren()[i].setAlpha(1);
        }
        for (; i < this.garbageHUD.getChildren().length; i++) {
            this.garbageHUD.getChildren()[i].setAlpha(0.5);
        }
    }

    gameOver() {
        this.scene.pause();
    }

    update() {
        for (var i = 0; i < this.planes.getChildren().length; i++) {
            var oneplane = this.planes.getChildren()[i];
            oneplane.update();
        }
        this.diver.update(this);
        this.droppingGarbage();

        this.trashBoat.update();
        if (config.health <= 0) {
            console.log("You Died");
            this.gameOver();
        }
        if (config.health == 80) {
            this.background.setTexture("sea1");
            config.health = 81;
        }
        if (config.health == 51) {
            this.background.setTexture("sea2");
            config.health = 50;
        }
        if (config.health == 20) {
            this.background.setTexture("sea3");
            config.health = 19;
        }


        // increase difficulty as diver shoots down more planes
        if (this.diver.numShotDownPlanes >= 10) {
            // shrink garbage spawn interval
            this.garbageSpawnInterval *= 0.7;
            this.garbageSpawnTimer.delay = this.garbageSpawnInterval;

            this.diver.numShotDownPlanes = 0;
        }

    }
}