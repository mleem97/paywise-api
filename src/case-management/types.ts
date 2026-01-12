/**
 * Types for Case Management API
 * Based on official Paywise API documentation
 */

// ==================== Common Types ====================

/**
 * Amount object used throughout the API
 */
export interface Amount {
  value: string;
  currency: 'EUR';
}

/**
 * Paginated list response
 */
export interface PaginatedResponse<T> {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
}

/**
 * Metadata item
 */
export interface Metadata {
  type: string;
  value: string;
}

/**
 * Event object
 */
export interface Event {
  type: 'claim' | 'delivery' | 'invoice' | 'registration' | string;
  title: string;
  occurence: string;
  your_reference?: string;
  description?: string;
  location?: string;
}

// ==================== Claims ====================

/**
 * Claim submission state
 */
export type ClaimSubmissionState = 
  | 'created' 
  | 'released' 
  | 'under_review' 
  | 'client_response_pending' 
  | 'accepted' 
  | 'rejected';

/**
 * Starting approach for claim collection
 */
export type StartingApproach = 'extrajudicial' | 'judicial';

/**
 * Document attached to a claim
 */
export interface ClaimDocument {
  id: string;
  mime_type: string;
  filename: string;
}

/**
 * Claim item (Rechnungsposten)
 */
export interface ClaimItem {
  description: string;
  quantity: number;
  amount: Amount;
  unit?: string;
}

/**
 * Additional charge for a claim (Nebenforderungen)
 */
export interface AdditionalCharge {
  type: 'reminder_fee' | 'bank_charge' | 'interest' | string;
  your_reference?: string;
  subject_matter?: string;
  occurence_date?: string;
  document_date?: string;
  due_date?: string;
  amount: Amount;
  id?: string;
  metadata?: Metadata[];
  events?: Event[];
}

/**
 * Payment on a claim
 */
export interface ClaimPayment {
  href?: string;
  id?: string;
  amount: Amount;
  value_date: string;
  created?: string;
  your_reference?: string;
  metadata?: Metadata[];
}

/**
 * Mandate reference in claim
 */
export interface ClaimMandate {
  href: string;
  id: string;
  reference_number?: string;
}

/**
 * Full claim object
 */
export interface Claim {
  href: string;
  id?: string;
  submission_state: ClaimSubmissionState;
  debtor: string;
  mandate: ClaimMandate;
  your_reference: string | null;
  subject_matter: string | null;
  occurence_date: string | null;
  document_reference: string | null;
  document_date: string | null;
  due_date: string | null;
  reminder_date: string | null;
  delay_date: string | null;
  total_claim_amount: Amount;
  main_claim_amount: Amount;
  starting_approach: StartingApproach;
  claim_disputed: boolean;
  obligation_fulfilled: boolean;
  documents: ClaimDocument[];
  created: string;
  updated: string;
  items?: ClaimItem[];
  additional_charges_amount?: Amount;
  additional_charges?: AdditionalCharge[];
  payments?: ClaimPayment[];
  metadata?: Metadata[];
  events?: Event[];
}

/**
 * Parameters for creating a claim
 */
export interface CreateClaimParams {
  debtor: string;
  your_reference: string | null;
  subject_matter: string | null;
  occurence_date: string | null;
  document_reference: string | null;
  document_date: string | null;
  due_date: string | null;
  reminder_date: string | null;
  delay_date: string | null;
  total_claim_amount: Amount;
  main_claim_amount: Amount;
  starting_approach: StartingApproach;
  claim_disputed: boolean;
  obligation_fulfilled: boolean;
  items?: ClaimItem[];
  additional_charges_amount?: Amount;
  additional_charges?: AdditionalCharge[];
  payments?: ClaimPayment[];
  metadata?: Metadata[];
  events?: Event[];
}

/**
 * Parameters for releasing a claim
 */
export interface ReleaseClaimParams {
  submission_state: 'released';
  send_order_confirmation?: boolean;
}

/**
 * Parameters for listing claims
 */
export interface ListClaimsParams {
  claim_disputed?: boolean;
  delay_date?: string;
  document_reference?: string;
  due_date?: string;
  id?: string;
  limit?: number;
  obligation_fulfilled?: boolean;
  offset?: number;
  reminder_date?: string;
  starting_approach?: string;
  subject_matter?: string;
  submission_state?: string;
  your_reference?: string;
}

/**
 * Claim list response
 */
export type ClaimListResponse = PaginatedResponse<Claim>;

// ==================== Debtors ====================

/**
 * Debtor acting as type
 */
export type DebtorActingAs = 'consumer' | 'business';

