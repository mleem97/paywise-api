import { HttpClient } from '../http-client';
import {
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
} from './types';

/**
 * Case Management API Client
 * 
 * Provides methods to interact with Paywise Case Management API
 */
export class CaseManagementClient {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  // ==================== Claims ====================

  /**
   * List all claims
   * @param params - Filter and pagination parameters
   */
  async listClaims(params?: ListClaimsParams): Promise<ClaimListResponse> {
    const response = await this.httpClient.get<ClaimListResponse>('/claims', params);
    return response.data;
  }

  /**
   * Create a new claim
   * @param params - Claim creation parameters
   */
  async createClaim(params: CreateClaimParams): Promise<Claim> {
    const response = await this.httpClient.post<Claim>('/claims', params);
    return response.data;
  }

  /**
   * Retrieve a specific claim by ID
   * @param claimId - The claim ID
   */
  async getClaim(claimId: string): Promise<Claim> {
    const response = await this.httpClient.get<Claim>(`/claims/${claimId}`);
    return response.data;
  }

  /**
   * Delete an unreleased claim
   * @param claimId - The claim ID
   */
  async deleteClaim(claimId: string): Promise<void> {
    await this.httpClient.delete(`/claims/${claimId}`);
  }

  /**
   * Release a claim for processing
   * @param claimId - The claim ID
   */
  async releaseClaim(claimId: string): Promise<Claim> {
    const response = await this.httpClient.post<Claim>(`/claims/${claimId}/release`);
    return response.data;
  }

  /**
   * Upload a document to a claim
   * @param claimId - The claim ID
   * @param file - File data (File, Blob, or FormData)
   */
  async uploadClaimDocument(claimId: string, file: File | Blob | FormData): Promise<any> {
    const response = await this.httpClient.post<any>(
      `/claims/${claimId}/documents`,
      file,
      { 'Content-Type': 'multipart/form-data' }
    );
    return response.data;
  }

  // ==================== Debtors ====================

  /**
   * List all debtors
   * @param params - Filter and pagination parameters
   */
  async listDebtors(params?: ListDebtorsParams): Promise<DebtorListResponse> {
    const response = await this.httpClient.get<DebtorListResponse>('/debtors', params);
    return response.data;
  }

  /**
   * Create a new debtor
   * @param params - Debtor creation parameters
   */
  async createDebtor(params: CreateDebtorParams): Promise<Debtor> {
    const response = await this.httpClient.post<Debtor>('/debtors', params);
    return response.data;
  }

  /**
   * Retrieve a specific debtor by ID
   * @param debtorId - The debtor ID
   */
  async getDebtor(debtorId: string): Promise<Debtor> {
    const response = await this.httpClient.get<Debtor>(`/debtors/${debtorId}`);
    return response.data;
  }

  /**
   * Add an address to a debtor
   * @param debtorId - The debtor ID
   * @param address - Address data
   */
  async addDebtorAddress(debtorId: string, address: Address): Promise<Address> {
    const response = await this.httpClient.post<Address>(`/debtors/${debtorId}/addresses`, address);
    return response.data;
  }

  /**
   * Add a bank account to a debtor
   * @param debtorId - The debtor ID
   * @param bankAccount - Bank account data
   */
  async addDebtorBankAccount(debtorId: string, bankAccount: BankAccount): Promise<BankAccount> {
    const response = await this.httpClient.post<BankAccount>(`/debtors/${debtorId}/bank-accounts`, bankAccount);
    return response.data;
  }

  /**
   * Add a communication channel to a debtor
   * @param debtorId - The debtor ID
   * @param channel - Communication channel data
   */
  async addDebtorCommunicationChannel(debtorId: string, channel: CommunicationChannel): Promise<CommunicationChannel> {
    const response = await this.httpClient.post<CommunicationChannel>(
      `/debtors/${debtorId}/communication-channels`,
      channel
    );
    return response.data;
  }

  // ==================== Mandates ====================

  /**
   * List all mandates
   * @param params - Filter and pagination parameters
   */
  async listMandates(params?: ListMandatesParams): Promise<MandateListResponse> {
    const response = await this.httpClient.get<MandateListResponse>('/mandates', params);
    return response.data;
  }

  /**
   * Retrieve a specific mandate by ID
   * @param mandateId - The mandate ID
   */
  async getMandate(mandateId: string): Promise<Mandate> {
    const response = await this.httpClient.get<Mandate>(`/mandates/${mandateId}`);
    return response.data;
  }

