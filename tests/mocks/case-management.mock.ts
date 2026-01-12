/**
 * Mock API responses for Case Management API
 * Based on: https://docs.paywise.de/api-docs/case-management-api/
 */

import type {
  Claim,
  ClaimListResponse,
  Debtor,
  DebtorListResponse,
  Mandate,
  MandateListResponse,
  Payment,
  PaymentListResponse,
  Statement,
  StatementListResponse,
  RequestToClient,
  RequestToClientListResponse,
  UserInfo,
  Amount,
} from '../../src/case-management/types';

// ==================== Amounts ====================

export const mockAmount: Amount = {
  value: '1500.00',
  currency: 'EUR',
};

// ==================== Claims ====================

export const mockClaim: Claim = {
  id: 'claim-12345678-1234-1234-1234-123456789012',
  href: '/v1/claims/claim-12345678-1234-1234-1234-123456789012',
  debtor: '/v1/debtors/debtor-87654321-4321-4321-4321-210987654321',
  mandate: {
    href: '/v1/mandates/mandate-11111111-1111-1111-1111-111111111111',
    id: 'mandate-11111111-1111-1111-1111-111111111111',
    reference_number: 'M-2024-001',
  },
  your_reference: 'INV-2024-001',
  subject_matter: 'Service Invoice January 2024',
  occurence_date: '2024-01-15',
  document_reference: 'INV-2024-001',
  document_date: '2024-01-15',
  due_date: '2024-02-15',
  reminder_date: '2024-02-20',
  delay_date: '2024-03-01',
  total_claim_amount: mockAmount,
  main_claim_amount: mockAmount,
  submission_state: 'created',
  starting_approach: 'extrajudicial',
  claim_disputed: false,
  obligation_fulfilled: false,
  documents: [],
  created: '2024-01-15T10:00:00Z',
  updated: '2024-01-15T10:00:00Z',
  items: [],
  additional_charges: [],
  payments: [],
  metadata: [],
  events: [],
};

export const mockClaimListResponse: ClaimListResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [mockClaim],
};

// ==================== Debtors ====================

export const mockDebtor: Debtor = {
  id: 'debtor-87654321-4321-4321-4321-210987654321',
  href: '/v1/debtors/debtor-87654321-4321-4321-4321-210987654321',
  acting_as: 'consumer',
  your_reference: 'CUSTOMER-001',
  addresses: [
    {
      street: 'Musterstraße 123',
      zip: '10115',
      city: 'Berlin',
      country: 'DE',
    },
  ],
  person: {
    first_name: 'Max',
    last_name: 'Mustermann',
    salutation: 'Herr',
    birth_date: '1990-01-15',
  },
  communication_channels: [
    {
      type: 'email',
      value: 'max.mustermann@example.com',
    },
  ],
  bank_accounts: [],
  metadata: [],
  events: [],
  created: '2024-01-10T08:00:00Z',
  updated: '2024-01-10T08:00:00Z',
};

export const mockDebtorListResponse: DebtorListResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [mockDebtor],
};

// ==================== Mandates ====================

