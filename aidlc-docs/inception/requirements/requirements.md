# Flappy Kiro — Requirements Document

## Intent Analysis

- **User Request**: Build a Flappy Bird clone called "Flappy Kiro" featuring a ghost character (Ghosty) navigating through walls with gaps
- **Request Type**: New Project (greenfield)
- **Scope Estimate**: Single Component (one game application)
- **Complexity Estimate**: Moderate (game loop, physics, collision detection, asset management, UI screens)

---

## Functional Requirements

### FR-01: Core Game Mechanics
- Ghosty moves persistently to the right (screen scrolls left)
- Ghosty automatically descends due to gravity
- Player taps spacebar to make Ghosty ascend (flap/jump)
- Game runs at consistent frame rate via Phaser.js game loop

### FR-02: Obstacles (Walls)
- Walls appear as pairs (top and bottom) with a gap between them
- Gaps are equally sized (fixed gap height throughout gameplay)
- Gap vertical position is randomized for each wall pair
- Walls scroll from right to left at a constant speed
- Walls are themed as dungeon/castle walls with a hand-drawn visual style

### FR-03: Collision and Game Over
- Colliding with any wall ends the game
- Colliding with the ground ends the game
- On collision, game-over sound plays and game-over screen is displayed

### FR-04: Scoring
- Each successful pass through a wall pair awards 1 point
- Current score is displayed during gameplay
- High score is persisted across sessions using browser local storage
- High score is displayed on the game-over screen

### FR-05: Start Screen
- Game displays a start screen on initial load
- Start screen shows game title ("Flappy Kiro") and instruction ("Press Space to Start")
- Game begins when player presses spacebar

### FR-06: Game Over Screen
- Displays final score for the current run
- Displays all-time high score (from local storage)
- Allows player to restart (press spacebar or click)

### FR-07: Sound Effects
- Jump sound (jump.wav) plays on spacebar press during gameplay
- Game-over sound (game_over.wav) plays on collision
- Mute/unmute toggle available to the player

### FR-08: Difficulty
- Fixed difficulty throughout gameplay
- Constant wall speed and constant gap size (no progression)

### FR-09: Background
- Parallax scrolling background with 2 layers
- Creates depth illusion as Ghosty moves through the world

---

## Non-Functional Requirements

### NFR-01: Technology Stack
- **Framework**: Phaser.js (JavaScript game framework)
- **Language**: JavaScript
- **Platform**: Web browser (HTML5)
- **Assets**: Use provided ghosty.png, jump.wav, game_over.wav

### NFR-02: Visual Style
- Hand-drawn aesthetic with slightly shaky lines
- Looks as if drawn in Paint with a mouse
- Applies to walls, background elements, and UI text/elements
- Ghosty sprite uses the provided ghosty.png asset

### NFR-03: Performance
- Smooth 60fps gameplay in modern browsers
- No perceptible input lag on spacebar press
- Efficient asset loading (preload phase)

### NFR-04: Compatibility
- Works in modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- Responsive to common desktop viewport sizes

### NFR-05: Persistence
- High score stored in browser localStorage
- Graceful fallback if localStorage is unavailable

---

## Assets Inventory

| Asset | File | Usage |
|-------|------|-------|
| Ghost sprite | assets/ghosty.png | Player character |
| Jump sound | assets/jump.wav | Played on spacebar press |
| Game over sound | assets/game_over.wav | Played on collision |

---

## Out of Scope
- Mobile/touch controls (desktop spacebar only)
- Online leaderboards
- Multiple characters or skins
- Level progression or stages
- Multiplayer functionality
