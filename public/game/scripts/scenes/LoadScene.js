import {CST} from "./../CST.js";

export class LoadScene extends Phaser.Scene 
{
    constructor () 
    {
        super({
            key: 'load'
        });
    }

    init () 
    {
        this.d = {
            centerX: this.scale.width/2,
            centerY: this.scale.height/2,
        }
    }

    preload () 
    {
        this.load.image('menu_bg', CST.ASSETS.MENU_BG);
        this.load.image('game_bg', CST.ASSETS.GAME_BG);
        this.load.spritesheet('button', CST.ASSETS.BUTTON, {frameWidth:80, frameHeight:20});
        this.load.spritesheet('btn_round', CST.ASSETS.BTN_ROUND, {frameWidth:64, frameHeight:64});
        this.load.spine('character', CST.SPINE.CHARACTER.JSON, [CST.SPINE.CHARACTER.ATLAS], true);
        this.load.spine('alien', CST.SPINE.ALIEN.JSON, [CST.SPINE.ALIEN.ATLAS], true);
        
        this.load.image('branch', CST.ASSETS.BRANCH);
        this.load.image('ground', CST.ASSETS.GROUND);
        this.load.image('bullet', CST.ASSETS.BULLET);

        let progressBar = new ProgressBar(this);

        this.load.on('progress', (value) => {
            progressBar.animate(value);
        });
                    
        this.load.on('fileprogress', function (file) {
            //
        });
         
        this.load.on('complete', function () {
            progressBar.complete();
        });
    }

    create () 
    {
        this.scene.start('menu');
    }
}



class ProgressBar
{
    constructor (scene) 
    {
        this.scene = scene;
        this.box = this.scene.add.graphics();
        this.bar = this.scene.add.graphics();
        this.drawBox();
        this.drawBar();
        this.loadingText = this.drawText(this.scene.d.centerX, this.scene.d.centerY - 50, 'Loading...');
        this.percentText = this.drawText(this.scene.d.centerX, this.scene.d.centerY, '0%', 18);
    }

    drawBox () 
    {
        let boxH = 50, boxW = 320;
        let box = this.scene.add.graphics();
        this.box.fillStyle(0x222222, 0.8);
        this.box.fillRect(this.scene.d.centerX-(boxW/2), this.scene.d.centerY-(boxH/2), boxW, boxH);
    }

    drawBar (value = 0) 
    {
        let boxH = 50, boxW = 320;
        this.bar.clear();
        this.bar.fillStyle(0xffffff, 0.25);
        this.bar.fillRect(this.scene.d.centerX-(boxW/2)+10, this.scene.d.centerY-(boxH/2)+10, 300 * value, 30);
    }

    drawText (x,y, text, fontsize = 20) 
    {
        return this.scene.make.text({
            x: x,
            y: y,
            text: text,
            style: {
                font: fontsize+'px monospace',
                fill: '#ffffff'
            }
        }).setOrigin(0.5, 0.5);
    }

    animate (value) 
    {
        this.drawBar(value);
        this.percentText.setText(parseInt(value*100)+'%');
    }
        
    complete () 
    {
        this.bar.destroy();
        this.box.destroy();
        this.loadingText.destroy();
        this.percentText.destroy();
    }
}