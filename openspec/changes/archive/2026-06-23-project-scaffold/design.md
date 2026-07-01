## Context

`spec-breaker` is a frontend-only Breakout game to be built with TypeScript + Phaser 3 + Vite, driven by spec-driven development. The repo currently has documentation, the SDD workflow, and the Playwright MCP config, but no application code, build tooling, or test runner. This change creates the runnable foundation that Issues #2–#5 build on. Game rules are fixed in `docs/game-design.md` (800x600 canvas, `Scale.FIT`, Arcade physics, no gravity, Boot/Game/UI scenes); conventions in `docs/frontend-standards.md`.

## Goals / Non-Goals

**Goals:**

- A buildable, type-safe project: `npm run dev`, `npm test`, and `npm run build` all work.
- The `src/` structure from the frontend standards, with the Boot/Game/UI scene skeleton.
- An 800x600 `Scale.FIT` canvas with Arcade physics (no gravity).
- Vitest wired for pure `src/systems/` logic, proven by a green sample test.
- Prettier + ESLint as the formatting/linting authority, enforced in CI.
- A GitHub Pages deployment of the built app, triggered automatically on `main` and manually.

**Non-Goals:**

- No gameplay: paddle, ball, bricks, scoring, lives, and power-ups are out of scope (later changes).
- No game assets — prototype with generated textures (`Graphics`); `BootScene` only sets up the loading flow.
- No backend (frontend-only project).
- No custom domain or HTTPS config for Pages — use the default project-pages URL.

## Decisions

- **Vite over Webpack/Parcel.** Vite is the lightest fast-HMR option and is already assumed by `docs/development_guide.md` (dev server on `:5173`). Alternative (Webpack) rejected: heavier config, no benefit for a single-page game.
- **Vitest over Jest.** Vitest shares Vite's config/transform pipeline, so TS + ESM work with no extra setup; native coverage. Jest rejected: separate transform config and ESM friction.
- **Phaser via npm dependency, ESM import.** Import the `phaser` package in `main.ts` rather than a CDN script tag, so the build is self-contained and type-checked.
- **`Scale.FIT` + Arcade physics, gravity 0**, set in the `Phaser.Game` config object in `main.ts`, per `docs/game-design.md`.
- **Scene responsibilities kept thin.** `BootScene` loads (nothing to load yet beyond setup) and starts `GameScene`; `GameScene` and `UIScene` are placeholders this change. Logic stays out of scenes per the standards.
- **Constants in `src/config.ts`.** Canvas width/height/colors live here from day one to avoid magic numbers later.
- **Sample test in `systems/`.** A trivial pure function (e.g. an identity/clamp helper or a `version` constant) with a Vitest test proves the harness without pre-empting later gameplay logic.
- **ESLint flat config + Prettier.** Use the modern flat config (`eslint.config.js`) with `typescript-eslint` recommended rules, and `eslint-config-prettier` to disable rules that overlap formatting. Prettier owns formatting; ESLint owns correctness/style. Rationale: flat config is the current ESLint standard and avoids the deprecated `.eslintrc`; separating concerns keeps the two tools from fighting. Alternative (Biome, a single fast tool) rejected for now to stay on the widely-understood ESLint/Prettier pair the team expects.
- **CI gains lint + format:check.** Add `format:check` and `lint` steps to the existing `ci.yml` job rather than a separate workflow — they share the same install and run fast.
- **GitHub Pages via official actions.** Use `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages` in a dedicated `deploy.yml` with `pages: write` + `id-token: write` permissions and a `github-pages` environment. Triggers: `push` to `main` and `workflow_dispatch`. Rationale: this is GitHub's supported artifact-based Pages flow (no `gh-pages` branch to maintain). A separate workflow keeps deploy concerns out of the PR-gating CI.
- **Production-only Vite `base`.** Set `base: '/<repo>/'` only for the production build (via the Vite `command === 'build'` mode), so project-pages asset URLs resolve while `npm run dev` stays root-served.

## Risks / Trade-offs

- **Empty `objects/`/`systems/` dirs may be dropped by git** → keep a minimal real file (the sample `systems/` helper + its test) so the structure is committed and the harness is proven.
- **Node version mismatch** (`docs/development_guide.md` requires Node ≥ 20.19.0) → declare an `engines` field in `package.json` so contributors get a clear warning.
- **Strict TypeScript may surface Phaser typing friction** → keep scene code minimal this change; resolve typing issues as gameplay is added, never by relaxing `strict` or adding `any`.
- **Naming mismatch with docs**: `docs/development_guide.md` refers to `001-project-scaffold`, but OpenSpec change names must start with a letter, so the change is named `project-scaffold`. The feature branch may still use the `001-` prefix per the git-workflow convention.
- **Pages must be enabled in repo settings** → the `deploy-pages` action requires "Build and deployment: GitHub Actions" set in the repo's Pages settings; the workflow cannot enable it. Flag this as a one-time manual step; the workflow will fail clearly until it is set.
- **`base` path hardcodes the repo name** → if the repo is renamed, the `base` must change. Mitigation: keep it in one place in `vite.config.ts` with a comment; acceptable for a single-repo project.
- **Applying Prettier to existing files may produce a formatting diff** → run `prettier --write .` once as part of implementation and commit the result so `format:check` is green from the start.
