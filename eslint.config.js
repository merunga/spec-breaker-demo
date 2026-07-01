// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  // Replaces .eslintignore — build output, deps, and agent tooling are not
  // linted. ai-specs holds skill scripts that are not part of the game source.
  {
    ignores: ['dist', 'coverage', 'node_modules', 'ai-specs'],
  },
  // Type-aware linting for the TypeScript source and tests.
  {
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Enforce the project rules from docs/frontend-standards.md.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
    },
  },
  // Root-level JS config files (e.g. this file) get non-typed linting.
  {
    files: ['*.js'],
    extends: [js.configs.recommended, tseslint.configs.disableTypeChecked],
    languageOptions: {
      globals: {
        // eslint.config.js uses import.meta; allow Node/ESM globals.
        process: 'readonly',
      },
    },
  },
  // Must come last: turn off rules that conflict with Prettier formatting.
  prettier,
);
