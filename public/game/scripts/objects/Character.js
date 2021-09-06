// import {CST} from "./../CST.js";
import "./../../../vendors/phaserio/plugins/spine/SpinePlugin.min.js";

export class Character extends SpinePlugin.SpineGameObject {

    constructor(scene, x, y) 
    {
        super(scene, scene.spine, x, y, 'character', 'idle', true);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
        this.setScale(0.2);

        this.alive = true;
        this.bullets = {
            body: new Bullets(scene),
            direction: 'right'
        }

        let downKey = scene.input.keyboard.addKey(40);
        downKey.on('down', (pointer) => {
            this.fire();
        });
    }

    // METHODS
    update (cursors) {
        if (this.alive) 
        {
            if (cursors.left.isDown)
            {
                this.play('walk', true, true);
            }
            else if (cursors.right.isDown)
            {
                this.play('walk', true, true);
            }
            else if (cursors.down.isDown)
            {
                this.play('shoot', true, true);
            }
            else
            {
                this.play('idle', true, true);
            }

            if ((cursors.up.isDown || cursors.space.isDown) && this.body.touching.down)
            {
                this.body.setVelocityY(-550);
                // this.setAnimation(0, 'jump', false);
                // this.addAnimation(0,'idle', true, 1.35);
            }



            if (cursors.left.isDown)
            {
                this.bullets.direction = 'left';
                this.body.setVelocityX(-300);
                this.flipX(true);
            }
            else if (cursors.right.isDown)
            {
                this.bullets.direction = 'right';
                this.body.setVelocityX(300);
                this.flipX(false);
            } 
            else 
            {
                this.body.setVelocityX(0);
            }
        }
        else 
        {
            this.body.setVelocityX(0);
            this.play('death', true, true);
        }
    }

    flipX (flip) {
        if (flip) 
        {
            this.body.setOffset(this.body.width*3.75, 0);
            this.setScale(-0.2, 0.2);
        } 
        else 
        {
            this.body.setOffset(0, 0);
            this.setScale(0.2, 0.2);
        }
    }

    fire () 
    {
        if (this.bullets.direction === 'right') 
        {
            this.bullets.body.fireBullet(this.x+55, this.y-85, this.bullets.direction);
        }
        else 
        {
            this.bullets.body.fireBullet(this.x-50, this.y-85, this.bullets.direction);
        }
    }
}



class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.setImmovable(true);

        this.scene = scene;
    }

    fire (x, y, d)
    {
        let direction;
        if (d === 'right') 
        {
            this.angle = 0;
            direction = 500;
        } 
        else 
        {
            this.angle = 180;
            direction = -500;
        }
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(direction);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);
        if (this.x >= this.scene.scale.width || this.x <= 0)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);
        this.defaults.setAllowGravity = false;

        this.createMultiple({
            key: 'bullet',
            frameQuantity: 5,
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (x, y, d)
    {
        let bullet = this.getFirstDead(false);
        if (bullet)
        {
            bullet.fire(x, y, d);
            bullet.setScale(0.25, 0.1);
        }
    }
}