  /**
   * Archive a mandate
   * @param mandateId - The mandate ID
   */
  async archiveMandate(mandateId: string): Promise<Mandate> {
    const response = await this.httpClient.post<Mandate>(`/mandates/${mandateId}/archive`);
    return response.data;
  }

  /**
   * List status updates for a mandate
   * @param mandateId - The mandate ID
   * @param params - Pagination parameters
   */
  async listMandateStatusUpdates(mandateId: string, params?: { limit?: number; offset?: number }): Promise<StatusUpdateListResponse> {
    const response = await this.httpClient.get<StatusUpdateListResponse>(
      `/mandates/${mandateId}/status-updates`,
      params
    );
    return response.data;
  }

  /**
   * List requests to client for a mandate
   * @param mandateId - The mandate ID
   * @param params - Pagination parameters
   */
  async listMandateRequests(mandateId: string, params?: { limit?: number; offset?: number }): Promise<RequestToClientListResponse> {
    const response = await this.httpClient.get<RequestToClientListResponse>(
      `/mandates/${mandateId}/requests`,
      params
    );
    return response.data;
  }

  /**
   * Get request to client details
   * @param mandateId - The mandate ID
   * @param requestId - The request ID
   */
  async getMandateRequest(mandateId: string, requestId: string): Promise<RequestToClient> {
    const response = await this.httpClient.get<RequestToClient>(
      `/mandates/${mandateId}/requests/${requestId}`
    );
    return response.data;
  }

  /**
   * Submit an answer to a request to client
   * @param mandateId - The mandate ID
   * @param requestId - The request ID
   * @param params - Answer parameters
   */
  async submitMandateRequestAnswer(
    mandateId: string,
    requestId: string,
    params: SubmitRequestAnswerParams
  ): Promise<RequestToClient> {
    const response = await this.httpClient.post<RequestToClient>(
      `/mandates/${mandateId}/requests/${requestId}/answer`,
      params
    );
    return response.data;
  }

  /**
   * Upload a document to a request to client answer
   * @param mandateId - The mandate ID
   * @param requestId - The request ID
   * @param file - File data (File, Blob, or FormData)
   */
  async uploadMandateRequestDocument(
    mandateId: string,
    requestId: string,
    file: File | Blob | FormData
  ): Promise<any> {
    const response = await this.httpClient.post<any>(
      `/mandates/${mandateId}/requests/${requestId}/documents`,
      file,
      { 'Content-Type': 'multipart/form-data' }
    );
    return response.data;
  }

  // ==================== Payments ====================

  /**
   * List all payments
   * @param params - Filter and pagination parameters
   */
  async listPayments(params?: ListPaymentsParams): Promise<PaymentListResponse> {
    const response = await this.httpClient.get<PaymentListResponse>('/payments', params);
    return response.data;
  }

  /**
   * Create a new payment
   * @param params - Payment creation parameters
   */
  async createPayment(params: CreatePaymentParams): Promise<Payment> {
    const response = await this.httpClient.post<Payment>('/payments', params);
    return response.data;
  }

  /**
   * Retrieve a specific payment by ID
   * @param paymentId - The payment ID
   */
  async getPayment(paymentId: string): Promise<Payment> {
    const response = await this.httpClient.get<Payment>(`/payments/${paymentId}`);
    return response.data;
  }

  // ==================== Statements ====================

  /**
   * List all statements
   * @param params - Filter and pagination parameters
   */
  async listStatements(params?: ListStatementsParams): Promise<StatementListResponse> {
    const response = await this.httpClient.get<StatementListResponse>('/statements', params);
    return response.data;
  }

  /**
   * Retrieve a specific statement by ID
   * @param statementId - The statement ID
   */
  async getStatement(statementId: string): Promise<Statement> {
    const response = await this.httpClient.get<Statement>(`/statements/${statementId}`);
    return response.data;
  }

  /**
   * List mandate details for a statement
   * @param statementId - The statement ID
   * @param params - Pagination parameters
   */
  async listStatementMandateDetails(
    statementId: string,
    params?: { limit?: number; offset?: number }
  ): Promise<MandateDetailsListResponse> {
    const response = await this.httpClient.get<MandateDetailsListResponse>(
      `/statements/${statementId}/mandate-details`,
      params
    );
    return response.data;
  }

  // ==================== Info ====================

  /**
   * Get current user information
   */
  async getUserInfo(): Promise<UserInfo> {
    const response = await this.httpClient.get<UserInfo>('/info/user');
    return response.data;
  }
}