export const mockMandate: Mandate = {
  id: 'mandate-11111111-1111-1111-1111-111111111111',
  href: '/v1/mandates/mandate-11111111-1111-1111-1111-111111111111',
  debtor: {
    name: 'Max Mustermann',
  },
  legal_stage: 'extrajudicial',
  processing_state: 'in_progress',
  payment_state: 'unpaid',
  legal_claim_balance: {
    balance_of_costs_interest_bearing: { value: '0.00', currency: 'EUR' },
    balance_of_costs_interest_free: { value: '20.00', currency: 'EUR' },
    balance_of_interest_on_costs: { value: '0.00', currency: 'EUR' },
    balance_of_interest_on_principal_claim: { value: '50.00', currency: 'EUR' },
    balance_of_principal_claim: { value: '1500.00', currency: 'EUR' },
    total_balance: { value: '1570.00', currency: 'EUR' },
    legal_claim_of_costs_interest_bearing: { value: '0.00', currency: 'EUR' },
    legal_claim_of_costs_interest_free: { value: '20.00', currency: 'EUR' },
    legal_claim_of_interest_on_costs: { value: '0.00', currency: 'EUR' },
    legal_claim_of_interest_on_principal_claim: { value: '50.00', currency: 'EUR' },
    legal_claim_of_principal_claim: { value: '1500.00', currency: 'EUR' },
    total_legal_claim: { value: '1570.00', currency: 'EUR' },
    payment_on_costs_interest_bearing: { value: '0.00', currency: 'EUR' },
    payment_on_costs_interest_free: { value: '0.00', currency: 'EUR' },
    payment_on_interest_on_costs: { value: '0.00', currency: 'EUR' },
    payment_on_interest_on_principal_claim: { value: '0.00', currency: 'EUR' },
    payment_on_principal_claim: { value: '0.00', currency: 'EUR' },
    total_payment: { value: '0.00', currency: 'EUR' },
    updated: '2024-01-16T10:00:00Z',
  },
  total_mandate_amount: { value: '1570.00', currency: 'EUR' },
  status_updates: [],
  requests_to_client_summary: {
    total_count: '0',
    unanswered_count: '0',
    has_pending: 'false',
    items: [],
  },
  archived: false,
  created: '2024-01-16T10:00:00Z',
  reference_number: 'M-2024-001',
  claims: [
    {
      href: '/v1/claims/claim-12345678-1234-1234-1234-123456789012',
      id: 'claim-12345678-1234-1234-1234-123456789012',
    },
  ],
};

export const mockMandateListResponse: MandateListResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [mockMandate],
};

// ==================== Payments ====================

export const mockPayment: Payment = {
  id: 'payment-22222222-2222-2222-2222-222222222222',
  href: '/v1/payments/payment-22222222-2222-2222-2222-222222222222',
  claim: '/v1/claims/claim-12345678-1234-1234-1234-123456789012',
  amount: {
    value: '500.00',
    currency: 'EUR',
  },
  value_date: '2024-02-01',
  created: '2024-02-01T09:00:00Z',
  your_reference: 'PAY-001',
  metadata: [],
};

export const mockPaymentListResponse: PaymentListResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [mockPayment],
};

// ==================== Statements ====================

export const mockStatement: Statement = {
  id: 'statement-33333333-3333-3333-3333-333333333333',
  href: '/v1/statements/statement-33333333-3333-3333-3333-333333333333',
  clearing_no: 'CLR-2024-001',
  invoice_no: 'INV-2024-001',
  booking_date: '2024-02-15',
  period_start: '2024-01-01',
  period_end: '2024-01-31',
  canceled: false,
  comment: '',
  total_balance: { value: '1500.00', currency: 'EUR' },
  balance_pre_outstanding_items_offsetting: { value: '1500.00', currency: 'EUR' },
  offset_outstanding_items: { value: '0.00', currency: 'EUR' },
  mandate_count: 1,
  mandate_details_href: '/v1/statements/statement-33333333-3333-3333-3333-333333333333/mandate-details',
  overview_vat_specific: [],
  downloads: [],
  created: '2024-02-15T10:00:00Z',
};

export const mockStatementListResponse: StatementListResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [mockStatement],
};

// ==================== Requests to Client ====================

export const mockRequestToClient: RequestToClient = {
  id: 'request-44444444-4444-4444-4444-444444444444',
  href: '/v1/requests-to-client/request-44444444-4444-4444-4444-444444444444',
  mandate: {
    id: 'mandate-11111111-1111-1111-1111-111111111111',
    href: '/v1/mandates/mandate-11111111-1111-1111-1111-111111111111',
    reference_number: 'M-2024-001',
  },
  title: 'Document Request',
  description: 'Please provide the signed contract.',
  allowed_answer_types: 'fileupload',
  file_attachments: [],
  answered: false,
  answer: null,
  created: '2024-02-10T14:00:00Z',
  answered_at: null,
};

export const mockRequestToClientListResponse: RequestToClientListResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [mockRequestToClient],
};

// ==================== User Info ====================

export const mockUserInfo: UserInfo[] = [
  {
    id: 'user-55555555-5555-5555-5555-555555555555',
    token_name: 'production-api-key',
    user: 'admin@company.de',
    user_first_name: 'Admin',
    user_last_name: 'User',
    access_mode: 'read_write',
  },
];
