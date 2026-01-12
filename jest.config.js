/**
 * Jest configuration for paywise-api
 * Configured for TypeScript testing with ts-jest
 * 
 * Repository: https://github.com/mleem97/paywise-api
 * Package: https://www.npmjs.com/package/paywise-api
 * License: MIT
 */

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  passWithNoTests: true,
};
