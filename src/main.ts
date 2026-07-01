import Phaser from 'phaser';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  GAME_PARENT_ID,
  BACKGROUND_COLOR,
} from './config';
import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';
import { UIScene } from './scenes/UIScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: BACKGROUND_COLOR,
  scale: {
    parent: GAME_PARENT_ID,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  // BootScene runs first (it loads, then starts GameScene). UIScene is launched
  // by GameScene as an overlay, so it is registered but not auto-started.
  scene: [BootScene, GameScene, UIScene],
};

new Phaser.Game(config);
