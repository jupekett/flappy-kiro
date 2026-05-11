# Build and Test Summary

## Build Instructions

This is a zero-build project. Phaser.js is loaded from CDN and all game code uses native ES modules supported by modern browsers.

### Running Locally

**Option 1: Using npx serve (recommended)**
```bash
npx serve .
```
Then open `http://localhost:3000/src/index.html` in your browser.

**Option 2: Using Python**
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000/src/index.html` in your browser.

**Option 3: Using VS Code Live Server extension**
- Right-click `src/index.html` → "Open with Live Server"

**Important**: The game must be served via HTTP (not opened as a file://) because ES modules require CORS headers.

## Manual Test Checklist

### Start Screen
- [ ] Game loads and shows "Flappy Kiro" title
- [ ] Ghosty sprite floats up and down
- [ ] "Press SPACE to Start" text blinks
- [ ] Pressing spacebar starts the game

### Gameplay
- [ ] Ghosty falls due to gravity
- [ ] Pressing spacebar makes Ghosty flap upward
- [ ] Jump sound plays on spacebar press
- [ ] Walls scroll from right to left
- [ ] Walls have dungeon/castle hand-drawn appearance
- [ ] Gap positions vary randomly between wall pairs
- [ ] Score increments when passing through a wall gap
- [ ] Score displays at top center
- [ ] Background scrolls with parallax effect (2 layers at different speeds)
- [ ] Ghosty rotates based on velocity (nose up when flapping, nose down when falling)
- [ ] Mute button (🔊) visible in top-right corner
- [ ] Clicking mute button or pressing M toggles sound

### Collision and Game Over
- [ ] Hitting a wall triggers game over
- [ ] Hitting the ground triggers game over
- [ ] Going off the top of the screen triggers game over
- [ ] Game-over sound plays on collision
- [ ] Screen flashes red briefly on collision

### Game Over Screen
- [ ] Shows "Game Over" title
- [ ] Shows final score
- [ ] Shows high score (best)
- [ ] Shows "★ New Best! ★" if high score was beaten
- [ ] Ghosty sways back and forth
- [ ] "Press SPACE to Play Again" text blinks
- [ ] Pressing spacebar restarts the game
- [ ] Clicking restarts the game

### High Score Persistence
- [ ] High score persists after page refresh
- [ ] High score updates only when beaten

### Browser Compatibility
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
