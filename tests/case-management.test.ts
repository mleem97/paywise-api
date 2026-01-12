/**
 * Tests for Case Management API Client
 * Uses mock responses based on docs.paywise.de
 */

import { CaseManagementClient } from '../src/case-management/client';
import { HttpClient } from '../src/http-client';
import {
  mockClaim,
  mockClaimListResponse,
  mockDebtor,
  mockDebtorListResponse,
  mockMandate,
  mockMandateListResponse,
  mockPayment,
  mockUserInfo,
} from './mocks/case-management.mock';
import {
  mockNotFoundError,
  mockValidationError,
  mockRateLimitError,
  mockReleaseWithoutDocumentError,
} from './mocks/errors.mock';

// Mock the HttpClient
jest.mock('../src/http-client');

describe('CaseManagementClient', () => {
  let client: CaseManagementClient;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttpClient = new HttpClient({
      baseUrl: 'https://api.paywise.de',
      apiKey: 'test-api-key',
    }) as jest.Mocked<HttpClient>;

    client = new CaseManagementClient(mockHttpClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ==================== Claims ====================

  describe('Claims', () => {
    describe('listClaims', () => {
      it('should return paginated claims list', async () => {
        mockHttpClient.get = jest.fn().mockResolvedValue({
          data: mockClaimListResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
        });

        const result = await client.listClaims({ limit: 10 });

        expect(mockHttpClient.get).toHaveBeenCalledWith('/claims', { limit: 10 });
        expect(result.count).toBe(1);
        expect(result.results).toHaveLength(1);
        expect(result.results[0].id).toBe(mockClaim.id);
      });

      it('should handle empty results', async () => {
        mockHttpClient.get = jest.fn().mockResolvedValue({
          data: { count: 0, next: null, previous: null, results: [] },
          status: 200,
          statusText: 'OK',
          headers: {},
        });

        const result = await client.listClaims();

        expect(result.count).toBe(0);
        expect(result.results).toHaveLength(0);
      });
    });

    describe('getClaim', () => {
      it('should return a single claim', async () => {
        mockHttpClient.get = jest.fn().mockResolvedValue({
          data: mockClaim,
          status: 200,
          statusText: 'OK',
          headers: {},
        });

        const result = await client.getClaim('claim-12345');

        expect(mockHttpClient.get).toHaveBeenCalledWith('/claims/claim-12345');
        expect(result.id).toBe(mockClaim.id);
        expect(result.total_claim_amount.value).toBe('1500.00');
      });

      it('should throw on claim not found', async () => {
        mockHttpClient.get = jest.fn().mockRejectedValue(mockNotFoundError.body);

        await expect(client.getClaim('invalid-id')).rejects.toMatchObject({
          error: 'Not Found',
        });
      });
    });

    describe('createClaim', () => {
      it('should create a new claim', async () => {
        mockHttpClient.post = jest.fn().mockResolvedValue({
          data: mockClaim,
          status: 201,
          statusText: 'Created',
          headers: {},
        });

        const params = {
          debtor: '/v1/debtors/debtor-123',
          your_reference: 'INV-001',
          subject_matter: 'Test Invoice',
          occurence_date: '2024-01-01',
          document_reference: 'INV-001',
          document_date: '2024-01-01',
          due_date: '2024-02-01',
          reminder_date: '2024-02-15',
          delay_date: '2024-03-01',
          total_claim_amount: { value: '1500.00', currency: 'EUR' as const },
          main_claim_amount: { value: '1500.00', currency: 'EUR' as const },
          starting_approach: 'extrajudicial' as const,
          claim_disputed: false,
          obligation_fulfilled: false,
        };

        const result = await client.createClaim(params);

        expect(mockHttpClient.post).toHaveBeenCalledWith('/claims', params);
        expect(result.id).toBe(mockClaim.id);
      });

      it('should throw validation error for invalid params', async () => {
        mockHttpClient.post = jest.fn().mockRejectedValue(mockValidationError.body);

        await expect(
          client.createClaim({
            debtor: '',
            your_reference: null,
            subject_matter: null,
            occurence_date: null,
            document_reference: null,
            document_date: null,
            due_date: null,
            reminder_date: null,
            delay_date: null,
            total_claim_amount: { value: '-100', currency: 'EUR' },
            main_claim_amount: { value: '-100', currency: 'EUR' },
            starting_approach: 'extrajudicial',
            claim_disputed: false,
            obligation_fulfilled: false,
          })
        ).rejects.toMatchObject({
          code: 'VALIDATION_ERROR',
        });
      });
    });

    describe('releaseClaim', () => {
      it('should release a claim with documents', async () => {
        const releasedClaim = { ...mockClaim, submission_state: 'released' };
        mockHttpClient.patch = jest.fn().mockResolvedValue({
          data: releasedClaim,
          status: 200,
          statusText: 'OK',
          headers: {},
        });

        const result = await client.releaseClaim('claim-12345');

        expect(mockHttpClient.patch).toHaveBeenCalledWith(
          '/claims/claim-12345/',
          { submission_state: 'released', send_order_confirmation: false }
        );
        expect(result.submission_state).toBe('released');
      });

      it('should throw error when releasing without documents', async () => {
        mockHttpClient.patch = jest.fn().mockRejectedValue(mockReleaseWithoutDocumentError.body);

        await expect(client.releaseClaim('claim-no-docs')).rejects.toMatchObject({
          code: 'DOCUMENT_REQUIRED',
        });
      });
    });
  });

  // ==================== Debtors ====================

  describe('Debtors', () => {
    describe('listDebtors', () => {
      it('should return paginated debtors list', async () => {
        mockHttpClient.get = jest.fn().mockResolvedValue({
          data: mockDebtorListResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
        });

        const result = await client.listDebtors({ limit: 20 });

        expect(mockHttpClient.get).toHaveBeenCalledWith('/debtors', { limit: 20 });
        expect(result.count).toBe(1);
        expect(result.results[0].person?.first_name).toBe('Max');
      });
    });

    describe('createDebtor', () => {
      it('should create a new debtor', async () => {
        mockHttpClient.post = jest.fn().mockResolvedValue({
          data: mockDebtor,
          status: 201,
          statusText: 'Created',
          headers: {},
        });

        const params = {
          acting_as: 'consumer' as const,
          addresses: [{ street: 'Test St', zip: '12345', city: 'Berlin', country: 'DE' }],
          person: { first_name: 'Max', last_name: 'Mustermann' },
        };

        const result = await client.createDebtor(params);

        expect(mockHttpClient.post).toHaveBeenCalledWith('/debtors', params);
        expect(result.id).toBe(mockDebtor.id);
      });
    });
  });

  // ==================== Mandates ====================

  describe('Mandates', () => {
    describe('listMandates', () => {
      it('should return paginated mandates list', async () => {
        mockHttpClient.get = jest.fn().mockResolvedValue({
          data: mockMandateListResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
        });

        const result = await client.listMandates({ limit: 10 });

        expect(mockHttpClient.get).toHaveBeenCalledWith('/mandates', { limit: 10 });
        expect(result.results[0].processing_state).toBe('in_progress');
      });
    });

    describe('getMandate', () => {
      it('should return a single mandate', async () => {
        mockHttpClient.get = jest.fn().mockResolvedValue({
          data: mockMandate,
          status: 200,
          statusText: 'OK',
          headers: {},
        });

        const result = await client.getMandate('mandate-123');

        expect(result.legal_stage).toBe('extrajudicial');
      });
    });
  });

  // ==================== Payments ====================

  describe('Payments', () => {
    describe('createPayment', () => {
      it('should record a payment for a claim', async () => {
        mockHttpClient.post = jest.fn().mockResolvedValue({
          data: mockPayment,
          status: 201,
          statusText: 'Created',
          headers: {},
        });

        const params = {
          claim: '/v1/claims/claim-123',
          amount: { value: '500.00', currency: 'EUR' as const },
          value_date: '2024-02-01',
        };

        const result = await client.createPayment(params);

        expect(mockHttpClient.post).toHaveBeenCalledWith('/payments', params);
        expect(result.amount.value).toBe('500.00');
      });
    });
  });

  // ==================== User Info ====================

  describe('User Info', () => {
    describe('getUserInfo', () => {
      it('should return current user information', async () => {
        mockHttpClient.get = jest.fn().mockResolvedValue({
          data: mockUserInfo,
          status: 200,
          statusText: 'OK',
          headers: {},
        });

        const result = await client.getUserInfo();

        expect(mockHttpClient.get).toHaveBeenCalledWith('/info/');
        expect(result[0].user).toBe('admin@company.de');
      });
    });
  });

  // ==================== Rate Limiting ====================

  describe('Rate Limiting', () => {
    it('should handle 429 rate limit errors', async () => {
      mockHttpClient.get = jest.fn().mockRejectedValue(mockRateLimitError.body);

      await expect(client.listClaims()).rejects.toMatchObject({
        code: 'RATE_LIMIT_EXCEEDED',
      });
    });
  });
});
