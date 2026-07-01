# deployment Specification

## Purpose

Define how the Vite app is built and published to Surge — both the production site and a per-PR preview for every pull request — including triggers, the root-served base path, and the requirement that each PR link its own preview URL.

## Requirements

### Requirement: Surge production deployment workflow

The project SHALL provide a GitHub Actions workflow that builds the Vite app and publishes the `dist/` output to the production Surge site (`spec-breaker.surge.sh`) using the Surge CLI authenticated via the `SURGE_LOGIN` and `SURGE_TOKEN` repository secrets.

#### Scenario: Build is published to Surge

- **WHEN** the deploy workflow runs
- **THEN** it builds the app and publishes the `dist/` output to `spec-breaker.surge.sh`, making the game reachable at the production Surge URL

### Requirement: Deployment triggers

The production deployment workflow SHALL run automatically on pushes to `main` AND be invocable manually via `workflow_dispatch`.

#### Scenario: Automatic deploy on push to main

- **WHEN** a commit lands on `main`
- **THEN** the deploy workflow runs automatically

#### Scenario: Manual deploy

- **WHEN** a maintainer triggers the workflow via `workflow_dispatch`
- **THEN** the deploy workflow runs on demand

### Requirement: Per-PR preview deployment

Every pull request SHALL be deployed to its own Surge preview site and link it in the PR description. The preview subdomain SHALL follow the convention `spec-breaker-<NNN>-<slug>.surge.sh` (where `<NNN>` is the zero-padded change number and `<slug>` is a short change name), and the PR body SHALL contain a "Live demo" section linking that URL.

#### Scenario: PR links its own preview

- **WHEN** a pull request is opened or updated
- **THEN** the branch is built and published to `spec-breaker-<NNN>-<slug>.surge.sh`
- **AND** the PR description contains a "Live demo" section linking that preview URL

### Requirement: Root-served base path

The Vite build SHALL use a root (`/`) `base` path because Surge serves each site at its subdomain root, so built asset URLs resolve from the domain root for both the production site and every preview.

#### Scenario: Built assets resolve from the domain root

- **WHEN** the production build runs for deployment
- **THEN** asset URLs are root-relative (e.g. `/assets/...`) so they load from `https://<subdomain>.surge.sh/`

#### Scenario: Dev server is unaffected

- **WHEN** a developer runs `npm run dev`
- **THEN** the app is served from the root path, matching the deployed base
