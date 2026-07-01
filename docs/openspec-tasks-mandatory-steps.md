---
description: Enforce mandatory steps when creating tasks.md artifacts for this frontend Phaser game, and ensure the agent executes all verification itself
alwaysApply: true
---

# OpenSpec Tasks: Mandatory Steps Enforcement

When creating or updating `tasks.md` artifacts in OpenSpec changes, you MUST follow these rules.

This is a **frontend-only Phaser 3 / TypeScript game**: there is no backend, no API, no database,
and no `curl` testing. Verification means unit tests (Vitest), a clean type-check/build, and —
when user-facing behavior changes — a **mandatory** browser pass via the Playwright MCP
(optional only for changes confined to pure `src/systems/` logic). Game rules
are defined in [game-design.md](./game-design.md); conventions in
[frontend-standards.md](./frontend-standards.md).

## 1. Establish context first

**BEFORE** creating or updating any `tasks.md` file, you MUST read:

- [game-design.md](./game-design.md) — the single source of truth for entities, rules, scoring
- [frontend-standards.md](./frontend-standards.md) — project structure, testing target, git workflow
- The current change's `proposal.md` and `specs/**/spec.md` — the requirements being implemented

Cross-reference the issue/story and the game-design doc: tasks must satisfy the spec scenarios
without contradicting documented game rules.

## 2. Mandatory steps

All implementation tasks MUST include these steps in the correct order:

### Step 0: Create Feature Branch (MUST BE FIRST)
- **Location**: Must be the very first step (Step 0)
- **Branch naming**: `feature/[change-name]` (e.g. `feature/002-paddle-and-ball`)
- **Action**: Create and switch to the feature branch before any code changes

### Implementation steps (TDD)
- Pure logic (scoring, bounce math, grid generation) goes in `src/systems/` and MUST be
  driven by a **failing Vitest test first**, then implementation.
- Scenes/objects wire input, physics and rendering; they delegate logic to `systems/` and
  are smoke-tested for construction only.
- Constants live in `src/config.ts`, never inlined.

### Mandatory verification steps (must be included, in this order)
- **Step N**: Review and Update Existing Unit Tests (MANDATORY)
- **Step N+1**: Run Unit Tests (MANDATORY) — **AGENT MUST EXECUTE**
- **Step N+2**: Type-check and Build Gate (MANDATORY) — **AGENT MUST EXECUTE**
- **Step N+3**: Browser Verification with Playwright MCP (MANDATORY if user-facing) — **AGENT MUST EXECUTE**
- **Step N+4**: Update Technical Documentation (MANDATORY)

## 3. Verification requirements — CRITICAL: agent must execute

**IMPORTANT**: The coding agent (AI) MUST perform all verification steps itself.
**NEVER delegate testing to the user.** A task in `tasks.md` may only be marked complete (`[x]`)
after the agent has executed the corresponding verification and confirmed the outcome.

### Step N+1: Run Unit Tests (MANDATORY — AGENT MUST EXECUTE)

**Agent responsibility**: execute the Vitest suite and confirm it is green.

1. Run targeted tests for the changed module(s): `npm test -- <path>` (or watch a subset).
2. Run the full suite: `npm test`.
3. Capture the summary (passed / failed / skipped, runtime). Resolve any regression before
   proceeding — do not mark the step complete on a red suite.
4. Confirm the coverage target in [frontend-standards.md](./frontend-standards.md) holds for
   `src/systems/` logic touched by this change.

### Step N+2: Type-check and Build Gate (MANDATORY — AGENT MUST EXECUTE)

**Agent responsibility**: prove the change compiles cleanly under strict mode.

1. Run `npm run build` (this type-checks and bundles).
2. Confirm **zero** TypeScript errors and no `any` / non-null-assertion introduced.
3. If the build fails, fix it before marking the step complete.

### Step N+3: Browser Verification with Playwright MCP (MANDATORY if user-facing)

**Agent responsibility**: when the change alters on-screen behavior (a new scene, input,
collision, HUD, overlay), the agent MUST verify it in a real browser using the Playwright MCP.

**When this applies**: any change a player can see or interact with. Skip only for changes
confined to `src/systems/` pure logic already covered by unit tests.

1. Start the dev server if needed (`npm run dev`) and `browser_navigate` to the local URL.
2. Take a `browser_snapshot` to confirm the canvas renders at 800x600.
3. Drive the relevant interaction with Playwright MCP tools (`browser_click`, `browser_type`,
   `browser_press_key` for paddle input, etc.) and verify the documented outcome from the spec
   scenario (e.g. ball bounces, brick is destroyed, score increments, life is lost).
