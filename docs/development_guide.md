# Development Guide

Setup, run, and test instructions for **spec-breaker** — a Breakout-style web game built with
TypeScript + Phaser 3 + Vite, driven by spec-driven development (see [README](../README.md)).

This is a frontend-only project: no backend, database, or API. Game rules live in
[game-design.md](./game-design.md); conventions in [frontend-standards.md](./frontend-standards.md).

## Prerequisites

- **Node.js** (v20.19.0 or higher)
- **npm** (v9 or higher)
- **Git**
- An AI coding agent (OpenCode, Claude Code, Copilot or Gemini) — optional, for the SDD workflow
- **OpenSpec** for the spec workflow: `npm install -g @fission-ai/openspec@latest`

## 1. Clone and install

```bash
git clone <repo-url>
cd spec-breaker
npm install
```

> Note: the `src/` and build tooling were produced by the `project-scaffold` change
> (Issue #1). `npm install` resolves Phaser plus the Vite/Vitest/TypeScript toolchain;
> `npm run dev`, `npm test`, and `npm run build` all work on a fresh clone.

## 2. Run the game

```bash
# Start the Vite dev server (hot reload)
npm run dev
```

The game is served at `http://localhost:5173` (Vite default) and renders an 800x600 canvas
scaled to fit (Phaser `Scale.FIT`).

## 3. Build

```bash
# Type-check and produce a production build in dist/
npm run build

# Preview the production build locally
npm run preview
```

The build MUST succeed with no TypeScript errors (strict mode, no `any`).

## 4. Testing

Unit tests use **Vitest** and target the pure logic in `src/systems/` (scoring, bounce-angle
math, grid generation) — anything testable without a canvas. See the testing section in
[frontend-standards.md](./frontend-standards.md) for the coverage target and what to test.

```bash
# Run all unit tests once
npm test

# Watch mode
npm run test -- --watch

# With coverage
npm run test -- --coverage
```

End-to-end browser testing is driven via the Playwright MCP server (configured in `.mcp.json`),
not a checked-in suite. It is **mandatory for user-facing changes** and optional only for changes
confined to pure `src/systems/` logic — see
[openspec-tasks-mandatory-steps.md](./openspec-tasks-mandatory-steps.md).

## 5. Code quality (lint and format)

**Prettier** is the formatting authority (`.prettierrc.json`); **ESLint** (flat config in
`eslint.config.js`, TypeScript-ESLint type-checked rules) lints `src/` and `tests/` and enforces
no `any` / no non-null assertions.

```bash
# Check formatting (CI uses this)
npm run format:check

# Apply formatting
npm run format

# Lint
npm run lint

# Lint and auto-fix
npm run lint:fix
```

CI runs `format:check` and `lint` on every push and PR and fails on any violation.

## 6. Deployment (Surge)

The app deploys to [Surge](https://surge.sh). Surge serves each site at its subdomain **root**,
so the Vite `base` is `/` (root-served) — `npm run dev` is served the same way.

**Production** — `https://spec-breaker.surge.sh/`. The `.github/workflows/deploy.yml`
workflow builds the Vite app and publishes `dist/` to the production site. It runs
**automatically on push to `main`** and can be triggered **manually** from the Actions tab
(`workflow_dispatch`). It authenticates with the `SURGE_LOGIN` and `SURGE_TOKEN` repo secrets
(generate a token with `surge token`). Locally: `npm run deploy`.

**Per-PR preview** — **every PR gets its own preview URL**, deployed manually and linked in the
PR description under a **🚀 Live demo** section. The subdomain follows
`spec-breaker-<NNN>-<slug>.surge.sh` (zero-padded change number + short slug, e.g.
`spec-breaker-009-extend-power-ups.surge.sh`). Deploy it with:

```bash
npm run deploy:preview -- spec-breaker-<NNN>-<slug>.surge.sh
```

> One-time setup: install the Surge CLI (`npm i -g surge`) and log in (`surge login`). CI deploys
> need the `SURGE_LOGIN` / `SURGE_TOKEN` secrets set in the repo settings.

## 7. Project layout

```
src/
├── main.ts      # Phaser.Game config + scene registration
├── scenes/      # One file per scene (BootScene, GameScene, UIScene)
├── objects/     # Game objects (Paddle, Ball, BrickGrid)
├── systems/     # Pure logic, no Phaser deps — unit-tested here
└── config.ts    # Constants (sizes, speeds, colors)
tests/           # Vitest, mirrors src/
```

## 6. Spec-driven workflow

Each feature starts from a GitHub Issue and flows through OpenSpec one change at a time:

```bash
/enrich-us <issue>     # refine the GitHub issue into an implementation-ready story
/ff <change>           # create spec artifacts (proposal, spec, tasks)
/apply <change>        # implement tasks (TDD)
/verify <change>       # validate against the spec
/adversarial-review    # red-team review (optional)
/archive <change>      # done
/commit
```

See [README](../README.md) for the full demo arc and [base-standards.md](./base-standards.md)
for the core development rules.
