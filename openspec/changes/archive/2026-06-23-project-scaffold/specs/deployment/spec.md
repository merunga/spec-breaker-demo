## ADDED Requirements

### Requirement: GitHub Pages deployment workflow

The project SHALL provide a GitHub Actions workflow that builds the Vite app and publishes the `dist/` output to GitHub Pages using the official Pages actions, with the least-privilege permissions required (`pages: write`, `id-token: write`) and a concurrency group so overlapping deploys do not race.

#### Scenario: Build is published to Pages

- **WHEN** the deploy workflow runs
- **THEN** it builds the app and publishes the `dist/` artifact to GitHub Pages, making the game reachable at the project-pages URL

### Requirement: Deployment triggers

The deployment workflow SHALL run automatically on pushes to `main` AND be invocable manually via `workflow_dispatch`.

#### Scenario: Automatic deploy on push to main

- **WHEN** a commit lands on `main`
- **THEN** the deploy workflow runs automatically

#### Scenario: Manual deploy

- **WHEN** a maintainer triggers the workflow via `workflow_dispatch`
- **THEN** the deploy workflow runs on demand

### Requirement: Production base path

The Vite build SHALL set a production-only `base` path matching the GitHub Pages project sub-path so built asset URLs resolve correctly, without affecting the local `dev` server which is served from the root.

#### Scenario: Built assets resolve under the project sub-path

- **WHEN** the production build runs for deployment
- **THEN** asset URLs are prefixed with the project `base` path so they load from `https://<owner>.github.io/<repo>/`

#### Scenario: Dev server is unaffected

- **WHEN** a developer runs `npm run dev`
- **THEN** the app is served from the root path with no base prefix
