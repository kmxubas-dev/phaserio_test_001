// import {CST} from "./../CST.js";
import "./../../../vendors/phaserio/plugins/spine/SpinePlugin.min.js";

export class Alien extends SpinePlugin.SpineGameObject 
{
    constructor(scene, x, y)
    {
        super(scene, scene.spine, x, y, 'alien', 'run', true);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.setScale(0.225);
    }

    flipX (flip) {
        if (flip) {
            this.body.setOffset(this.body.width, 0);
            this.setScale(-0.225, 0.225);
        } else {
            this.body.setOffset(0, 0);
            this.setScale(0.225, 0.225);
        }
    }

    die () {
        this.play('death', true, true);
        setTimeout(()=>{
            this.destroy();
        }, 2000);
    }
}

