# Requirements Clarification Questions

Please answer the following questions to help clarify the requirements for Flappy Kiro.

## Question 1
What technology should be used to build the game?

A) HTML5 Canvas + vanilla JavaScript (single HTML file, no build tools)
B) HTML5 Canvas + TypeScript (with build tooling)
C) Phaser.js game framework (JavaScript)
D) Python with Pygame
E) Other (please describe after [Answer]: tag below)

[Answer]: C

## Question 2
What visual style should the game have?

A) Retro pixel-art style (8-bit aesthetic)
B) Clean modern flat design (solid colors, smooth shapes)
C) Match the provided ghosty.png sprite style as closely as possible
D) Other (please describe after [Answer]: tag below)

[Answer]: D: hand-drawn style with slightly shaky lines as if it was drawn with in Paint with a mouse.

## Question 3
Should the game include a start screen and game-over screen?

A) Yes, both a start screen ("Press Space to Start") and a game-over screen showing final score
B) Start screen only, restart immediately on game over
C) No screens — game starts immediately and restarts on any key press after game over
D) Other (please describe after [Answer]: tag below)

[Answer]: Yes, both.

## Question 4
Should the game track and display a high score (persisted across sessions using local storage)?

A) Yes, show current score during gameplay and high score on game-over screen
B) Show current score only, no high score persistence
C) No score display during gameplay, only show on game over
D) Other (please describe after [Answer]: tag below)

[Answer]: Yes.

## Question 5
How should the walls (pipes/obstacles) behave visually?

A) Simple solid-colored rectangles (top and bottom)
B) Styled pipes similar to classic Flappy Bird (with pipe caps)
C) Themed as dungeon/castle walls to match the ghost theme
D) Other (please describe after [Answer]: tag below)

[Answer]: C, following the style described in my answer to Q2.

## Question 6
Should the game include sound effects using the provided audio assets (jump.wav, game_over.wav)?

A) Yes, play jump sound on spacebar press and game-over sound on collision
B) Yes, with an option to mute/unmute
C) No sound effects
D) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 7
What should happen to the game difficulty over time?

A) Fixed difficulty — constant wall speed and gap size throughout
B) Progressive difficulty — walls speed up gradually over time
C) Progressive difficulty — gap size decreases over time
D) Both speed increase and gap decrease over time
E) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 8
Should the background scroll to give the illusion of movement, or remain static?

A) Scrolling background (parallax or simple scroll)
B) Static background with a solid color or gradient
C) Static background with a simple pattern or scenery
D) Other (please describe after [Answer]: tag below)

[Answer]: D: Parallax scrolling with 2 layers.
