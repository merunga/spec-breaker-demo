# code-quality Specification

## Purpose

Define the formatting, linting, and CI enforcement standards that keep the codebase consistent and free of disallowed patterns.

## Requirements

### Requirement: Formatting authority

The project SHALL use Prettier as the single formatting authority for source, config, and documentation files, configured by a committed `.prettierrc.json` with a matching `.prettierignore`. A `format` script MUST apply formatting and a `format:check` script MUST verify it without writing.

#### Scenario: Format check passes on conforming code

- **WHEN** a developer runs `npm run format:check`
- **THEN** Prettier reports all checked files are formatted and exits zero

#### Scenario: Format check fails on non-conforming code

- **WHEN** a file violates the Prettier configuration and `npm run format:check` runs
- **THEN** Prettier reports the offending file and exits non-zero

### Requirement: Linting

The project SHALL lint `src/` and `tests/` with ESLint using a flat config (`eslint.config.js`) based on the TypeScript-ESLint recommended ruleset, integrated with Prettier via `eslint-config-prettier` so formatting and lint rules do not conflict. Linting MUST enforce the project rules: no `any` and no non-null assertions. A `lint` script MUST run the linter and a `lint:fix` script MUST apply auto-fixes.

#### Scenario: Lint passes on clean code

- **WHEN** a developer runs `npm run lint`
- **THEN** ESLint reports no errors and exits zero

#### Scenario: Lint fails on a disallowed pattern

- **WHEN** code introduces an `any` type or a non-null assertion and `npm run lint` runs
- **THEN** ESLint reports an error and exits non-zero

### Requirement: CI enforcement of code quality

Continuous integration SHALL run formatting and lint checks on pushes and pull requests, and MUST fail the pipeline on any formatting or lint violation.

#### Scenario: CI is red on a lint or format violation

- **WHEN** a commit with a lint or formatting violation is pushed or opened in a pull request
- **THEN** the CI workflow runs `npm run format:check` and `npm run lint` and the pipeline fails
