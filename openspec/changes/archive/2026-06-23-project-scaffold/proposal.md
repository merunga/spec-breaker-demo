## Why

The repository has documentation and the spec-driven workflow in place, but no runnable application yet: there is no `src/`, no build tooling, and no test runner. Every subsequent gameplay change (paddle, ball, bricks, score) depends on a working foundation. This change establishes that foundation so feature work can begin.

The scaffold also needs two foundational concerns to be usable by a team and visible to an audience: consistent code-quality tooling (formatting + linting) so contributions stay uniform and type-safe, and a deployment path so the playable build can be viewed without a local checkout. These are added to the same foundation so later gameplay changes inherit them.

## What Changes

- Introduce the TypeScript + Phaser 3 + Vite toolchain with `package.json`, `tsconfig.json` (strict mode), and a Vite config.
- Add the `src/` layout defined in the frontend standards (`main.ts`, `scenes/`, `objects/`, `systems/`, `config.ts`).
- Render an 800x600 canvas scaled to fit (`Scale.FIT`) with Arcade physics and no gravity.
- Add the scene skeleton: `BootScene` (asset loading), `GameScene` (gameplay placeholder), `UIScene` (HUD/overlay placeholder), registered in `main.ts`.
- Configure Vitest for unit testing the pure logic in `src/systems/`, with a `tests/` directory mirroring `src/`.
- Provide working `npm run dev`, `npm test`, and `npm run build` (and `npm run preview`) scripts; the build must pass with no TypeScript errors.
- Add **Prettier + ESLint** as the formatting and linting authority, wired into CI (`format:check`, `lint`) and enforcing the no-`any` / no-non-null rules.
- Add a **GitHub Pages deployment** workflow that builds and publishes the Vite app, triggered automatically on push to `main` and manually via `workflow_dispatch`, with a production-only Vite `base` path for project pages.

## Capabilities

### New Capabilities

- `project-scaffold`: The buildable, testable project foundation — toolchain (TypeScript, Phaser 3, Vite, Vitest), the `src/` directory structure, the 800x600 canvas with the Boot/Game/UI scene skeleton, and the working dev/test/build scripts. _(Already implemented; present in `openspec/specs/project-scaffold/spec.md`.)_
- `code-quality`: Prettier + ESLint configuration, npm scripts (`lint`, `lint:fix`, `format`, `format:check`), and CI enforcement of formatting and linting.
- `deployment`: A GitHub Actions workflow that builds the app and publishes it to GitHub Pages, with both automatic (push to `main`) and manual (`workflow_dispatch`) triggers, and a production `base` path.

### Modified Capabilities

<!-- None — the original project-scaffold requirements are unchanged; this change only adds new capabilities. -->

## Impact

- **New tooling/config**: `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `vitest` configuration, `index.html` (scaffold); `.prettierrc.json`, `.prettierignore`, `eslint.config.js` (code-quality).
- **New source**: `src/main.ts`, `src/config.ts`, `src/scenes/{BootScene,GameScene,UIScene}.ts`, empty `src/objects/` and `src/systems/` (populated by later changes), `tests/` skeleton.
- **New CI/CD**: `.github/workflows/ci.yml` (gains lint + format:check steps); `.github/workflows/deploy.yml` (GitHub Pages).
- **Dependencies added**: `phaser`; dev: `typescript`, `vite`, `vitest` (and coverage tooling), `prettier`, `eslint`, `typescript-eslint`, `eslint-config-prettier`.
- **No backend, API, or data model** — frontend-only project.
- Unblocks Issues #2–#5 (paddle/ball, bricks, score/lives, power-ups), which build on this scaffold.
