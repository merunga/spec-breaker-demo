# spec-breaker

Spec-Driven Development demo: building a Breakout-style web game in **TypeScript + Phaser 3 + Vite**, driven entirely by specs and AI coding agents (**OpenCode**, but works with Claude Code, Copilot or Gemini).

Built on top of [LIDR Specboot](https://github.com/LIDR-academy/lidr-specboot) — a portable set of development rules, agent definitions and skills for spec-driven workflows with [OpenSpec](https://github.com/Fission-AI/OpenSpec). The `docs/`, `ai-specs/` and agent config here follow Specboot's structure, customized for a frontend-only game project (backend standards, API spec and data model removed; `docs/game-design.md` added; `enrich-us` adapted to GitHub Issues).

## Stack

- TypeScript (strict)
- Phaser 3
- Vite
- Vitest

## Workflow

Each change starts from a GitHub Issue (see `ISSUES.md` / [Issues](../../issues)). Standard OpenSpec flow, one change at a time:

```
/enrich-us <issue>      # refine the GitHub issue into an implementation-ready story
/ff <change>            # create spec artifacts
/apply <change>         # implement tasks
/verify <change>        # validate against the spec
/adversarial-review     # red-team review (optional)
/archive <change>       # done
/commit
```

## Demo arc

| Change | Issue | Scope |
|---|---|---|
| `001-project-scaffold` | #1 | Vite + Phaser + TS, empty scene renders |
| `002-paddle-and-ball` | #2 | Input, physics, wall bounce, ball loss |
| `003-bricks` | #3 | Grid layout, collision, destruction |
| `004-score-and-lives` | #4 | HUD, game over, restart |
| `005-powerups` | #5 | Your turn — left as an exercise |

Only `001` ships with full OpenSpec artifacts (proposal/tasks/spec). `002`–`005` are generated live on stage with `/enrich-us` + `/ff` — that's the demo.

## Follow along

1. Clone this repo
2. Install OpenSpec: `npm install -g @fission-ai/openspec@latest`, then `openspec init`
3. Open with OpenCode (reads `AGENTS.md` natively) or your agent of choice
4. Create the issues from `ISSUES.md` (`gh issue create ...`) and run the changes in order, or branch off and personalize

### Personalization ideas

Same spec structure, your game: swap the theme (space, candy, retro), change brick layouts, add power-ups, or pivot to Pong / Space Invaders reusing the same `docs/` context.

## Key files

- `docs/base-standards.md` — core rules (TDD, typing, naming), single source of truth
- `docs/frontend-standards.md` — Phaser/Vite conventions
- `docs/game-design.md` — entities, rules, scoring (replaces Specboot's `api-spec.yml` / `data-model.md`)
- `ai-specs/` — agents and skills; `AGENTS.md`/`CLAUDE.md`/`codex.md`/`GEMINI.md` all point to `docs/base-standards.md`
- `ai-specs/specboot-instructions.md` — full Specboot reference (adapted)

> Specboot's original skills reference Jira; this project uses **GitHub Issues**. The `enrich-us` skill (v1.1.0) reads issues via the `gh` CLI (`gh issue view <n>`) or the GitHub MCP server.

## Credits

- [LIDR Specboot](https://github.com/LIDR-academy/lidr-specboot) (MIT) — base rules, agents and skills, part of the [AI4Devs program](https://lidr.co/ia-devs)
- [OpenSpec](https://github.com/Fission-AI/OpenSpec)
