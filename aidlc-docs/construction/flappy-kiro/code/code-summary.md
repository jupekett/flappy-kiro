# Flappy Kiro - Code Summary

## Architecture
Phaser.js 3 game using scene-based architecture with ES modules.

## Files Created

| File | Purpose |
|------|---------|
| `src/index.html` | Entry point, loads Phaser CDN + game module |
| `src/game.js` | Phaser config (800x600, arcade physics, scene list) |
| `src/scenes/BootScene.js` | Asset preloading + procedural texture generation |
| `src/scenes/StartScene.js` | Title screen with floating Ghosty animation |
| `src/scenes/PlayScene.js` | Core gameplay (gravity, flap, walls, scoring, parallax) |
| `src/scenes/GameOverScene.js` | Score display, high score, restart prompt |
| `src/utils/ScoreManager.js` | localStorage high score persistence |
| `package.json` | Project metadata and Phaser dependency |

## Key Design Decisions
- **CDN loading**: Phaser loaded from jsDelivr CDN for zero build tooling
- **ES modules**: All game code uses `import`/`export` for clean separation
- **Procedural textures**: Wall, ground, and background textures generated in BootScene using Phaser Graphics API — achieves hand-drawn aesthetic without additional image assets
- **Scene flow**: Boot → Start → Play → GameOver → (restart) Play
- **Fixed difficulty**: Wall speed (-200px/s) and gap size (160px) remain constant

## Requirements Traceability
- FR-01 (Core Mechanics): PlayScene gravity + flap
- FR-02 (Obstacles): PlayScene wall spawning with random gaps
- FR-03 (Collision): PlayScene arcade physics colliders
- FR-04 (Scoring): PlayScene score zones + ScoreManager
- FR-05 (Start Screen): StartScene
- FR-06 (Game Over): GameOverScene
- FR-07 (Sound): PlayScene jump/game_over audio + mute toggle
- FR-08 (Difficulty): Fixed wallSpeed and gapSize constants
- FR-09 (Background): PlayScene 2-layer parallax tileSprites
