import { HttpClient } from '../http-client';
import {
  Partner,
  PartnerListResponse,
  CreatePartnerParams,
  UpdatePartnerParams,
  ListPartnersParams,
  PartnerTransaction,
  PartnerTransactionListResponse,
  CreatePartnerTransactionParams,
  PartnerAnalytics,
  PartnerAnalyticsParams,
  PartnerApiKey,
  PartnerApiKeyListResponse,
  CreatePartnerApiKeyParams,
} from './types';

/**
 * Partner API Client
 * 
 * Provides methods to interact with Paywise Partner API
 */
export class PartnerApiClient {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * List all partners
   * @param params - Filter and pagination parameters
   */
  async listPartners(params?: ListPartnersParams): Promise<PartnerListResponse> {
    const response = await this.httpClient.get<PartnerListResponse>('/partners', params);
    return response.data;
  }

  /**
   * Get a specific partner by ID
   * @param partnerId - The partner ID
   */
  async getPartner(partnerId: string): Promise<Partner> {
    const response = await this.httpClient.get<Partner>(`/partners/${partnerId}`);
    return response.data;
  }

  /**
   * Create a new partner
   * @param params - Partner creation parameters
   */
  async createPartner(params: CreatePartnerParams): Promise<Partner> {
    const response = await this.httpClient.post<Partner>('/partners', params);
    return response.data;
  }

  /**
   * Update an existing partner
   * @param partnerId - The partner ID
   * @param params - Partner update parameters
   */
  async updatePartner(partnerId: string, params: UpdatePartnerParams): Promise<Partner> {
    const response = await this.httpClient.patch<Partner>(`/partners/${partnerId}`, params);
    return response.data;
  }

  /**
   * Delete a partner
   * @param partnerId - The partner ID
   */
  async deletePartner(partnerId: string): Promise<void> {
    await this.httpClient.delete(`/partners/${partnerId}`);
  }

  /**
   * Activate a partner
   * @param partnerId - The partner ID
   */
  async activatePartner(partnerId: string): Promise<Partner> {
    const response = await this.httpClient.post<Partner>(`/partners/${partnerId}/activate`);
    return response.data;
  }

  /**
   * Deactivate a partner
   * @param partnerId - The partner ID
   */
  async deactivatePartner(partnerId: string): Promise<Partner> {
    const response = await this.httpClient.post<Partner>(`/partners/${partnerId}/deactivate`);
    return response.data;
  }

  /**
   * Suspend a partner
   * @param partnerId - The partner ID
   */
  async suspendPartner(partnerId: string): Promise<Partner> {
    const response = await this.httpClient.post<Partner>(`/partners/${partnerId}/suspend`);
    return response.data;
  }

  /**
   * List transactions for a partner
   * @param partnerId - The partner ID
   * @param params - Pagination parameters
   */
  async listPartnerTransactions(
    partnerId: string,
    params?: { page?: number; limit?: number; status?: string }
  ): Promise<PartnerTransactionListResponse> {
    const response = await this.httpClient.get<PartnerTransactionListResponse>(
      `/partners/${partnerId}/transactions`,
      params
    );
    return response.data;
  }

  /**
   * Get a specific transaction
   * @param partnerId - The partner ID
   * @param transactionId - The transaction ID
   */
  async getPartnerTransaction(partnerId: string, transactionId: string): Promise<PartnerTransaction> {
    const response = await this.httpClient.get<PartnerTransaction>(
      `/partners/${partnerId}/transactions/${transactionId}`
    );
    return response.data;
  }

  /**
   * Create a transaction for a partner
   * @param partnerId - The partner ID
   * @param params - Transaction parameters
   */
  async createPartnerTransaction(
    partnerId: string,
    params: CreatePartnerTransactionParams
  ): Promise<PartnerTransaction> {
    const response = await this.httpClient.post<PartnerTransaction>(
      `/partners/${partnerId}/transactions`,
      params
    );
    return response.data;
  }

  /**
   * Get analytics for a partner
   * @param partnerId - The partner ID
   * @param params - Analytics query parameters
   */
  async getPartnerAnalytics(partnerId: string, params?: PartnerAnalyticsParams): Promise<PartnerAnalytics> {
    const response = await this.httpClient.get<PartnerAnalytics>(
      `/partners/${partnerId}/analytics`,
      params
    );
    return response.data;
  }

  /**
   * List API keys for a partner
   * @param partnerId - The partner ID
   */
  async listPartnerApiKeys(partnerId: string): Promise<PartnerApiKeyListResponse> {
    const response = await this.httpClient.get<PartnerApiKeyListResponse>(
      `/partners/${partnerId}/api-keys`
    );
    return response.data;
  }

  /**
   * Create an API key for a partner
   * @param partnerId - The partner ID
   * @param params - API key parameters
   */
  async createPartnerApiKey(partnerId: string, params?: CreatePartnerApiKeyParams): Promise<PartnerApiKey> {
    const response = await this.httpClient.post<PartnerApiKey>(
      `/partners/${partnerId}/api-keys`,
      params
    );
    return response.data;
  }

  /**
   * Revoke an API key
   * @param partnerId - The partner ID
   * @param apiKeyId - The API key ID
   */
  async revokePartnerApiKey(partnerId: string, apiKeyId: string): Promise<void> {
    await this.httpClient.delete(`/partners/${partnerId}/api-keys/${apiKeyId}`);
  }

  /**
   * Regenerate partner's primary API key
   * @param partnerId - The partner ID
   */
  async regeneratePartnerApiKey(partnerId: string): Promise<Partner> {
    const response = await this.httpClient.post<Partner>(`/partners/${partnerId}/regenerate-key`);
    return response.data;
  }
}
