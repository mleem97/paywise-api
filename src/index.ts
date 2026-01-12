/**
 * Paywise API - TypeScript/JavaScript client library
 * 
 * @packageDocumentation
 */

// Main client
export { PaywiseClient } from './client';

// HTTP client
export { HttpClient } from './http-client';

// Common types
export type {
  PaywiseConfig,
  HttpMethod,
  ApiResponse,
  ApiError,
  PaginationParams,
  SortParams,
  QueryParams,
} from './types';

// Case Management API
export { CaseManagementClient } from './case-management/client';
export type {
  Case,
  CaseStatus,
  CasePriority,
  CaseType,
  CreateCaseParams,
  UpdateCaseParams,
  ListCasesParams,
  CaseComment,
  CreateCaseCommentParams,
  CaseAttachment,
  CaseActivity,
  CaseListResponse,
  CaseCommentsListResponse,
  CaseActivitiesListResponse,
} from './case-management/types';

// Partner API
export { PartnerApiClient } from './partner-api/client';
export type {
  Partner,
  PartnerStatus,
  PartnerType,
  Address,
  CreatePartnerParams,
  UpdatePartnerParams,
  ListPartnersParams,
  PartnerTransaction,
  CreatePartnerTransactionParams,
  PartnerAnalytics,
  PartnerAnalyticsParams,
  PartnerApiKey,
  CreatePartnerApiKeyParams,
  PartnerListResponse,
  PartnerTransactionListResponse,
  PartnerApiKeyListResponse,
} from './partner-api/types';

// Default export
export { PaywiseClient as default } from './client';
