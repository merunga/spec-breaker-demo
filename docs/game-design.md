# Game Design — Breakout

Single source of truth for game rules and entities. Specs and implementations must stay consistent with this document.

## Core loop

Player moves a paddle to bounce a ball that destroys bricks. Clear all bricks -> win. Lose the ball below the paddle -> lose a life. 0 lives -> game over.

## Entities

### Paddle
- Horizontal movement only, clamped to canvas bounds
- Input: arrow keys and mouse/pointer
- Speed: 400 px/s (keyboard)

### Ball
- Constant speed: 300 px/s, increases 5% per brick row cleared (cap 450)
- Bounces off walls, paddle and bricks
- Bounce angle off paddle depends on hit position (center = vertical, edges = +/-60deg)
- Lost when it exits the bottom edge

### Brick
- Grid: 8 columns x 5 rows
- 1 hit point (variants with 2+ HP are a later change)
- Each row has a distinct color and point value

## Scoring

| Row (top->bottom) | Points |
|---|---|
| 1 | 50 |
| 2 | 40 |
| 3 | 30 |
| 4 | 20 |
| 5 | 10 |

## Lives

- Start with 3
- Ball lost: -1 life, ball resets on paddle, launch on input
- 0 lives: Game Over screen, restart with Space/click

## Scenes

| Scene | Responsibility |
|---|---|
| \`BootScene\` | Asset loading |
| \`GameScene\` | Gameplay, physics, collisions |
| \`UIScene\` | HUD (score, lives), overlays (game over, win) |

## Canvas

- 800x600, scaled to fit (Phaser \`Scale.FIT\`)
- Arcade physics, no gravity
