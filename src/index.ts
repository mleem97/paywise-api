/**
 * Paywise API - TypeScript/JavaScript client library
 * 
 * Repository: https://github.com/mleem97/paywise-api
 * Package: https://www.npmjs.com/package/paywise-api
 * License: MIT
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
  RequestToClient,
  RequestToClientListResponse,
  ListRequestsToClientParams,
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
  ListMandateDetailsParams,
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
  PartnerInfo,
} from './partner-api/types';

// Default export
export { PaywiseClient as default } from './client';