/**
 * Communication channel type
 */
export type CommunicationChannelType = 
  | 'email' 
  | 'phone' 
  | 'mobile_phone' 
  | 'fax' 
  | 'skype' 
  | 'facebook_messenger' 
  | 'imessage' 
  | 'whatsapp' 
  | 'facebook' 
  | 'twitter' 
  | 'linkedin' 
  | 'xing' 
  | 'social_various' 
  | 'website_url' 
  | 'web_various';

/**
 * Address object
 */
export interface Address {
  street: string | null;
  zip: string | null;
  city: string | null;
  country: string;
}

/**
 * Bank account object
 */
export interface BankAccount {
  iban: string;
  bic?: string | null;
}

/**
 * Communication channel object
 */
export interface CommunicationChannel {
  type: CommunicationChannelType;
  value: string;
}

/**
 * Person object for debtor
 */
export interface DebtorPerson {
  first_name?: string;
  last_name?: string;
  salutation?: string;
  birth_date?: string;
  death_date?: string;
}

/**
 * Organization object for debtor
 */
export interface DebtorOrganization {
  name: string;
}

/**
 * Full debtor object
 */
export interface Debtor {
  href: string;
  id?: string;
  acting_as: DebtorActingAs;
  addresses: Address[];
  created: string;
  updated: string;
  your_reference?: string | null;
  person?: DebtorPerson;
  organization?: DebtorOrganization;
  communication_channels?: CommunicationChannel[];
  bank_accounts?: BankAccount[];
  metadata?: Metadata[];
  events?: Event[];
}

/**
 * Parameters for creating a debtor
 */
export interface CreateDebtorParams {
  acting_as: DebtorActingAs;
  addresses: Address[];
  your_reference?: string | null;
  person?: DebtorPerson;
  organization?: DebtorOrganization;
  communication_channels?: CommunicationChannel[];
  bank_accounts?: BankAccount[];
  metadata?: Metadata[];
  events?: Event[];
}

/**
 * Parameters for listing debtors
 */
export interface ListDebtorsParams {
  acting_as?: string;
  id?: string;
  limit?: number;
  offset?: number;
  your_reference?: string;
}

/**
 * Debtor list response
 */
export type DebtorListResponse = PaginatedResponse<Debtor>;

// ==================== Mandates ====================

/**
 * Mandate legal stage
 */
export type MandateLegalStage = 
  | 'extrajudicial' 
  | 'judicial_dunning' 
  | 'foreclosure' 
  | 'long_term_monitoring' 
  | 'ended';

/**
 * Mandate processing state
 */
export type MandateProcessingState = 
  | 'in_progress' 
  | 'paused' 
  | 'canceled_by_client' 
  | 'canceled_by_service_provider' 
  | 'ended';

/**
 * Mandate payment state
 */
export type MandatePaymentState = 'unpaid' | 'partially_paid' | 'fully_paid';

/**
 * Legal claim balance
 */
export interface LegalClaimBalance {
  balance_of_costs_interest_bearing: Amount;
  balance_of_costs_interest_free: Amount;
  balance_of_interest_on_costs: Amount;
  balance_of_interest_on_principal_claim: Amount;
  balance_of_principal_claim: Amount;
  total_balance: Amount;
  legal_claim_of_costs_interest_bearing: Amount;
  legal_claim_of_costs_interest_free: Amount;
  legal_claim_of_interest_on_costs: Amount;
  legal_claim_of_interest_on_principal_claim: Amount;
  legal_claim_of_principal_claim: Amount;
  total_legal_claim: Amount;
  payment_on_costs_interest_bearing: Amount;
  payment_on_costs_interest_free: Amount;
  payment_on_interest_on_costs: Amount;
  payment_on_interest_on_principal_claim: Amount;
  payment_on_principal_claim: Amount;
  total_payment: Amount;
  updated: string;
}

/**
 * Download attachment for status update
 */
export interface StatusUpdateDownload {
  id: string;
  filename: string;
  mime_type: string;
  file_size: number;
  download_url: string;
}

/**
 * Status update object
 */
export interface StatusUpdate {
  id?: string;
  title: string;
  description?: string | null;
  legal_stage: MandateLegalStage;
  processing_state: MandateProcessingState;
  created: string;
  downloads: StatusUpdateDownload[];
}

/**
 * Request to client summary item
 */
export interface RequestToClientSummaryItem {
  id: string;
  href: string;
  title: string;
  description_short?: string;
  answered: boolean;
  allowed_answer_types: string;
  created: string;
  answered_at?: string | null;
}

