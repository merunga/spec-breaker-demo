/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  // The app deploys to Surge (production + per-PR previews), which serves each
  // site at its subdomain root, so the build is always root-served. See
  // docs/development_guide.md ("Deployment (Surge)").
  base: '/',
  // Phaser is large; keep dependency pre-bundling explicit for faster dev startup.
  optimizeDeps: {
    include: ['phaser'],
  },
  test: {
    globals: true,
    // Pure logic in src/systems/ needs no DOM; default node environment is fine.
    environment: 'node',
    include: ['tests/**/*.{test,spec}.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/systems/**/*.ts'],
    },
  },
});
