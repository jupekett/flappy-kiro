export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load provided assets
        this.load.image('ghosty', './assets/ghosty.png');
        this.load.audio('jump', './assets/jump.wav');
        this.load.audio('game_over', './assets/game_over.wav');
    }

    create() {
        // Generate hand-drawn style textures programmatically
        this.generateWallTexture();
        this.generateBackgroundLayers();
        this.generateGroundTexture();

        this.scene.start('StartScene');
    }

    generateWallTexture() {
        const width = 70;
        const height = 600;
        const graphics = this.add.graphics();

        // Castle/dungeon wall with hand-drawn shaky lines
        graphics.fillStyle(0x4a3b2a, 1);
        graphics.fillRect(0, 0, width, height);

        // Draw stone brick pattern with shaky lines
        graphics.lineStyle(2, 0x2a2218, 0.8);

        // Horizontal mortar lines (shaky)
        for (let y = 0; y < height; y += 40) {
            graphics.beginPath();
            for (let x = 0; x <= width; x += 4) {
                const wobble = (Math.random() - 0.5) * 3;
                if (x === 0) {
                    graphics.moveTo(x, y + wobble);
                } else {
                    graphics.lineTo(x, y + wobble);
                }
            }
            graphics.strokePath();
        }

        // Vertical mortar lines (alternating offset, shaky)
        for (let y = 0; y < height; y += 40) {
            const offset = (Math.floor(y / 40) % 2) * 35;
            for (let x = offset; x < width; x += 70) {
                graphics.beginPath();
                for (let dy = 0; dy <= 40; dy += 4) {
                    const wobble = (Math.random() - 0.5) * 3;
                    if (dy === 0) {
                        graphics.moveTo(x + wobble, y + dy);
                    } else {
                        graphics.lineTo(x + wobble, y + dy);
                    }
                }
                graphics.strokePath();
            }
        }

        // Add some random darker spots for texture
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 2 + Math.random() * 6;
            graphics.fillStyle(0x2a2218, 0.3);
            graphics.fillCircle(x, y, size);
        }

        // Draw shaky border outline
        graphics.lineStyle(3, 0x1a1208, 1);
        this.drawShakyRect(graphics, 1, 1, width - 2, height - 2);

        graphics.generateTexture('wall', width, height);
        graphics.destroy();
    }

    generateBackgroundLayers() {
        // Layer 1 (far background) - dark purple sky with stars
        const bg1Graphics = this.add.graphics();
        bg1Graphics.fillStyle(0x1a0a2e, 1);
        bg1Graphics.fillRect(0, 0, 800, 600);

        // Shaky stars
        for (let i = 0; i < 40; i++) {
            const x = Math.random() * 800;
            const y = Math.random() * 400;
            const size = 1 + Math.random() * 2;
            bg1Graphics.fillStyle(0xffffff, 0.3 + Math.random() * 0.5);
            bg1Graphics.fillCircle(x, y, size);
        }

        // Distant shaky mountain silhouettes
        bg1Graphics.fillStyle(0x2d1b4e, 1);
        bg1Graphics.beginPath();
        bg1Graphics.moveTo(0, 600);
        for (let x = 0; x <= 800; x += 8) {
            const baseY = 400 + Math.sin(x * 0.008) * 80 + Math.sin(x * 0.02) * 30;
            const wobble = (Math.random() - 0.5) * 4;
            bg1Graphics.lineTo(x, baseY + wobble);
        }
        bg1Graphics.lineTo(800, 600);
        bg1Graphics.closePath();
        bg1Graphics.fillPath();

        bg1Graphics.generateTexture('bg_far', 800, 600);
        bg1Graphics.destroy();

        // Layer 2 (near background) - castle towers and structures
        const bg2Graphics = this.add.graphics();
        bg2Graphics.fillStyle(0x000000, 0);
        bg2Graphics.fillRect(0, 0, 800, 600);

        // Draw distant castle/dungeon structures with shaky lines
        bg2Graphics.fillStyle(0x1a1030, 0.9);

        // Tower shapes
        const towers = [
            { x: 50, w: 40, h: 200 },
            { x: 180, w: 60, h: 280 },
            { x: 350, w: 35, h: 150 },
            { x: 500, w: 50, h: 240 },
            { x: 650, w: 45, h: 180 },
            { x: 750, w: 55, h: 220 }
        ];

        for (const tower of towers) {
            bg2Graphics.beginPath();
            const baseY = 600;
            const topY = baseY - tower.h;

            // Shaky tower outline
            bg2Graphics.moveTo(tower.x + (Math.random() - 0.5) * 2, baseY);
            for (let y = baseY; y >= topY; y -= 6) {
                bg2Graphics.lineTo(tower.x + (Math.random() - 0.5) * 3, y);
            }
            for (let x = tower.x; x <= tower.x + tower.w; x += 6) {
                bg2Graphics.lineTo(x + (Math.random() - 0.5) * 3, topY + (Math.random() - 0.5) * 2);
            }
            for (let y = topY; y <= baseY; y += 6) {
                bg2Graphics.lineTo(tower.x + tower.w + (Math.random() - 0.5) * 3, y);
            }
            bg2Graphics.closePath();
            bg2Graphics.fillPath();

            // Shaky window rectangles
            bg2Graphics.fillStyle(0x3d2a6e, 0.6);
            const windowY = topY + 30;
            for (let wy = windowY; wy < baseY - 40; wy += 50) {
                const wx = tower.x + tower.w / 2 - 5;
                bg2Graphics.fillRect(wx + (Math.random() - 0.5) * 2, wy, 10, 15);
            }
            bg2Graphics.fillStyle(0x1a1030, 0.9);
        }

        bg2Graphics.generateTexture('bg_near', 800, 600);
        bg2Graphics.destroy();
    }

    generateGroundTexture() {
        const graphics = this.add.graphics();
        const width = 800;
        const height = 40;

        // Dark stone ground
        graphics.fillStyle(0x2a1f1a, 1);
        graphics.fillRect(0, 0, width, height);

        // Shaky top edge
        graphics.lineStyle(3, 0x4a3b2a, 1);
        graphics.beginPath();
        for (let x = 0; x <= width; x += 4) {
            const wobble = (Math.random() - 0.5) * 3;
            if (x === 0) {
                graphics.moveTo(x, 2 + wobble);
            } else {
                graphics.lineTo(x, 2 + wobble);
            }
        }
        graphics.strokePath();

        // Random cracks
        graphics.lineStyle(1, 0x1a1208, 0.5);
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * width;
            const y = 5 + Math.random() * (height - 10);
            graphics.beginPath();
            graphics.moveTo(x, y);
            graphics.lineTo(x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 10);
            graphics.strokePath();
        }

        graphics.generateTexture('ground', width, height);
        graphics.destroy();
    }

    drawShakyRect(graphics, x, y, w, h) {
        graphics.beginPath();
        // Top edge
        for (let px = x; px <= x + w; px += 4) {
            const wobble = (Math.random() - 0.5) * 2;
            if (px === x) graphics.moveTo(px, y + wobble);
            else graphics.lineTo(px, y + wobble);
        }
        // Right edge
        for (let py = y; py <= y + h; py += 4) {
            const wobble = (Math.random() - 0.5) * 2;
            graphics.lineTo(x + w + wobble, py);
        }
        // Bottom edge
        for (let px = x + w; px >= x; px -= 4) {
            const wobble = (Math.random() - 0.5) * 2;
            graphics.lineTo(px, y + h + wobble);
        }
        // Left edge
        for (let py = y + h; py >= y; py -= 4) {
            const wobble = (Math.random() - 0.5) * 2;
            graphics.lineTo(x + wobble, py);
        }
        graphics.strokePath();
    }
}