4. Verify error/edge states defined in the spec (e.g. ball lost below paddle resets correctly).
5. Capture snapshots evidencing each verified scenario; close the browser session.

### Step N+4: Update Technical Documentation (MANDATORY)

Follow [documentation-standards.md](./documentation-standards.md). At minimum:

- Game rule, entity, scoring or lives changes → update [game-design.md](./game-design.md).
- Scene/event-contract or project-structure changes → update [frontend-standards.md](./frontend-standards.md).
- Library, build or install changes → update the relevant `*-standards.md` and
  [development_guide.md](./development_guide.md).

## 4. Verification checklist

Before finalizing any `tasks.md` file, verify:

- [ ] Step 0 (Create Feature Branch) is the FIRST step
- [ ] Branch naming follows `feature/[change-name]`
- [ ] Steps are numbered sequentially
- [ ] TDD ordering holds for `src/systems/` logic (failing test before implementation)
- [ ] Mandatory verification steps are present and labeled "(MANDATORY)"
- [ ] Verification steps that the agent must run are marked "AGENT MUST EXECUTE"
- [ ] The Playwright MCP step is included whenever the change is user-facing
- [ ] A documentation-update step is included

## 5. When this applies

This rule applies when:

- Creating `tasks.md` via `/opsx:ff` (fast-forward) or the `openspec-ff-change` skill
- Creating `tasks.md` via `/opsx:continue` or the `openspec-continue-change` skill
- Updating an existing `tasks.md`
- Implementing tasks via `/opsx:apply` or the `openspec-apply-change` skill — the agent must
  execute all verification steps itself

## 6. Example structure

```markdown
## 0. Setup: Create Feature Branch (MANDATORY — FIRST STEP)
- [ ] 0.1 Create feature branch `feature/002-paddle-and-ball` from main
- [ ] 0.2 Verify branch creation and current branch status

## 1. Systems: Bounce-angle logic (TDD)
- [ ] 1.1 Write failing Vitest test for bounce angle vs. paddle hit position
- [ ] 1.2 Implement `src/systems/bounce.ts` until the test passes
- [ ] 1.3 Add constants (max angle, speeds) to `src/config.ts`

## 2. Scene wiring
- [ ] 2.1 Add Paddle/Ball objects under `src/objects/`
- [ ] 2.2 Wire input + arcade physics in `GameScene`, delegating math to `systems/`

## 3. Review and Update Existing Unit Tests (MANDATORY)
- [ ] 3.1 Update affected tests; add tests for new `systems/` behavior

## 4. Run Unit Tests (MANDATORY — AGENT MUST EXECUTE)
- [ ] 4.1 Run targeted tests for changed modules
- [ ] 4.2 Run full suite `npm test` and confirm green
- [ ] 4.3 Confirm coverage target on touched `systems/` logic

## 5. Type-check and Build Gate (MANDATORY — AGENT MUST EXECUTE)
- [ ] 5.1 Run `npm run build`; confirm zero TS errors and no `any`

## 6. Browser Verification with Playwright MCP (MANDATORY — AGENT MUST EXECUTE)
- [ ] 6.1 Start dev server and navigate to the local URL
- [ ] 6.2 Verify paddle moves with keyboard/mouse and is clamped to the canvas
- [ ] 6.3 Verify ball bounces off walls/paddle and resets when lost below the paddle
- [ ] 6.4 Capture snapshots for each verified scenario

## 7. Update Technical Documentation (MANDATORY)
- [ ] 7.1 Update game-design.md / frontend-standards.md as needed
```

## 7. Enforcement

A `PreToolUse` hook ([ai-specs/scripts/verify_browser_pass.sh](../ai-specs/scripts/verify_browser_pass.sh),
wired in `.claude/settings.json`) **blocks `git commit`** on a `feature/<change-id>` branch (or the
`feat/<change-id>` shorthand) when the change's `tasks.md` has a "Browser Verification" section with
any unchecked (`[ ]`) item. It no-ops for branches outside that convention, changes with no matching `tasks.md`, and changes whose
`tasks.md` has no "Browser Verification" section (treated as non-user-facing).

**Limitation (honest):** the hook checks that the agent marked the browser-verification boxes
`[x]` — it does not, and a deterministic shell hook cannot, prove a browser actually rendered the
canvas. It prevents *skipping* the step, not a dishonest checkmark. A stronger, evidence-based
gate (fresh committed snapshots under the change folder) is a possible future tightening.

## 8. Failure to follow

If you create tasks without these mandatory steps, the user will need to manually fix the
`tasks.md` file. **If you implement tasks without executing the verification yourself, you are
violating this rule.** The agent must run the unit tests, the build gate, and (when user-facing)
the Playwright MCP browser pass before marking any task complete.
