## 0. Setup: Create Feature Branch (MANDATORY — FIRST STEP)

- [x] 0.1 Create feature branch `feature/001-project-scaffold` from `main`
- [x] 0.2 Verify branch creation and current branch status

## 1. Toolchain and dependencies

- [x] 1.1 Create `package.json` with `phaser` dependency and `typescript`, `vite`, `vitest` (+ coverage) dev dependencies, plus an `engines` field for Node ≥ 20.19.0
- [x] 1.2 Add npm scripts: `dev` (vite), `build` (type-check + vite build), `preview` (vite preview), `test` (vitest run)
- [x] 1.3 Create `tsconfig.json` in strict mode (no `any`, no non-null assertions)
- [x] 1.4 Create `vite.config.ts` and `index.html` mounting the Phaser game
- [x] 1.5 Run `npm install` and confirm a clean install

## 2. Source structure and config

- [x] 2.1 Create the `src/` layout: `src/scenes/`, `src/objects/`, `src/systems/`, and `tests/` mirroring `src/`
- [x] 2.2 Create `src/config.ts` with canvas constants (800x600) and shared colors
- [x] 2.3 Create `src/main.ts` with the `Phaser.Game` config: 800x600, `Scale.FIT`, Arcade physics with gravity 0, and scene registration

## 3. Scene skeleton

- [x] 3.1 Create `src/scenes/BootScene.ts` (asset-loading flow placeholder) that starts `GameScene`
- [x] 3.2 Create `src/scenes/GameScene.ts` (gameplay placeholder)
- [x] 3.3 Create `src/scenes/UIScene.ts` (HUD/overlay placeholder)
- [x] 3.4 Register `BootScene`, `GameScene`, `UIScene` in `main.ts`

## 4. Systems sample test (TDD — proves the Vitest harness)

- [x] 4.1 Write a failing Vitest test under `tests/systems/` for a pure helper (e.g. a `clamp` used for paddle bounds later)
- [x] 4.2 Implement the helper in `src/systems/` until the test passes

## 5. Review and Update Existing Unit Tests (MANDATORY)

- [x] 5.1 Confirm the `tests/` layout mirrors `src/` and the sample systems test is in place

## 6. Run Unit Tests (MANDATORY — AGENT MUST EXECUTE)

- [x] 6.1 Run targeted test for the sample systems helper (`npm test -- <path>`)
- [x] 6.2 Run full suite `npm test` and confirm green; capture passed/failed/skipped summary
- [x] 6.3 Confirm the coverage target in frontend-standards.md holds for touched `src/systems/` logic

## 7. Type-check and Build Gate (MANDATORY — AGENT MUST EXECUTE)

- [x] 7.1 Run `npm run build`; confirm zero TypeScript errors and no `any` / non-null assertions introduced
- [x] 7.2 Run `npm run preview` and confirm the production bundle serves

## 8. Browser Verification with Playwright MCP (MANDATORY — AGENT MUST EXECUTE)

- [x] 8.1 Start the dev server (`npm run dev`) and `browser_navigate` to the local URL
- [x] 8.2 Take a `browser_snapshot` confirming an 800x600 canvas renders and is scaled to fit
- [x] 8.3 Confirm via console/snapshot that `BootScene` runs first and transitions to `GameScene` with no errors
- [x] 8.4 Capture snapshots evidencing the rendered canvas; close the browser session

## 9. Update Technical Documentation (MANDATORY)

- [x] 9.1 Update `docs/development_guide.md` if setup/run/build/test instructions changed during implementation
- [x] 9.2 Update `docs/frontend-standards.md` if the realized project structure or scene contract differs from the documented layout (verified: realized layout matches the documented structure exactly — no change needed)

<!-- Scope expansion: code-quality (Prettier + ESLint) and deployment (GitHub Pages). -->

## 10. Code quality: Prettier + ESLint

- [x] 10.1 Add devDeps `prettier`, `eslint`, `typescript-eslint`, `eslint-config-prettier` to `package.json`
- [x] 10.2 Add scripts: `lint` (`eslint .`), `lint:fix` (`eslint . --fix`), `format` (`prettier --write .`), `format:check` (`prettier --check .`)
- [x] 10.3 Create `.prettierrc.json` and `.prettierignore` (ignore `node_modules`, `dist`, `coverage`)
- [x] 10.4 Create `eslint.config.js` (flat config): typescript-eslint recommended + `eslint-config-prettier`, enforcing no-`any` / no-non-null on `src/` and `tests/`
- [x] 10.5 Run `npm install`, then `npm run format` once to normalize existing files

## 11. Deployment: GitHub Pages

- [x] 11.1 Set a production-only `base` of `/<repo>/` in `vite.config.ts` (dev unaffected)
- [x] 11.2 Create `.github/workflows/deploy.yml`: build + publish `dist/` to Pages via the official actions, with `pages: write` + `id-token: write`, a `github-pages` environment, and a concurrency group
- [x] 11.3 Configure triggers: `push` to `main` AND `workflow_dispatch`

## 12. CI integration

- [x] 12.1 Add `Format check` (`npm run format:check`) and `Lint` (`npm run lint`) steps to `.github/workflows/ci.yml`

## 13. Run Quality Gates (MANDATORY — AGENT MUST EXECUTE)

- [x] 13.1 Run `npm run format:check` and confirm it passes
- [x] 13.2 Run `npm run lint` and confirm zero errors
- [x] 13.3 Run full suite `npm test` and confirm green
- [x] 13.4 Run `npm run build` (with the new `base`); confirm zero TypeScript errors

## 14. Browser Verification with Playwright MCP (MANDATORY — AGENT MUST EXECUTE)

- [x] 14.1 Start the dev server (`npm run dev`) and `browser_navigate` to the local URL
- [x] 14.2 Confirm the 800x600 canvas still renders (the `base` change must not break local dev)
- [x] 14.3 Capture a snapshot evidencing the rendered canvas; close the browser session
- [ ] 14.4 After merge + Pages enablement: load the project-pages URL and confirm the canvas renders (noted as a post-merge check; cannot run pre-merge)

## 15. Update Technical Documentation (MANDATORY)

- [x] 15.1 Update `docs/development_guide.md`: document `lint`/`lint:fix`/`format`/`format:check` commands and the GitHub Pages deploy flow (triggers + URL)
- [x] 15.2 Update `docs/frontend-standards.md` if the realized lint/format conventions add to the documented rules
