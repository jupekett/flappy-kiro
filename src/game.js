import { BootScene } from './scenes/BootScene.js';
import { StartScene } from './scenes/StartScene.js';
import { PlayScene } from './scenes/PlayScene.js';
import { GameOverScene } from './scenes/GameOverScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: document.body,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [BootScene, StartScene, PlayScene, GameOverScene],
    backgroundColor: '#2d1b4e'
};

const game = new Phaser.Game(config);
