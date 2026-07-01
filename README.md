# spec-breaker

Demo de Spec-Driven Development: construyendo un juego web estilo Breakout con **TypeScript + Phaser 3 + Vite**, impulsado completamente por specs y agentes de IA (**OpenCode**, pero funciona con Claude Code, Copilot o Gemini).

Construido sobre [LIDR Specboot](https://github.com/LIDR-academy/lidr-specboot) — un conjunto portable de reglas de desarrollo, definiciones de agentes y skills para flujos de trabajo spec-driven con [OpenSpec](https://github.com/Fission-AI/OpenSpec). Los directorios `docs/`, `ai-specs/` y la configuración de agentes siguen la estructura de Specboot, adaptada para un proyecto de juego frontend-only (estándares de backend, API spec y modelo de datos eliminados; `docs/game-design.md` agregado; `enrich-us` adaptado para GitHub Issues).

## Stack

- TypeScript (strict)
- Phaser 3
- Vite
- Vitest

## Flujo de trabajo

Cada cambio parte de un GitHub Issue (ver `ISSUES.md` / [Issues](../../issues)). Flujo estándar de OpenSpec, un cambio a la vez:

```
/enrich-us <issue>      # refinar el GitHub Issue en una historia lista para implementar
/ff <change>            # crear los artefactos de spec
/apply <change>         # implementar las tareas
/verify <change>        # validar contra la spec
/adversarial-review     # revisión adversarial (opcional)
/archive <change>       # listo
/commit
```

## Demo

| Cambio | Issue | Alcance | Estado |
|---|---|---|---|
| `001-paddle-and-ball` | [#1](../../issues/1) | Input, física, rebote en paredes, pérdida de pelota | ← demo en vivo desde aquí |
| `002-bricks` | [#2](../../issues/2) | Cuadrícula 8×5, colisión, destrucción |  |
| `003-score-and-lives` | [#3](../../issues/3) | HUD, game over, victoria, reinicio |  |
| `004-power-ups` | [#4](../../issues/4) | Power-ups que caen de ladrillos destruidos | ← la audiencia retoma aquí |
| `005-visual-polish` | [#5](../../issues/5) | Partículas, animaciones, pantalla de inicio |  |
| `006-ui-stripes` | [#6](../../issues/6) | Rayas de color en ladrillos, polish de UI |  |
| `007-extended-powerups` | [#7](../../issues/7) | Más variedad de power-ups |  |
| `008-hard-bricks` | [#8](../../issues/8) | Ladrillos de 2 golpes |  |
| `009-10-levels` | [#9](../../issues/9) | 10 niveles con dificultad creciente |  |
| `010-high-scores` | [#10](../../issues/10) | Puntajes máximos persistentes con iniciales |  |
| `011-score-differentiation` | [#11](../../issues/11) | Diferenciar puntajes finales |  |
| `012-sound` | [#12](../../issues/12) | Efectos de sonido retro y música |  |

El scaffold viene pre-instalado. El demo en vivo arranca en `001` con `/enrich-us` + `/ff` y cubre hasta `003`. A partir de `004`, la audiencia continúa sobre una implementación existente.

## Cómo seguir el demo

1. Clonar este repositorio
2. Instalar OpenSpec: `npm install -g @fission-ai/openspec@latest`, luego `openspec init`
3. Abrir con OpenCode (lee `AGENTS.md` de forma nativa) o el agente de tu elección
4. Crear los issues desde `ISSUES.md` (`gh issue create ...`) y ejecutar los cambios en orden, o ramificar y personalizar

### Ideas de personalización

Misma estructura de specs, tu propio juego: cambiá el tema (espacio, golosinas, retro), modificá el diseño de los ladrillos, agregá power-ups, o pivoteá a Pong / Space Invaders reutilizando el mismo contexto de `docs/`.

## Archivos clave

- `docs/base-standards.md` — reglas base (TDD, tipado, nomenclatura), fuente única de verdad
- `docs/frontend-standards.md` — convenciones de Phaser/Vite
- `docs/game-design.md` — entidades, reglas, puntuación (reemplaza `api-spec.yml` / `data-model.md` de Specboot)
- `ai-specs/` — agentes y skills; `AGENTS.md`/`CLAUDE.md`/`codex.md`/`GEMINI.md` apuntan todos a `docs/base-standards.md`
- `ai-specs/specboot-instructions.md` — referencia completa de Specboot (adaptada)

> Los skills originales de Specboot referencian Jira; este proyecto usa **GitHub Issues**. El skill `enrich-us` (v1.1.0) lee los issues vía el CLI `gh` (`gh issue view <n>`) o el servidor MCP de GitHub.

## Créditos

- [LIDR Specboot](https://github.com/LIDR-academy/lidr-specboot) (MIT) — reglas base, agentes y skills, parte del [programa AI4Devs](https://lidr.co/ia-devs)
- [OpenSpec](https://github.com/Fission-AI/OpenSpec)
