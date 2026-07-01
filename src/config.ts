/**
 * Shared constants for the game. Never inline these values in scenes or objects.
 * Game rules live in docs/game-design.md.
 */

/** Canvas dimensions (logical size before Scale.FIT scaling). */
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

/** Id of the DOM element the Phaser canvas mounts into (see index.html). */
export const GAME_PARENT_ID = 'game-container';

/** Background color of the play field. */
export const BACKGROUND_COLOR = '#1d1d28';

/**
 * Brick row colors, top to bottom. Point values per row are defined in
 * docs/game-design.md and added by the score-and-lives change.
 */
export const BRICK_ROW_COLORS = [
  0xff5470, // row 1
  0xff9770, // row 2
  0xffd670, // row 3
  0x70d6ff, // row 4
  0xa0ffa0, // row 5
] as const;
