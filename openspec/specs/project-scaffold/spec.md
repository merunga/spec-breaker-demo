# project-scaffold

## Purpose

Establish the foundational project scaffold for the game: toolchain, build scripts, source directory structure, canvas and physics configuration, scene skeleton, and a unit-test harness for pure systems logic.

## Requirements

### Requirement: Toolchain and build scripts

The project SHALL be built with TypeScript, Phaser 3, and Vite, and MUST expose working `dev`, `build`, `preview`, and `test` npm scripts. TypeScript MUST run in strict mode with no `any` and no non-null assertions.

#### Scenario: Development server runs
- **WHEN** a developer runs `npm run dev`
- **THEN** Vite starts a dev server with hot reload and serves the game

#### Scenario: Production build succeeds with no type errors
- **WHEN** a developer runs `npm run build`
- **THEN** TypeScript type-checks in strict mode and Vite produces a production bundle in `dist/` with zero TypeScript errors

#### Scenario: Production build can be previewed
- **WHEN** a developer runs `npm run preview` after a successful build
- **THEN** the production bundle from `dist/` is served locally

#### Scenario: Unit tests run
- **WHEN** a developer runs `npm test`
- **THEN** Vitest executes the test suite and reports pass/fail results

### Requirement: Source directory structure

The project SHALL follow the structure defined in the frontend standards: `src/main.ts`, `src/config.ts`, `src/scenes/`, `src/objects/`, and `src/systems/`, with a `tests/` directory mirroring `src/`. Shared constants MUST live in `src/config.ts` rather than as magic numbers in scenes.

#### Scenario: Required directories and entry files exist
- **WHEN** the scaffold is applied
- **THEN** `src/main.ts`, `src/config.ts`, `src/scenes/`, `src/objects/`, `src/systems/`, and `tests/` all exist

#### Scenario: Constants centralized
- **WHEN** canvas size, colors, or other shared constants are needed
- **THEN** they are defined in `src/config.ts` and imported, not hard-coded in scenes

### Requirement: Canvas and physics configuration

The game SHALL render an 800x600 canvas scaled to fit using Phaser `Scale.FIT`, with Arcade physics enabled and no gravity.

#### Scenario: Canvas renders at the configured size
- **WHEN** the game loads in a browser
- **THEN** an 800x600 canvas is rendered and scaled to fit its container via `Scale.FIT`

#### Scenario: Arcade physics with no gravity
- **WHEN** the Phaser game is configured
- **THEN** the Arcade physics system is enabled with gravity set to zero

### Requirement: Scene skeleton

The game SHALL register three scenes — `BootScene` (asset loading), `GameScene` (gameplay), and `UIScene` (HUD and overlays) — one scene per file, each named `XxxScene`, and registered in `main.ts`. `BootScene` MUST start `GameScene` after loading.

#### Scenario: Scenes are registered and start in order
- **WHEN** the game starts
- **THEN** `BootScene` runs first, completes loading, and transitions to `GameScene`

#### Scenario: One scene per file
- **WHEN** inspecting `src/scenes/`
- **THEN** `BootScene`, `GameScene`, and `UIScene` each live in their own file, named with the `XxxScene` convention

### Requirement: Vitest configured for pure systems logic

The project SHALL configure Vitest so that pure logic in `src/systems/` can be unit-tested without a canvas, and a sample test MUST run green to prove the harness works.

#### Scenario: A sample systems test passes
- **WHEN** `npm test` runs against the scaffolded test suite
- **THEN** at least one Vitest test exercising pure logic passes, confirming the test harness is wired correctly
