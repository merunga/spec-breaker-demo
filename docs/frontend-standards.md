# Frontend Standards — Phaser / TypeScript

Extends `docs/base-standards.md`. This is a frontend-only project: there are no backend standards, API spec or data model. Game rules live in `docs/game-design.md`.

## Project structure

```
src/
├── main.ts              # Phaser.Game config + scene registration
├── scenes/              # One file per scene
├── objects/             # Game objects (Paddle, Ball, BrickGrid)
├── systems/             # Pure logic, no Phaser deps (scoring, level data)
└── config.ts            # Constants (sizes, speeds, colors)
tests/                   # Vitest, mirrors src/
```

## Rules

- **TypeScript strict mode.** No `any`, no non-null assertions.
- **Constants in `config.ts`**, never magic numbers in scenes.
- **Pure logic in `systems/`**: anything testable without a canvas (score calculation, bounce angle math, grid generation) must not import Phaser. This is what gets unit-tested.
- **Scenes are thin**: wire input/physics/rendering, delegate logic to objects and systems.
- **One scene per file**, named `XxxScene`.
- **Events over coupling**: scenes communicate via the Phaser event emitter (`this.events` / registry), never direct references.
- **Lint and format are enforced.** Prettier (`.prettierrc.json`) owns formatting; ESLint (flat config, `eslint.config.js`) lints `src/` and `tests/` and enforces the no-`any` / no-non-null rules above. Run `npm run lint` and `npm run format:check` before committing — CI fails on violations. See [development_guide.md](./development_guide.md).

## Testing

- Vitest for `systems/` and pure helpers — this is where the 90% coverage target applies
- Scenes/objects: smoke-test construction only; user-facing changes also require a Playwright MCP browser pass (optional only for pure `systems/` logic) — see [openspec-tasks-mandatory-steps.md](./openspec-tasks-mandatory-steps.md)
- TDD: failing test first for any logic in `systems/`

## Git workflow

- Feature branches per OpenSpec change (e.g. `feature/002-paddle-and-ball`)
- Conventional commits, small and focused
- One change archived before starting the next

## Assets

- Prefer generated textures (`Graphics`) over image files while prototyping — keeps the repo asset-free and diffs reviewable
- If images are added: `public/assets/`, kebab-case names
