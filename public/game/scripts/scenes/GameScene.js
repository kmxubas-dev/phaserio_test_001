// import { CST } from "./../CST.js";
import { Button } from "./../objects/Button.js";
import { Character } from "./../objects/Character.js";
import { Alien } from "./../objects/Alien.js";

export class GameScene extends Phaser.Scene 
{
    constructor () 
    {
        super({
            key: 'game'
        });
    }

    init () 
    {
        this.game = true;
        this.score = 0;
        this.d = {
            h: this.scale.height,
            w: this.scale.width,
            centerX: this.scale.width/2,
            centerY: this.scale.height/2
        }
    }

    preload () 
    {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.background = this.add.sprite(this.d.centerX, this.d.centerY, 'game_bg');
        this.background.setScale(1.875);
    }

    create () 
    {
        this.overlap_text = this.make.text({
            x: this.d.centerX,
            y: this.d.centerY-50,
            text: 'Overlap Text',
            style: {
                font: '10em monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5).setVisible(false);
        this.overlap_text.depth = 1000;

        this.btn_menu = new Button(this, 'Return to Menu', this.d.centerX, this.d.centerY+75).setVisible(false);
        this.btn_menu.makeRectangle();
        this.btn_menu.getByName('sprite').displayWidth = 250;
        this.btn_menu.depth = 1000;
        this.btn_menu.onClick('pointerup', () => {
            setTimeout(() => {
                this.scene.start('menu');
            }, 1000);
        });

        this.character = new Character(this, this.d.centerX, this.d.h-40);

        this.aliens = [];
        this.aliens.push(new Alien(this, 100, this.d.h-40));
        this.aliens.push(new Alien(this, 100, this.d.h-190));
        this.aliens.push(new Alien(this, 250, 200));
        this.aliens.push(new Alien(this, this.d.w-50, this.d.h-190));
        this.aliens.push(new Alien(this, this.d.w-80, 105));
        this.aliens[3].flipX(true);
        this.aliens[4].flipX(true);

        this.ground = this.physics.add.staticGroup();
        this.ground.create(this.d.w-115, this.d.h-10, 'ground').setScale(0.3).refreshBody();
        this.ground.create(this.d.w-(115*3), this.d.h-10, 'ground').setScale(0.3).refreshBody();
        this.ground.create(this.d.w-(115*5), this.d.h-10, 'ground').setScale(0.3).refreshBody();
        this.ground.create(this.d.w-(115*7), this.d.h-10, 'ground').setScale(0.3).refreshBody();
        this.ground.create(this.d.w-(115*9), this.d.h-10, 'ground').setScale(0.3).refreshBody();
        this.ground.create(this.d.w-(115*11), this.d.h-10, 'ground').setScale(0.3).refreshBody();
        this.ground.children.iterate(child => {
            child.body.setOffset(0, 20);
        });

        this.platform_branches = this.physics.add.staticGroup();
        this.platform_branches.create(120, 450, 'branch').setScale(0.25).refreshBody();
        this.platform_branches.create(this.d.w-120, 500, 'branch').setScale(0.25).refreshBody();
        this.platform_branches.create(this.d.centerX-25, 390, 'branch').setScale(0.25).refreshBody();
        this.platform_branches.create(250, 250, 'branch').setScale(0.25).refreshBody();
        this.platform_branches.create(this.d.w-50, 225, 'branch').setScale(0.25).refreshBody();



        this.physics.add.collider(this.aliens, this.ground);
        this.physics.add.collider(this.aliens, this.platform_branches);
        this.physics.add.collider(this.character, this.ground);
        this.physics.add.collider(this.character, this.platform_branches);

        this.aliens.forEach((alien) => {
            this.physics.add.overlap(alien, this.character, () => {
                this.character.alive = false;
                setTimeout(()=>{
                    this.overlap_text.text = 'Game Over';
                    this.overlap_text.setVisible(true);
                    this.btn_menu.setVisible(true);
                    this.character.destroy();
                    this.game = false;
                }, 2000);
            });

            this.character.bullets.body.children.entries.forEach(item => {
                this.physics.add.overlap(item, alien, () => {
                    this.score += (alien.getCurrentAnimation().name === 'death') ? 0:1;
                    item.body.reset(-100, 0);
                    alien.die();

                    setTimeout(()=>{
                        if (this.score === 5) 
                        {
                            this.game = false;
                            this.overlap_text.text = 'Game Finish!';
                            this.overlap_text.setVisible(true);
                            this.btn_menu.setVisible(true);
                        }
                    }, 2000);
                });
            });
        });



        // MOBILE BUTTONS
        // ==================================================
        this.btn_up = new Button(this, '↑', 1100, 425, 'btn_round');
        this.btn_up.makeRound();
        this.btn_up.onClick('pointerdown',()=>{
            this.cursors.up.isDown = true;
        });
        this.btn_up.onClick('pointerup',()=>{
            this.cursors.up.isDown = false;
        });
        this.btn_down = new Button(this, '↓', 1100, 525, 'btn_round');
        this.btn_down.makeRound();
        this.btn_down.onClick('pointerdown',()=>{
            this.cursors.down.isDown = true;
            this.character.fire();
        });
        this.btn_down.onClick('pointerup',()=>{
            this.cursors.down.isDown = false;
        });
        this.btn_left = new Button(this, '←', 100, 490, 'btn_round');
        this.btn_left.makeRound();
        this.btn_left.onClick('pointerdown',()=>{
            this.cursors.left.isDown = true;
        });
        this.btn_left.onClick('pointerup',()=>{
            this.cursors.left.isDown = false;
        });
        this.btn_right = new Button(this, '→', 200, 490, 'btn_round');
        this.btn_right.makeRound();
        this.btn_right.onClick('pointerdown',()=>{
            this.cursors.right.isDown = true;
        });
        this.btn_right.onClick('pointerup',()=>{
            this.cursors.right.isDown = false;
        });
        this.btn_fullscreen = new Button(this, 'Full', 600, 50, 'btn_round');
        this.btn_fullscreen.makeRound();
        this.btn_fullscreen.getByName('sprite').displayWidth = 75;
        this.btn_fullscreen.getByName('sprite').displayHeight = 75;
        this.btn_fullscreen.onClick('pointerdown', () => {
            if (this.scale.isFullscreen)
            {
                this.scale.stopFullscreen();
                this.btn_fullscreen.getByName('text').setText('Full');
            }
            else
            {
                this.scale.startFullscreen();
                this.btn_fullscreen.getByName('text').setText('Exit');
            }
        });
    }

    update() {
        if (this.game) 
        {
            this.character.update(this.cursors);
        }
    }
}
