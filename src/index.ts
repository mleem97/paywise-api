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
  Claim,
  ClaimListResponse,
  CreateClaimParams,
  ListClaimsParams,
  Debtor,
  DebtorListResponse,
  CreateDebtorParams,
  ListDebtorsParams,
  Address,
  BankAccount,
  CommunicationChannel,
  Mandate,
  MandateListResponse,
  ListMandatesParams,
  StatusUpdate,
  StatusUpdateListResponse,
  RequestToClient,
  RequestToClientListResponse,
  SubmitRequestAnswerParams,
  Payment,
  PaymentListResponse,
  CreatePaymentParams,
  ListPaymentsParams,
  Statement,
  StatementListResponse,
  ListStatementsParams,
  MandateDetail,
  MandateDetailsListResponse,
  UserInfo,
} from './case-management/types';

// Partner API
export { PartnerApiClient } from './partner-api/client';
export type {
  Company,
  CompanyAddress,
  CompanyListResponse,
  CreateCompanyParams,
  UpdateCompanyParams,
  ListCompaniesParams,
  User,
  UserListResponse,
  CreateUserParams,
  ListUsersParams,
  UserInvite,
  CreateUserInviteParams,
  OnboardedUser,
  TokenInfo,
} from './partner-api/types';

// Default export
export { PaywiseClient as default } from './client';
