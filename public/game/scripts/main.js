// import {CST} from "./CST.js";
import { LoadScene } from "./scenes/LoadScene.js";
import { MenuScene } from "./scenes/MenuScene.js";
import { GameScene } from "./scenes/GameScene.js";
import "./../../../vendors/phaserio/plugins/spine/SpinePlugin.min.js";

var config = {
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1200,
        height: 600
    },
    backgroundColor: '#000',
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            gravity: { y: 1000 }
        },
        matter: {
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    plugins: {
		scene: [
            { key: 'SpinePlugin', plugin: SpinePlugin, sceneKey: 'spine', mapping: 'spine' }
		]
	},
    input: {
        activePointers: 4
    },
    scene: [LoadScene, MenuScene, GameScene]
};

var game = new Phaser.Game(config);