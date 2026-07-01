import Phaser from 'phaser';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../config';

/**
 * Gameplay scene: physics, collisions, and game objects.
 *
 * Placeholder for the scaffold change — paddle, ball, and bricks are added by
 * later changes. It also launches the UI scene so the HUD renders on top.
 */
export class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create(): void {
    // Run the UI scene in parallel (overlay), not as a replacement.
    this.scene.launch('UIScene');

    // Temporary placeholder so the scene renders something verifiable.
    this.add
      .text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 'spec-breaker', {
        fontFamily: 'monospace',
        fontSize: '32px',
        color: '#ffffff',
      })
      .setOrigin(0.5);
  }
}