/**
 * Requests to client summary
 */
export interface RequestsToClientSummary {
  total_count: string;
  unanswered_count: string;
  has_pending: string;
  items: RequestToClientSummaryItem[];
}

/**
 * Mandate claim reference
 */
export interface MandateClaimReference {
  href: string;
  id: string;
  payments?: { href: string; id: string }[];
}

/**
 * Mandate debtor info
 */
export interface MandateDebtor {
  name: string;
}

/**
 * Full mandate object
 */
export interface Mandate {
  href: string;
  id?: string;
  debtor: MandateDebtor;
  legal_stage: MandateLegalStage;
  processing_state: MandateProcessingState;
  payment_state: MandatePaymentState;
  legal_claim_balance: LegalClaimBalance;
  total_mandate_amount: Amount;
  status_updates: StatusUpdate[];
  requests_to_client_summary: RequestsToClientSummary;
  archived: boolean;
  created: string;
  reference_number?: string;
  further_reference_numbers?: string[];
  claims?: MandateClaimReference[];
}

/**
 * Parameters for listing mandates
 */
export interface ListMandatesParams {
  archived?: boolean;
  debtor?: string;
  debtor_organization_name?: string;
  debtor_person_first_name?: string;
  debtor_person_last_name?: string;
  debtor_your_reference?: string;
  legal_stage?: string;
  limit?: number;
  offset?: number;
  payment_state?: string;
  processing_state?: string;
  reference_number?: string;
}

/**
 * Mandate list response
 */
export type MandateListResponse = PaginatedResponse<Mandate>;

// ==================== Requests to Client ====================

/**
 * Allowed answer types for request to client
 */
export type AllowedAnswerType = 
  | 'yes-no' 
  | 'yes-no-dontknow' 
  | 'fileupload' 
  | 'yes-no-freetext-on-no' 
  | 'yes-with-date-no-freetext-on-no' 
  | 'dynamic-form';

/**
 * File attachment in request
 */
export interface RequestFileAttachment {
  id: string;
  filename: string;
  mime_type: string;
  file_size: number;
  download_url?: string;
}

/**
 * Answer file
 */
export interface AnswerFile {
  id: string;
  filename: string;
  mime_type: string;
  file_size: number;
}

/**
 * Answer object
 */
export interface RequestAnswer {
  id: string;
  text?: string | null;
  additional_comment?: string | null;
  files?: AnswerFile[];
  created: string;
}

/**
 * Mandate reference in request
 */
export interface RequestMandate {
  id: string;
  href: string;
  reference_number: string;
}

/**
 * Full request to client object
 */
export interface RequestToClient {
  id: string;
  href: string;
  mandate: RequestMandate;
  title: string;
  description?: string | null;
  allowed_answer_types: AllowedAnswerType;
  file_attachments: RequestFileAttachment[];
  answered: boolean;
  answer?: RequestAnswer | null;
  created: string;
  answered_at?: string | null;
}

/**
 * Parameters for listing requests to client
 */
