export class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    create() {
        // Background
        this.add.image(400, 300, 'bg_far');

        // Title text with hand-drawn feel
        const title = this.add.text(400, 180, 'Flappy Kiro', {
            fontSize: '64px',
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            color: '#e8d4f0',
            stroke: '#2d1b4e',
            strokeThickness: 6
        }).setOrigin(0.5);

        // Ghosty character floating animation
        const ghosty = this.add.image(400, 320, 'ghosty').setScale(0.05);
        this.tweens.add({
            targets: ghosty,
            y: 340,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Instruction text
        const instruction = this.add.text(400, 460, 'Press SPACE to Start', {
            fontSize: '28px',
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            color: '#b8a0c8',
            stroke: '#1a0a2e',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Blinking instruction
        this.tweens.add({
            targets: instruction,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Subtitle
        this.add.text(400, 520, 'Navigate Ghosty through the dungeon walls!', {
            fontSize: '16px',
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            color: '#7a6088'
        }).setOrigin(0.5);

        // Listen for spacebar
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('PlayScene');
        });
    }
}
