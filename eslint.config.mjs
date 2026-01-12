/**
 * ESLint configuration for paywise-api
 * Uses ESLint v9 flat config format
 * 
 * Repository: https://github.com/mleem97/paywise-api
 * Package: https://www.npmjs.com/package/paywise-api
 * License: MIT
 */

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist/', 'node_modules/', 'jest.config.js', 'examples/'],
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  }
);