export interface ListRequestsToClientParams {
  answered?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * Parameters for submitting request answer
 */
export interface SubmitRequestAnswerParams {
  text?: string | null;
  additional_comment?: string | null;
}

/**
 * Request to client list response
 */
export type RequestToClientListResponse = PaginatedResponse<RequestToClient>;

// ==================== Payments ====================

/**
 * Full payment object
 */
export interface Payment {
  href: string;
  id?: string;
  claim: string;
  amount: Amount;
  value_date: string;
  created: string;
  your_reference?: string | null;
  metadata?: Metadata[];
}

/**
 * Parameters for creating a payment
 */
export interface CreatePaymentParams {
  claim: string;
  amount: Amount;
  value_date: string;
  your_reference?: string | null;
  metadata?: Metadata[];
}

/**
 * Parameters for listing payments
 */
export interface ListPaymentsParams {
  limit?: number;
  offset?: number;
}

/**
 * Payment list response
 */
export type PaymentListResponse = PaginatedResponse<Payment>;

// ==================== Statements ====================

/**
 * Statement download
 */
export interface StatementDownload {
  id: string;
  type: 'full_pdf' | 'third_party_money_xlsx' | 'cost_burden_xlsx' | 'closing_xlsx';
  filename: string;
  mime_type: string;
  file_size: number;
  download_url: string;
}

/**
 * Claims from payments (VAT specific)
 */
export interface ClaimsFromPayments {
  taxfree_expenses_claims: Amount;
  taxable_expenses_claims: Amount;
  taxable_expenses_vat_claims: Amount;
  fee_claims: Amount;
  fee_vat_claims: Amount;
  success_commission_claims: Amount;
  success_commission_vat_claims: Amount;
}

/**
 * Claims from advanced costs (VAT specific)
 */
export interface ClaimsFromAdvancedCosts {
  taxfree_expenses_claims: Amount;
  taxable_expenses_claims: Amount;
  taxable_expenses_vat_claims: Amount;
  fee_claims: Amount;
  fee_vat_claims: Amount;
  taxfree_litigation_expenses_claims: Amount;
  taxable_litigation_expenses_claims: Amount;
  taxable_litigation_expenses_vat_claims: Amount;
}

/**
 * VAT specific overview
 */
export interface OverviewVatSpecific {
  vat_rate: string;
  claims_from_payments_to_dca: ClaimsFromPayments;
  claims_from_payments_to_client: ClaimsFromPayments;
  claims_from_advanced_costs: ClaimsFromAdvancedCosts;
  vat: Amount;
  invoice_amount: Amount;
  invoice_amount_vat: Amount;
  payout: Amount;
}

/**
 * Full statement object
 */
export interface Statement {
  href: string;
  id?: string;
  clearing_no: string;
  invoice_no: string;
  booking_date: string;
  period_start: string;
  period_end: string;
  canceled: boolean;
  comment: string;
  total_balance: Amount;
  balance_pre_outstanding_items_offsetting: Amount;
  offset_outstanding_items: Amount;
  mandate_count: number;
  mandate_details_href: string;
  overview_vat_specific: OverviewVatSpecific[];
  downloads: StatementDownload[];
  created: string;
}

/**
 * Parameters for listing statements
 */
export interface ListStatementsParams {
  booking_date?: string;
  clearing_no?: string;
  id?: string;
  invoice_no?: string;
  limit?: number;
  mandate_reference_number?: string;
  offset?: number;
  period_end?: string;
  period_start?: string;
}

/**
 * Statement list response
 */
export type StatementListResponse = PaginatedResponse<Statement>;

// ==================== Mandate Details for Statement ====================

/**
 * Closing information
 */
export interface MandateClosing {
  closing_date: string;
  closing_code: string;
  closing_description: string;
  closing_type: string;
  accepted_main_claim_amount: Amount;
  remaining_main_claim_amount: Amount;
}

/**
 * Payments allocation
 */
export interface PaymentsAllocation {
  total_payments: Amount;
  allocation_to_fee: Amount;
  allocation_to_fee_vat: Amount;
  allocation_to_main_claim: Amount;
  allocation_to_default_interest: Amount;
  allocation_to_success_commission: Amount;
  allocation_to_success_commission_vat: Amount;
  payout: Amount;
}

/**
 * Extraordinary payouts
 */
export interface ExtraordinaryPayouts {
  total_payments: Amount;
  allocation_to_main_claim: Amount;
  payout: Amount;
}

/**
 * Third party money
 */
export interface ThirdPartyMoney {
  vat_rate: string;
  total_payments: Amount;
  payments_to_dca: PaymentsAllocation;
  payments_to_client: Omit<PaymentsAllocation, 'allocation_to_fee' | 'allocation_to_fee_vat' | 'allocation_to_default_interest'>;
  extraordinary_payouts_to_client: ExtraordinaryPayouts;
}

/**
 * Third party money entry
 */
export interface ThirdPartyMoneyEntry {
  vat_rate: string;
  third_party_money: ThirdPartyMoney;
}

/**
 * Cost burden
 */
export interface CostBurden {
  vat_rate: string;
  fee: Amount;
  fee_vat: Amount;
  total_amount: Amount;
}

/**
 * Cost burden entry
 */
export interface CostBurdenEntry {
  vat_rate: string;
  cost_burden: CostBurden;
}

/**
 * Mandate detail for statement
 */
export interface MandateDetail {
  reference_number: string;
  mandate: {
    href: string;
    id: string;
    reference_number: string;
  };
  closing?: MandateClosing;
  third_party_money_entries: ThirdPartyMoneyEntry[];
  cost_burden_entries: CostBurdenEntry[];
}

/**
 * Parameters for listing mandate details
 */
export interface ListMandateDetailsParams {
  limit?: number;
  offset?: number;
  reference_number?: string;
  your_reference?: string;
}

/**
 * Mandate details list response
 */
export type MandateDetailsListResponse = PaginatedResponse<MandateDetail>;

// ==================== User Info ====================

/**
 * User info object
 */
export interface UserInfo {
  id: string;
  token_name: string;
  user: string;
  user_first_name: string;
  user_last_name: string;
  access_mode: string;
}
