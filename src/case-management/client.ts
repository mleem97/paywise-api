import { HttpClient } from '../http-client';
import {
  Case,
  CaseListResponse,
  CreateCaseParams,
  UpdateCaseParams,
  ListCasesParams,
  CaseComment,
  CaseCommentsListResponse,
  CreateCaseCommentParams,
  CaseActivity,
  CaseActivitiesListResponse,
  CaseAttachment,
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

  /**
   * List all cases
   * @param params - Filter and pagination parameters
   */
  async listCases(params?: ListCasesParams): Promise<CaseListResponse> {
    const response = await this.httpClient.get<CaseListResponse>('/cases', params);
    return response.data;
  }

  /**
   * Get a specific case by ID
   * @param caseId - The case ID
   */
  async getCase(caseId: string): Promise<Case> {
    const response = await this.httpClient.get<Case>(`/cases/${caseId}`);
    return response.data;
  }

  /**
   * Create a new case
   * @param params - Case creation parameters
   */
  async createCase(params: CreateCaseParams): Promise<Case> {
    const response = await this.httpClient.post<Case>('/cases', params);
    return response.data;
  }

  /**
   * Update an existing case
   * @param caseId - The case ID
   * @param params - Case update parameters
   */
  async updateCase(caseId: string, params: UpdateCaseParams): Promise<Case> {
    const response = await this.httpClient.patch<Case>(`/cases/${caseId}`, params);
    return response.data;
  }

  /**
   * Delete a case
   * @param caseId - The case ID
   */
  async deleteCase(caseId: string): Promise<void> {
    await this.httpClient.delete(`/cases/${caseId}`);
  }

  /**
   * Close a case
   * @param caseId - The case ID
   */
  async closeCase(caseId: string): Promise<Case> {
    const response = await this.httpClient.post<Case>(`/cases/${caseId}/close`);
    return response.data;
  }

  /**
   * Reopen a case
   * @param caseId - The case ID
   */
  async reopenCase(caseId: string): Promise<Case> {
    const response = await this.httpClient.post<Case>(`/cases/${caseId}/reopen`);
    return response.data;
  }

  /**
   * List comments for a case
   * @param caseId - The case ID
   * @param params - Pagination parameters
   */
  async listCaseComments(caseId: string, params?: { page?: number; limit?: number }): Promise<CaseCommentsListResponse> {
    const response = await this.httpClient.get<CaseCommentsListResponse>(`/cases/${caseId}/comments`, params);
    return response.data;
  }

  /**
   * Add a comment to a case
   * @param caseId - The case ID
   * @param params - Comment parameters
   */
  async addCaseComment(caseId: string, params: CreateCaseCommentParams): Promise<CaseComment> {
    const response = await this.httpClient.post<CaseComment>(`/cases/${caseId}/comments`, params);
    return response.data;
  }

  /**
   * Update a case comment
   * @param caseId - The case ID
   * @param commentId - The comment ID
   * @param content - Updated comment content
   */
  async updateCaseComment(caseId: string, commentId: string, content: string): Promise<CaseComment> {
    const response = await this.httpClient.patch<CaseComment>(
      `/cases/${caseId}/comments/${commentId}`,
      { content }
    );
    return response.data;
  }

  /**
   * Delete a case comment
   * @param caseId - The case ID
   * @param commentId - The comment ID
   */
  async deleteCaseComment(caseId: string, commentId: string): Promise<void> {
    await this.httpClient.delete(`/cases/${caseId}/comments/${commentId}`);
  }

  /**
   * List activities/history for a case
   * @param caseId - The case ID
   * @param params - Pagination parameters
   */
  async listCaseActivities(caseId: string, params?: { page?: number; limit?: number }): Promise<CaseActivitiesListResponse> {
    const response = await this.httpClient.get<CaseActivitiesListResponse>(`/cases/${caseId}/activities`, params);
    return response.data;
  }

  /**
   * List attachments for a case
   * @param caseId - The case ID
   */
  async listCaseAttachments(caseId: string): Promise<CaseAttachment[]> {
    const response = await this.httpClient.get<CaseAttachment[]>(`/cases/${caseId}/attachments`);
    return response.data;
  }

  /**
   * Upload an attachment to a case
   * @param caseId - The case ID
   * @param file - File data (File, Blob, or FormData)
   */
  async uploadCaseAttachment(caseId: string, file: File | Blob | FormData): Promise<CaseAttachment> {
    const response = await this.httpClient.post<CaseAttachment>(
      `/cases/${caseId}/attachments`,
      file,
      { 'Content-Type': 'multipart/form-data' }
    );
    return response.data;
  }

  /**
   * Delete a case attachment
   * @param caseId - The case ID
   * @param attachmentId - The attachment ID
   */
  async deleteCaseAttachment(caseId: string, attachmentId: string): Promise<void> {
    await this.httpClient.delete(`/cases/${caseId}/attachments/${attachmentId}`);
  }

  /**
   * Assign a case to a user
   * @param caseId - The case ID
   * @param userId - The user ID to assign to
   */
  async assignCase(caseId: string, userId: string): Promise<Case> {
    const response = await this.httpClient.post<Case>(`/cases/${caseId}/assign`, { assignedTo: userId });
    return response.data;
  }

  /**
   * Unassign a case
   * @param caseId - The case ID
   */
  async unassignCase(caseId: string): Promise<Case> {
    const response = await this.httpClient.post<Case>(`/cases/${caseId}/unassign`);
    return response.data;
  }
}
