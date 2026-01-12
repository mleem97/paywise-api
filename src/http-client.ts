/**
 * HTTP Client for Paywise API requests
 * Supports both Node.js and browser environments
 * 
 * Repository: https://github.com/mleem97/paywise-api
 * Package: https://www.npmjs.com/package/paywise-api
 * License: MIT
 */

import { PaywiseConfig, HttpMethod, ApiResponse, ApiError, QueryParams } from './types';

/**
 * Base HTTP client for making API requests
 */
export class HttpClient {
  private config: Required<PaywiseConfig>;

  constructor(config: PaywiseConfig) {
    this.config = {
      baseUrl: config.baseUrl,
      apiKey: config.apiKey,
      timeout: config.timeout || 30000,
      headers: config.headers || {},
    };
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(endpoint: string, params?: QueryParams): string {
    const url = new URL(endpoint, this.config.baseUrl);
    
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }

  /**
   * Build request headers
   */
  private buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.apiKey}`,
      ...this.config.headers,
      ...customHeaders,
    };
  }

  /**
   * Make HTTP request
   */
  private async request<T = Record<string, unknown>>(
    method: HttpMethod,
    endpoint: string,
    options?: {
      body?: Record<string, unknown> | FormData | Blob | File;
      params?: QueryParams;
      headers?: Record<string, string>;
    }
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint, options?.params);
    const headers = this.buildHeaders(options?.headers);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: options?.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      let data: T;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = (await response.json()) as T;
      } else {
        data = (await response.text()) as unknown as T;
      }

      if (!response.ok) {
        const parsedData = data as Record<string, unknown> | null;
        const message = typeof data === 'string' ? data : (typeof parsedData?.message === 'string' ? parsedData.message : response.statusText);
        const code = typeof parsedData?.code === 'string' ? parsedData.code : undefined;
        const error: ApiError = {
          message,
          status: response.status,
          code,
          details: data,
        };
        throw error;
      }

      return {
        data: data as T,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      };
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      
      if ((error as Record<string, unknown>)?.name === 'AbortError') {
        const timeoutError: ApiError = {
          message: 'Request timeout',
          code: 'TIMEOUT',
        };
        throw timeoutError;
      }
      
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T = Record<string, unknown>>(endpoint: string, params?: QueryParams, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, { params, headers });
  }

  /**
   * POST request
   */
  async post<T = Record<string, unknown>>(endpoint: string, body?: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, { body: body as Record<string, unknown> | FormData | Blob | File | undefined, headers });
  }

  /**
   * PUT request
   */
  async put<T = Record<string, unknown>>(endpoint: string, body?: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, { body: body as Record<string, unknown> | FormData | Blob | File | undefined, headers });
  }

  /**
   * PATCH request
   */
  async patch<T = Record<string, unknown>>(endpoint: string, body?: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, { body: body as Record<string, unknown> | FormData | Blob | File | undefined, headers });
  }

  /**
   * DELETE request
   */
  async delete<T = Record<string, unknown>>(endpoint: string, params?: QueryParams, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, { params, headers });
  }
}
