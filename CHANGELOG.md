# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]


## [1.1.0] - 2026-01-12

### Added

- add Keep a Changelog format support for semantic-release ([ff13716](https://github.com/mleem97/paywise-api/commit/ff13716fea624925754e81c8e6657994b444f359))
## [1.1.0] - 2026-01-12

### Added

- CI/CD Pipeline with GitHub Actions
  - ESLint linting on every push/PR
  - Jest testing framework configured
  - Semantic Release for automated versioning and npm publishing
  - NPM Trusted Publishers (OIDC) support with token fallback
- "Web Automation & Billing Integration" section in README
  - Complete example for automated dunning handoff
  - Best practices for SaaS/E-Commerce integration
- Configuration files: `eslint.config.mjs`, `jest.config.js`, `.github/workflows/release.yml`

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
