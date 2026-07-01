# GitHub Issues (demo)

Create these issues in the repo (`gh issue create --title "..." --body "..."`) and use them as
the entry point for each change with `/enrich-us <n>`. They are written deliberately as
high-level user stories: the fine detail (speeds, angles, points per row) lives in
[docs/game-design.md](docs/game-design.md), and the "wow" moment of the demo is watching the
agent cross both sources when generating the spec.

---

## #1 — Project scaffold

As a developer I want a base project with TypeScript, Phaser 3 and Vite working, so I can build
the game on a solid foundation.

- 800x600 canvas rendering
- Scene skeleton (Boot, Game, UI)
- Testing configured with Vitest
- `npm run dev`, `npm test` and `npm run build` all work

## #2 — Paddle and ball

As a player I want to control a paddle and launch a ball that bounces, so I have the core
mechanic of the game.

- Paddle controllable with keyboard and mouse, clamped to the canvas
- Ball that bounces off walls and the paddle
- Bounce angle depends on where the ball hits the paddle
- If the ball exits below, it is lost and resets on the paddle

## #3 — Bricks

As a player I want a grid of bricks that are destroyed when hit, so I have an objective in the
game.

- 8x5 grid with a distinct color per row
- The ball destroys bricks on collision
- Destroying all bricks means the player wins

## #4 — Score and lives

As a player I want to see my score and lives, so I know how I'm doing and when I lose.

- HUD with score and lives
- Each brick row awards different points
- 3 lives; losing the ball subtracts one
- Game over and victory screens with restart

## #5 — Power-ups (exercise for the audience)

As a player I want some bricks to drop power-ups, to add variety to the matches.

- At least 2 power-ups (e.g. wide paddle, multiball)
- They fall from the destroyed brick and are caught with the paddle
- Temporary effect with a visual indicator
