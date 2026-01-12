import { HttpClient } from '../http-client';
import {
  Company,
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

  // ==================== Companies ====================

  /**
   * List all companies
   * @param params - Filter and pagination parameters
   */
  async listCompanies(params?: ListCompaniesParams): Promise<CompanyListResponse> {
    const response = await this.httpClient.get<CompanyListResponse>('/companies/', params);
    return response.data;
  }

  /**
   * Create a new company
   * @param params - Company creation parameters
   */
  async createCompany(params: CreateCompanyParams): Promise<Company> {
    const response = await this.httpClient.post<Company>('/companies/', params);
    return response.data;
  }

  /**
   * Get a specific company by ID
   * @param companyId - The company ID
   */
  async getCompany(companyId: string): Promise<Company> {
    const response = await this.httpClient.get<Company>(`/companies/${companyId}/`);
    return response.data;
  }

  /**
   * Update a company
   * @param companyId - The company ID
   * @param params - Company update parameters
   */
  async updateCompany(companyId: string, params: UpdateCompanyParams): Promise<Company> {
    const response = await this.httpClient.patch<Company>(`/companies/${companyId}/`, params);
    return response.data;
  }

  // ==================== Users ====================

  /**
   * List all users
   * @param params - Filter and pagination parameters
   */
  async listUsers(params?: ListUsersParams): Promise<UserListResponse> {
    const response = await this.httpClient.get<UserListResponse>('/users/', params);
    return response.data;
  }

  /**
   * Create a new user
   * @param params - User creation parameters
   */
  async createUser(params: CreateUserParams): Promise<User> {
    const response = await this.httpClient.post<User>('/users/', params);
    return response.data;
  }

  /**
   * Get a specific user by ID
   * @param userId - The user ID
   */
  async getUser(userId: string): Promise<User> {
    const response = await this.httpClient.get<User>(`/users/${userId}/`);
    return response.data;
  }

  // ==================== User Invites ====================

  /**
   * Create a user invite
   * @param params - User invite creation parameters
   */
  async createUserInvite(params: CreateUserInviteParams): Promise<UserInvite> {
    const response = await this.httpClient.post<UserInvite>('/userinvites/', params);
    return response.data;
  }

  /**
   * Get a specific user invite by ID
   * @param inviteId - The user invite ID
   */
  async getUserInvite(inviteId: string): Promise<UserInvite> {
    const response = await this.httpClient.get<UserInvite>(`/userinvites/${inviteId}/`);
    return response.data;
  }

  /**
   * Get onboarded user information from an invite
   * @param inviteId - The user invite ID
   */
  async getOnboardedUser(inviteId: string): Promise<OnboardedUser> {
    const response = await this.httpClient.get<OnboardedUser>(`/userinvites/${inviteId}/get-onboarded-user/`);
    return response.data;
  }

  // ==================== Info ====================

  /**
   * Get partner info
   */
  async getInfo(): Promise<PartnerInfo[]> {
    const response = await this.httpClient.get<PartnerInfo[]>('/info/');
    return response.data;
  }
}
