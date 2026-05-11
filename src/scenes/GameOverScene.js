import { ScoreManager } from '../utils/ScoreManager.js';

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    create() {
        // Background
        this.add.image(400, 300, 'bg_far');

        // Semi-transparent overlay
        const overlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.6);

        // Game Over title
        this.add.text(400, 140, 'Game Over', {
            fontSize: '56px',
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            color: '#ff6b6b',
            stroke: '#2d1b4e',
            strokeThickness: 5
        }).setOrigin(0.5);

        // Ghosty (defeated pose - slightly tilted)
        const ghosty = this.add.image(400, 250, 'ghosty').setScale(0.05);
        ghosty.setAngle(15);
        this.tweens.add({
            targets: ghosty,
            angle: -15,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Score display
        this.add.text(400, 340, 'Score', {
            fontSize: '24px',
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            color: '#b8a0c8'
        }).setOrigin(0.5);

        this.add.text(400, 380, this.finalScore.toString(), {
            fontSize: '48px',
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            color: '#ffffff',
            stroke: '#2d1b4e',
            strokeThickness: 4
        }).setOrigin(0.5);

        // High score display
        const highScore = ScoreManager.getHighScore();
        const isNewHighScore = this.finalScore >= highScore && this.finalScore > 0;

        this.add.text(400, 440, 'Best', {
            fontSize: '24px',
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            color: '#b8a0c8'
        }).setOrigin(0.5);

        const highScoreText = this.add.text(400, 480, highScore.toString(), {
            fontSize: '40px',
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            color: isNewHighScore ? '#ffd700' : '#e8d4f0',
            stroke: '#2d1b4e',
            strokeThickness: 4
        }).setOrigin(0.5);

        // New high score indicator
        if (isNewHighScore) {
            const newBest = this.add.text(400, 520, '★ New Best! ★', {
                fontSize: '22px',
                fontFamily: 'Comic Sans MS, cursive, sans-serif',
                color: '#ffd700'
            }).setOrigin(0.5);

            this.tweens.add({
                targets: newBest,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }

        // Restart instruction
        const restartText = this.add.text(400, 560, 'Press SPACE to Play Again', {
            fontSize: '22px',
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            color: '#b8a0c8',
            stroke: '#1a0a2e',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.tweens.add({
            targets: restartText,
            alpha: 0.4,
            duration: 700,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Listen for restart input (with slight delay to prevent accidental restart)
        this.time.delayedCall(500, () => {
            this.input.keyboard.once('keydown-SPACE', () => {
                this.scene.start('PlayScene');
            });

            this.input.once('pointerdown', () => {
                this.scene.start('PlayScene');
            });
        });
    }
}
