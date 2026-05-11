# Flappy Kiro - Code Generation Plan

## Unit Context
- **Unit**: flappy-kiro (single unit)
- **Type**: Greenfield browser game
- **Framework**: Phaser.js 3
- **Target**: Single HTML page with JS modules

## Project Structure
```
/Users/ncjuho/repos-misc/aws-aidlc-workshop/
├── assets/                    # Existing game assets
│   ├── ghosty.png
│   ├── jump.wav
│   └── game_over.wav
├── src/
│   ├── index.html             # Entry point
│   ├── game.js                # Phaser game config and initialization
│   ├── scenes/
│   │   ├── BootScene.js       # Asset preloading
│   │   ├── StartScene.js      # Start screen
│   │   ├── PlayScene.js       # Main gameplay
│   │   └── GameOverScene.js   # Game over screen
│   └── utils/
│       └── ScoreManager.js    # localStorage high score management
├── package.json               # Dependencies (phaser)
└── aidlc-docs/                # Documentation only
```

## Code Generation Steps

### Step 1: Project Setup
- [x] Create package.json with Phaser.js dependency
- [x] Create src/index.html entry point loading Phaser from CDN and game modules

### Step 2: Game Configuration
- [x] Create src/game.js with Phaser game config (800x600, arcade physics, scene registration)

### Step 3: Boot Scene (Asset Loading)
- [x] Create src/scenes/BootScene.js — preloads ghosty.png, jump.wav, game_over.wav
- [x] Generates hand-drawn style wall textures and background layers programmatically

### Step 4: Start Scene
- [x] Create src/scenes/StartScene.js — title screen with "Flappy Kiro" and "Press Space to Start"
- [x] Hand-drawn style text and UI elements

### Step 5: Play Scene (Core Gameplay)
- [x] Create src/scenes/PlayScene.js with:
  - Ghosty sprite with gravity and flap mechanic (spacebar)
  - Wall generation with random gap positions
  - Collision detection (walls + ground)
  - Score tracking and display
  - Parallax background (2 layers)
  - Sound effects (jump, game over)
  - Mute/unmute toggle
  - data-testid attributes on interactive elements

### Step 6: Game Over Scene
- [x] Create src/scenes/GameOverScene.js — shows final score, high score, restart option

### Step 7: Score Manager Utility
- [x] Create src/utils/ScoreManager.js — localStorage read/write for high score

### Step 8: Documentation Summary
- [x] Create aidlc-docs/construction/flappy-kiro/code/code-summary.md

## Story Traceability
- FR-01 (Core Mechanics) → Step 5
- FR-02 (Obstacles) → Step 3, Step 5
- FR-03 (Collision/Game Over) → Step 5, Step 6
- FR-04 (Scoring) → Step 5, Step 6, Step 7
- FR-05 (Start Screen) → Step 4
- FR-06 (Game Over Screen) → Step 6
- FR-07 (Sound Effects) → Step 3, Step 5
- FR-08 (Difficulty) → Step 5
- FR-09 (Background) → Step 3, Step 5
