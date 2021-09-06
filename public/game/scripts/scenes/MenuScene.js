// import {CST} from "./../CST.js";
import { Button } from "./../objects/Button.js";

export class MenuScene extends Phaser.Scene
{
    constructor() {
        super({
            key: 'menu',
        });
    }

    init () 
    {
        this.center = {
            x: this.scale.width/2,
            y: this.scale.height/2
        }
        this.texts = {
            title: 'TEST 001',
            descriptions: [
                'Spline Animation',
                'Object Groups',
                'Collisions',
                'Bullets',
            ]
        }
    }

    preload () {}

    create () 
    {
        this.background = this.add.sprite(this.center.x, this.center.y, 'menu_bg');
        this.background.setScale(0.65, 0.65);

        this.make.text({
            x: this.center.x,
            y: this.center.y-100,
            text: this.texts.title,
            style: {
                font: '8em monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5);

        this.texts.descriptions.forEach((text, index) => {
            this.make.text({
                x: this.center.x,
                y: this.center.y+(index*25)-50,
                text: text,
                style: {
                    font: '3em monospace',
                    fill: '#ffffff'
                }
            }).setOrigin(0.5);
        });


        let btn_start = new Button(this, 'Start', this.center.x, this.center.y+100);
        btn_start.makeRectangle();

        btn_start.onClick('pointerup', () => {
            this.scene.start('game', this.user);
        });
    }

}