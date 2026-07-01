import Phaser from 'phaser';

/**
 * Loads assets, then hands off to the gameplay scene.
 *
 * While prototyping the game is asset-free (textures are generated with
 * Graphics), so preload has nothing to load yet — it exists to establish the
 * loading flow for later changes.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload(): void {
    // No assets to load yet — see docs/frontend-standards.md (generated textures).
  }

  create(): void {
    this.scene.start('GameScene');
  }
}
