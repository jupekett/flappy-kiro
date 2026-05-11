import { ScoreManager } from '../utils/ScoreManager.js';

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PlayScene' });
    }

    init() {
        this.score = 0;
        this.gameOver = false;
        this.wallSpeed = 200;
        this.gapSize = 160;
        this.wallInterval = 1800;
        this.isMuted = false;
    }

    create() {
        // Parallax backgrounds
        this.bgFar = this.add.tileSprite(400, 300, 800, 600, 'bg_far');
        this.bgNear = this.add.tileSprite(400, 300, 800, 600, 'bg_near');

        // Ground
        this.ground = this.physics.add.image(400, 580, 'ground');
        this.ground.setDisplaySize(800, 40);
        this.ground.body.setImmovable(true);
        this.ground.body.setAllowGravity(false);
        this.ground.setDepth(5);

        // Ghosty player (sprite is 1290x1567, scale down to ~45px wide)
        this.ghosty = this.physics.add.sprite(150, 250, 'ghosty');
        this.ghosty.setScale(0.035);
        this.ghosty.setCollideWorldBounds(false);
        this.ghosty.body.setGravityY(800);
        this.ghosty.body.setSize(
            this.ghosty.width * 0.7,
            this.ghosty.height * 0.7
        );
        this.ghosty.body.setOffset(
            this.ghosty.width * 0.15,
            this.ghosty.height * 0.15
        );
        this.ghosty.setDepth(10);

        // Give a small initial upward push so player has time to react
        this.ghosty.body.setVelocityY(-200);

        // Wall tracking arrays
        this.wallPairs = [];

        // Collisions with ground
        this.physics.add.collider(this.ghosty, this.ground, this.handleCollision, null, this);

        // Input - spacebar to flap
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Sound
        this.jumpSound = this.sound.add('jump', { volume: 0.5 });
        this.gameOverSound = this.sound.add('game_over', { volume: 0.7 });

        // Score display
        this.scoreText = this.add.text(400, 40, '0', {
            fontSize: '48px',
            fontFamily: 'Comic Sans MS, cursive, sans-serif',
            color: '#ffffff',
            stroke: '#2d1b4e',
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(20);

        // Mute button
        this.muteText = this.add.text(760, 20, '🔊', {
            fontSize: '28px'
        }).setOrigin(0.5).setDepth(20).setInteractive({ useHandCursor: true });

        this.muteText.on('pointerdown', () => {
            this.toggleMute();
        });

        // Mute keyboard shortcut (M key)
        this.input.keyboard.on('keydown-M', () => {
            this.toggleMute();
        });

        // Wall generation timer
        this.wallTimer = this.time.addEvent({
            delay: this.wallInterval,
            callback: this.spawnWallPair,
            callbackScope: this,
            loop: true
        });

        // Spawn first walls after a short delay
        this.time.delayedCall(800, () => {
            this.spawnWallPair();
        });
    }

    update() {
        if (this.gameOver) return;

        // Parallax scrolling
        this.bgFar.tilePositionX += 0.5;
        this.bgNear.tilePositionX += 1.5;

        // Flap on spacebar press
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
            this.flap();
        }

        // Rotate ghosty based on velocity
        const velocityY = this.ghosty.body.velocity.y;
        const targetAngle = Phaser.Math.Clamp(velocityY * 0.1, -30, 60);
        this.ghosty.setAngle(Phaser.Math.Linear(this.ghosty.angle, targetAngle, 0.1));

        // Check if ghosty went off screen (top)
        if (this.ghosty.y < -50) {
            this.handleCollision();
            return;
        }

        // Move walls and check collisions manually
        for (let i = this.wallPairs.length - 1; i >= 0; i--) {
            const pair = this.wallPairs[i];

            // Move walls to the left
            pair.topWall.x -= this.wallSpeed * this.game.loop.delta / 1000;
            pair.bottomWall.x -= this.wallSpeed * this.game.loop.delta / 1000;

            // Sync physics bodies
            pair.topWall.body.updateFromGameObject();
            pair.bottomWall.body.updateFromGameObject();

            // Check scoring
            if (!pair.scored && pair.topWall.x + 35 < this.ghosty.x) {
                pair.scored = true;
                this.score++;
                this.scoreText.setText(this.score.toString());

                // Brief scale pop on score
                this.tweens.add({
                    targets: this.scoreText,
                    scaleX: 1.3,
                    scaleY: 1.3,
                    duration: 100,
                    yoyo: true,
                    ease: 'Back.easeOut'
                });
            }

            // Check collision with walls
            if (this.physics.overlap(this.ghosty, pair.topWall) ||
                this.physics.overlap(this.ghosty, pair.bottomWall)) {
                this.handleCollision();
                return;
            }

            // Remove off-screen walls
            if (pair.topWall.x < -100) {
                pair.topWall.destroy();
                pair.bottomWall.destroy();
                this.wallPairs.splice(i, 1);
            }
        }
    }

    flap() {
        if (this.gameOver) return;

        this.ghosty.body.setVelocityY(-320);

        if (!this.isMuted) {
            this.jumpSound.play();
        }
    }

    spawnWallPair() {
        if (this.gameOver) return;

        const x = 850;
        const minGapY = 100 + this.gapSize / 2;
        const maxGapY = 520 - this.gapSize / 2;
        const gapCenterY = Phaser.Math.Between(minGapY, maxGapY);

        // Top wall
        const topWallHeight = gapCenterY - this.gapSize / 2;
        const topWall = this.add.rectangle(x, topWallHeight / 2, 70, topWallHeight, 0x4a3b2a);
        topWall.setStrokeStyle(2, 0x2a2218);
        topWall.setDepth(5);
        this.physics.add.existing(topWall, true); // static body

        // Bottom wall
        const bottomWallY = gapCenterY + this.gapSize / 2;
        const bottomWallHeight = 560 - bottomWallY;
        const bottomWall = this.add.rectangle(x, bottomWallY + bottomWallHeight / 2, 70, bottomWallHeight, 0x4a3b2a);
        bottomWall.setStrokeStyle(2, 0x2a2218);
        bottomWall.setDepth(5);
        this.physics.add.existing(bottomWall, true); // static body

        this.wallPairs.push({
            topWall,
            bottomWall,
            scored: false
        });
    }

    handleCollision() {
        if (this.gameOver) return;
        this.gameOver = true;

        // Stop wall timer
        this.wallTimer.remove();

        // Stop ghosty
        this.ghosty.body.setVelocityY(0);
        this.ghosty.body.setGravityY(0);

        // Play game over sound
        if (!this.isMuted) {
            this.gameOverSound.play();
        }

        // Flash effect
        this.cameras.main.flash(200, 255, 100, 100);

        // Save score and transition
        ScoreManager.saveHighScore(this.score);

        this.time.delayedCall(800, () => {
            this.scene.start('GameOverScene', { score: this.score });
        });
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        this.sound.mute = this.isMuted;
        this.muteText.setText(this.isMuted ? '🔇' : '🔊');
    }
}
