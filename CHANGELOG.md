# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]




## [1.2.0] - 2026-01-12

### Added

- add comprehensive mock-based tests and Husky pre-commit hooks ([df2b197](https://github.com/mleem97/paywise-api/commit/df2b1978f92e36e61afcc2db264e6fa1455a304d))
## [1.1.1] - 2026-01-12

### Changed

- ensure consistent semantic-release tag format configuration ([96077a8](https://github.com/mleem97/paywise-api/commit/96077a8778ed5314fd0d3ecbf1b690f9ada6c690))

### Fixed

- resolve TypeScript and type safety errors ([3d532ba](https://github.com/mleem97/paywise-api/commit/3d532ba4169c404706130465169f054d29d47ffe))
## [1.0.0] - 2026-01-12

### Added

- add flexible parameter types for listing claims, debtors, mandates, requests, payments, statements, companies, and users ([c6a8b50](https://github.com/mleem97/paywise-api/commit/c6a8b5041ea93d9528bd4d444936b6ba60f364fe))
- add Keep a Changelog format support for semantic-release ([ff13716](https://github.com/mleem97/paywise-api/commit/ff13716fea624925754e81c8e6657994b444f359))
- add automated CI/CD with semantic-release
- add NPM Trusted Publishers (OIDC) support

### Changed

- update ApiResponse and ApiError types for better type safety ([d22db97](https://github.com/mleem97/paywise-api/commit/d22db9768cf444d470e7997aa912b142c4983395))
- upgrade to Node.js 22 for semantic-release compatibility ([105fa80](https://github.com/mleem97/paywise-api/commit/105fa801dfb69c9c594ef83b7c99dab5c982ef41))
- Field names now use snake_case to match API

### Fixed

- resolve TypeScript and type safety errors ([3d532ba](https://github.com/mleem97/paywise-api/commit/3d532ba4169c404706130465169f054d29d47ffe))
- v1.1.0 - API corrections and CI/CD pipeline ([4004bc4](https://github.com/mleem97/paywise-api/commit/4004bc4bb2837429d4ea920261741fb747235fb5))
- all endpoint URLs corrected to match Paywise documentation
## [1.1.0] - 2026-01-12

### Added

- CI/CD Pipeline with GitHub Actions
  - ESLint linting on every push/PR
  - Jest testing framework configured
  - Semantic Release for automated versioning and npm publishing
  - NPM Trusted Publishers (OIDC) support with GitHub Actions environment
  - Keep a Changelog format support with custom update script
- "Web Automation & Billing Integration" section in README
  - Complete example for automated dunning handoff
  - Best practices for SaaS/E-Commerce integration
- Configuration files: `eslint.config.mjs`, `jest.config.js`, `.github/workflows/release.yml`
- Repository information comments in all source and configuration files
- Maintainer and NPM package metadata in `package.json`

### Changed

- **BREAKING:** All type field names now use snake_case to match API responses
- All endpoint URLs corrected to match official Paywise API documentation
- Case Management API endpoint corrections:
  - `releaseClaim()` now uses PATCH `/claims/{id}/` with `{submission_state: 'released'}`
  - `addDebtorAddress()` now returns `Debtor` object
  - `listMandateStatusUpdates()` corrected to `/mandates/{id}/statusupdates/`
  - `listMandateRequests()` corrected to `/mandates/{id}/requests-to-client/`
  - `archiveMandate()` now uses PATCH with `{archived: boolean}`
  - `getUserInfo()` now returns `UserInfo[]`
- Partner API endpoint corrections:
  - User invite endpoints corrected from `/user-invites/` to `/userinvites/`
  - `getOnboardedUser()` corrected to `/userinvites/{id}/get-onboarded-user/`
  - `getInfo()` replaces `getTokenInfo()`, returns `PartnerInfo[]`
- Complete rewrite of TypeScript interfaces to match official API schemas
  - Added missing types: `Amount`, `Metadata`, `Event`, `LegalClaimBalance`, etc.
  - Corrected nested object structures for Claims, Debtors, Mandates, Statements
- TypeScript config updated to `moduleResolution: NodeNext` for TypeScript 5.x compatibility
- README updated with maintainer information and improved feature descriptions

### Fixed

- ESLint configuration updated for ESLint v9 compatibility
- Removed unused type imports causing lint errors
- Module resolution deprecation warning for TypeScript 7.0

### Removed

- Deprecated `npm-publish.yml` workflow (replaced by unified `release.yml`)

## [1.0.0] - 2026-01-12

### Added

- Initial release of the `paywise-api` client
- Case Management API: Full implementation for Claims, Debtors, Mandates, Payments, and Statements
- Partner API: Full implementation for Companies, Users, and User Invites
- Complete TypeScript type definitions for all request and response models
- Support for both Node.js and Browser environments via universal fetch
