import {CST} from "./../CST.js";

export class Button extends Phaser.GameObjects.Container{

    constructor(scene, text = '', x = scene.scale.width/2, y = scene.scale.height/2, texture='button')
    {
        super(scene, x, y);
        scene.add.existing(this);

        this.scene = scene;
        this.text = text;
        this.texture = texture;

        // this.setSize(175,50).setInteractive(new Phaser.Geom.Rectangle(0, 0, 175, 50), Phaser.Geom.Rectangle.Contains);
    }

    onClick(action,fn)
    {
        this.getByName('sprite').on(action, fn);
    }

    makeRound (scene=this.scene, t=this.text, texture=this.texture)
    {
        let sprite = scene.add.sprite(0, 0, texture)
        .setName('sprite').setFrame(0)
        .setInteractive({useHandCursor:true})
        .on('pointerup', () => sprite.setFrame(0) )
        .on('pointerdown', () => sprite.setFrame(1) );

        sprite.displayHeight = 100;
        sprite.displayWidth = 100;

        let text = scene.make.text({
            text: t,
            style: {
                font: '3em monospace',
                fill: '#fff'
            }
        }).setOrigin(0.5).setName('text');

        this.add(text);
        this.add(sprite);
    }

    makeRectangle (scene=this.scene, t=this.text, texture=this.texture)
    {
        let sprite = scene.add.sprite(0, 0, texture)
            .setName('sprite').setFrame(1)
            .setInteractive({useHandCursor:true})
            .on('pointerover', () => sprite.setFrame(0) )
            .on('pointerout', () => sprite.setFrame(1) )
            .on('pointerup', () => sprite.setFrame(0) )
            .on('pointerdown', () => sprite.setFrame(2) );
        
        sprite.displayHeight = 50;
        sprite.displayWidth = 175;
        this.add(sprite);

        let text = scene.make.text({
            text: t,
            style: {
                font: '3em monospace',
                fill: '#000'
            }
        }).setOrigin(0.5).setName('text');
        this.add(text);
    }

}



