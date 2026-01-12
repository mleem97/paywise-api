/**
 * Common types used across Paywise API
 */

/**
 * Configuration options for Paywise API client
 */
export interface PaywiseConfig {
  /**
   * API base URL (e.g., 'https://api.paywise.de')
   */
  baseUrl: string;
  
  /**
   * API key for authentication
   */
  apiKey: string;
  
  /**
   * Optional timeout in milliseconds (default: 30000)
   */
  timeout?: number;
  
  /**
   * Optional custom headers
   */
  headers?: Record<string, string>;
}

/**
 * HTTP method types
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * API Response wrapper
 */
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/**
 * API Error
 */
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

/**
 * Sort parameters
 */
export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Common query parameters
 */
export interface QueryParams extends PaginationParams, SortParams {
  [key: string]: any;
}
