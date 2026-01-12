/**
 * Tests for Partner API Client
 * Uses mock responses based on docs.paywise.de
 */

import { PartnerApiClient } from '../src/partner-api/client';
import { HttpClient } from '../src/http-client';
import {
  mockCompany,
  mockCompanyListResponse,
  mockUser,
  mockUserListResponse,
  mockUserInvite,
} from './mocks/partner-api.mock';
import {
  mockNotFoundError,
  mockRateLimitError,
} from './mocks/errors.mock';

// Mock the HttpClient
jest.mock('../src/http-client');

describe('PartnerApiClient', () => {
  let client: PartnerApiClient;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttpClient = new HttpClient({
      baseUrl: 'https://api.paywise.de',
      apiKey: 'test-api-key',
    }) as jest.Mocked<HttpClient>;

    client = new PartnerApiClient(mockHttpClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ==================== Companies ====================

  describe('Companies', () => {
    describe('listCompanies', () => {
      it('should return paginated companies list', async () => {
        mockHttpClient.get = jest.fn().mockResolvedValue({
          data: mockCompanyListResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
        });

        const result = await client.listCompanies({ limit: 10 });

        expect(mockHttpClient.get).toHaveBeenCalledWith(
          '/companies/',
          { limit: 10 }
        );
        expect(result.count).toBe(1);
        expect(result.results[0].name).toBe('MVNet Solutions UG');
      });
    });

    describe('getCompany', () => {
      it('should return a single company', async () => {
        mockHttpClient.get = jest.fn().mockResolvedValue({
          data: mockCompany,
          status: 200,
          statusText: 'OK',
          headers: {},
        });

        const result = await client.getCompany('company-123');

        expect(mockHttpClient.get).toHaveBeenCalledWith('/companies/company-123/');
        expect(result.name).toBe('MVNet Solutions UG');
        expect(result.legal_form).toBe('UG (haftungsbeschränkt)');
      });

      it('should throw on company not found', async () => {
        mockHttpClient.get = jest.fn().mockRejectedValue(mockNotFoundError.body);

        await expect(client.getCompany('invalid-id')).rejects.toMatchObject({
          error: 'Not Found',
        });
      });
    });

    describe('createCompany', () => {
      it('should create a new company', async () => {
        mockHttpClient.post = jest.fn().mockResolvedValue({
          data: mockCompany,
          status: 201,
          statusText: 'Created',
          headers: {},
        });

        const params = {
          name: 'MVNet Solutions UG',
          legal_form: 'UG (haftungsbeschränkt)',
          vat_id: 'DE123456789',
          address: {
            street: 'Techstraße 42',
            zip: '10115',
            city: 'Berlin',
            country: 'DE',
          },
        };

        const result = await client.createCompany(params);

        expect(mockHttpClient.post).toHaveBeenCalledWith(
          '/companies/',
          params
        );
        expect(result.id).toBe(mockCompany.id);
      });
    });

    describe('updateCompany', () => {
      it('should update an existing company', async () => {
        const updatedCompany = { ...mockCompany, name: 'MVNet Solutions GmbH' };
        mockHttpClient.patch = jest.fn().mockResolvedValue({
          data: updatedCompany,
          status: 200,
          statusText: 'OK',
          headers: {},
        });

        const result = await client.updateCompany('company-123', {
          name: 'MVNet Solutions GmbH',
        });

        expect(mockHttpClient.patch).toHaveBeenCalledWith(
          '/companies/company-123/',
          { name: 'MVNet Solutions GmbH' }
        );
        expect(result.name).toBe('MVNet Solutions GmbH');
      });
    });
  });

  // ==================== Users ====================

  describe('Users', () => {
    describe('listUsers', () => {
      it('should return paginated users list', async () => {
        mockHttpClient.get = jest.fn().mockResolvedValue({
          data: mockUserListResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
        });

        const result = await client.listUsers({ limit: 20 });

        expect(mockHttpClient.get).toHaveBeenCalledWith('/users/', { limit: 20 });
        expect(result.count).toBe(1);
        expect(result.results[0].role).toBe('admin');
      });
    });

    describe('getUser', () => {
      it('should return a single user', async () => {
        mockHttpClient.get = jest.fn().mockResolvedValue({
          data: mockUser,
          status: 200,
          statusText: 'OK',
          headers: {},
        });

        const result = await client.getUser('user-123');

        expect(mockHttpClient.get).toHaveBeenCalledWith('/users/user-123/');
        expect(result.email).toBe('admin@mvnet-solutions.de');
        expect(result.status).toBe('active');
      });
    });

    describe('createUser', () => {
      it('should create a new user', async () => {
        mockHttpClient.post = jest.fn().mockResolvedValue({
          data: mockUser,
          status: 201,
          statusText: 'Created',
          headers: {},
        });

        const params = {
          email: 'admin@mvnet-solutions.de',
          first_name: 'Max',
          last_name: 'Mustermann',
          company: '/partner/v1/companies/company-123',
          role: 'admin' as const,
        };

        const result = await client.createUser(params);

        expect(mockHttpClient.post).toHaveBeenCalledWith('/users/', params);
        expect(result.id).toBe(mockUser.id);
      });
    });
  });

  // ==================== User Invites ====================

  describe('User Invites', () => {
    describe('createUserInvite', () => {
      it('should create a new user invite with invite URL', async () => {
        mockHttpClient.post = jest.fn().mockResolvedValue({
          data: mockUserInvite,
          status: 201,
          statusText: 'Created',
          headers: {},
        });

        const params = {
          email: 'newuser@mvnet-solutions.de',
          first_name: 'New',
          last_name: 'User',
          company: '/partner/v1/companies/company-123',
          role: 'user' as const,
        };

        const result = await client.createUserInvite(params);

        expect(mockHttpClient.post).toHaveBeenCalledWith('/userinvites/', params);
        expect(result.invite_url).toBe('https://app.paywise.de/invite/abc123def456');
        expect(result.status).toBe('pending');
      });
    });

    describe('getUserInvite', () => {
      it('should return invite details', async () => {
        mockHttpClient.get = jest.fn().mockResolvedValue({
          data: mockUserInvite,
          status: 200,
          statusText: 'OK',
          headers: {},
        });

        const result = await client.getUserInvite('invite-123');

        expect(mockHttpClient.get).toHaveBeenCalledWith('/userinvites/invite-123/');
        expect(result.expires_at).toBe('2024-02-01T00:00:00Z');
      });
    });
  });

  // ==================== Error Handling ====================

  describe('Error Handling', () => {
    it('should handle 429 rate limit errors', async () => {
      mockHttpClient.get = jest.fn().mockRejectedValue(mockRateLimitError.body);

      await expect(client.listCompanies()).rejects.toMatchObject({
        code: 'RATE_LIMIT_EXCEEDED',
      });
    });

    it('should handle 404 not found errors', async () => {
      mockHttpClient.get = jest.fn().mockRejectedValue(mockNotFoundError.body);

      await expect(client.getUser('nonexistent')).rejects.toMatchObject({
        error: 'Not Found',
      });
    });
  });
});
