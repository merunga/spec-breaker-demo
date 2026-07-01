import Phaser from 'phaser';

/**
 * HUD and overlays (score, lives, game over / win screens).
 *
 * Placeholder for the scaffold change — the HUD is populated by the
 * score-and-lives change. Runs on top of GameScene via scene.launch().
 */
export class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  create(): void {
    // HUD elements are added by a later change.
  }
}
