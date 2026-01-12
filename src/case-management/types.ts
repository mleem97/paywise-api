/**
 * Types for Case Management API
 */

/**
 * Claim object
 */
export interface Claim {
  id: string;
  claimNumber?: string;
  debtorId?: string;
  amount?: number;
  currency?: string;
  description?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  dueDate?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  releasedAt?: string;
  [key: string]: any;
}

/**
 * Parameters for creating a claim
 */
export interface CreateClaimParams {
  debtorId: string;
  amount: number;
  currency?: string;
  description?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  dueDate?: string;
  [key: string]: any;
}

/**
 * Parameters for listing claims
 */
export interface ListClaimsParams {
  limit?: number;
  offset?: number;
  debtorId?: string;
  status?: string;
  [key: string]: any;
}

/**
 * Claim list response
 */
export interface ClaimListResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Claim[];
}

/**
 * Debtor object
 */
export interface Debtor {
  id: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  type?: 'person' | 'company';
  addresses?: Address[];
  bankAccounts?: BankAccount[];
  communicationChannels?: CommunicationChannel[];
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

/**
 * Address object
 */
export interface Address {
  id?: string;
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  type?: string;
  [key: string]: any;
}

/**
 * Bank account object
 */
export interface BankAccount {
  id?: string;
  iban?: string;
  bic?: string;
  accountHolder?: string;
  bankName?: string;
  [key: string]: any;
}

/**
 * Communication channel object
 */
export interface CommunicationChannel {
  id?: string;
  type?: string;
  value?: string;
  [key: string]: any;
}

/**
 * Parameters for creating a debtor
 */
export interface CreateDebtorParams {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  email?: string;
  phone?: string;
  type?: 'person' | 'company';
  [key: string]: any;
}

/**
 * Parameters for listing debtors
 */
export interface ListDebtorsParams {
  limit?: number;
  offset?: number;
  search?: string;
  [key: string]: any;
}

/**
 * Debtor list response
 */
export interface DebtorListResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Debtor[];
}

/**
 * Mandate object
 */
export interface Mandate {
  id: string;
  mandateNumber?: string;
  claimId?: string;
  debtorId?: string;
  status?: string;
  amount?: number;
  currency?: string;
  createdAt?: string;
  updatedAt?: string;
  archivedAt?: string;
  [key: string]: any;
}

/**
 * Parameters for listing mandates
 */
export interface ListMandatesParams {
  limit?: number;
  offset?: number;
  claimId?: string;
  debtorId?: string;
  status?: string;
  [key: string]: any;
}

/**
 * Mandate list response
 */
export interface MandateListResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Mandate[];
}

/**
 * Status update object
 */
export interface StatusUpdate {
  id: string;
  mandateId: string;
  status?: string;
  description?: string;
  createdAt?: string;
  [key: string]: any;
}

/**
 * Status update list response
 */
export interface StatusUpdateListResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: StatusUpdate[];
}

/**
 * Request to client object
 */
export interface RequestToClient {
  id: string;
  mandateId: string;
  type?: string;
  question?: string;
  status?: string;
  createdAt?: string;
  answeredAt?: string;
  [key: string]: any;
}

/**
 * Request to client list response
 */
export interface RequestToClientListResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: RequestToClient[];
}

/**
 * Parameters for submitting request to client answer
 */
export interface SubmitRequestAnswerParams {
  answer: string;
  [key: string]: any;
}

/**
 * Payment object
 */
export interface Payment {
  id: string;
  mandateId?: string;
  claimId?: string;
  amount?: number;
  currency?: string;
  paymentDate?: string;
  paymentMethod?: string;
  reference?: string;
  status?: string;
  createdAt?: string;
  [key: string]: any;
}

/**
 * Parameters for creating a payment
 */
export interface CreatePaymentParams {
  mandateId?: string;
  claimId?: string;
  amount: number;
  currency?: string;
  paymentDate?: string;
  paymentMethod?: string;
  reference?: string;
  [key: string]: any;
}

/**
 * Parameters for listing payments
 */
export interface ListPaymentsParams {
  limit?: number;
  offset?: number;
  mandateId?: string;
  claimId?: string;
  status?: string;
  [key: string]: any;
}

/**
 * Payment list response
 */
export interface PaymentListResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Payment[];
}

/**
 * Statement object
 */
export interface Statement {
  id: string;
  statementNumber?: string;
  periodStart?: string;
  periodEnd?: string;
  totalAmount?: number;
  currency?: string;
  status?: string;
  createdAt?: string;
  [key: string]: any;
}

/**
 * Parameters for listing statements
 */
export interface ListStatementsParams {
  limit?: number;
  offset?: number;
  periodStart?: string;
  periodEnd?: string;
  [key: string]: any;
}

/**
 * Statement list response
 */
export interface StatementListResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Statement[];
}

/**
 * Mandate detail for statement
 */
export interface MandateDetail {
  mandateId: string;
  amount?: number;
  description?: string;
  [key: string]: any;
}

/**
 * Mandate details list response
 */
export interface MandateDetailsListResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: MandateDetail[];
}

/**
 * User info object
 */
export interface UserInfo {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  companyId?: string;
  roles?: string[];
  [key: string]: any;
}
