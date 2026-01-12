# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-12

### Changed

- **API Corrections:** All endpoint URLs now match official Paywise API documentation
- **Case Management API:** Fixed all endpoint paths with correct trailing slashes
  - `releaseClaim()` now uses PATCH `/claims/{id}/` with `{submission_state: 'released'}`
  - `addDebtorAddress()` now returns `Debtor` object
  - `listMandateStatusUpdates()` corrected to `/mandates/{id}/statusupdates/`
  - `listMandateRequests()` corrected to `/mandates/{id}/requests-to-client/`
  - `archiveMandate()` now uses PATCH with `{archived: boolean}`
  - `getUserInfo()` now returns `UserInfo[]`
- **Partner API:** Fixed all endpoint paths
  - User invite endpoints corrected from `/user-invites/` to `/userinvites/`
  - `getOnboardedUser()` corrected to `/userinvites/{id}/get-onboarded-user/`
  - `getInfo()` replaces `getTokenInfo()`, returns `PartnerInfo[]`
- **Type Definitions:** Complete rewrite of all TypeScript interfaces to match official API schemas
  - All field names now use snake_case as per API documentation
  - Added missing types: `Amount`, `Metadata`, `Event`, `LegalClaimBalance`, etc.
  - Corrected nested object structures for Claims, Debtors, Mandates, Statements
- **TypeScript Config:** Updated to `moduleResolution: NodeNext` for TypeScript 5.x compatibility

### Added

- **CI/CD Pipeline:** Automated release workflow with GitHub Actions
  - ESLint linting on every push/PR
  - Jest testing framework configured
  - Semantic Release for automated versioning and npm publishing
  - NPM Trusted Publishers (OIDC) support with token fallback
- **Documentation:** Added "Web Automation & Billing Integration" section to README
  - Complete example for automated dunning handoff
  - Best practices for SaaS/E-Commerce integration
- **Configuration Files:**
  - `eslint.config.mjs` for ESLint v9 flat config
  - `jest.config.js` for test configuration
  - `.github/workflows/release.yml` for CI/CD

### Fixed

- ESLint configuration updated for ESLint v9 compatibility
- Removed unused type imports causing lint errors
- Fixed module resolution deprecation warning for TypeScript 7.0

### Removed

- Deleted deprecated `npm-publish.yml` workflow (replaced by unified `release.yml`)

## [1.0.0] - 2026-01-12

### Added

- **Initial Release:** First public release of the `paywise-api` client.
- **Case Management API:** Full implementation of endpoints for Claims, Debtors, Mandates, Payments, and Statements.
- **Partner API:** Full implementation of endpoints for Companies, Users, and User Invites.
- **TypeScript:** Complete type definitions for all request and response models.
- **Compatibility:** Added support for both Node.js and Browser environments via universal fetch.

### Internal

- Validated usage and stability in Node.js applications.
