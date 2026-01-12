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
  private async request<T = any>(
    method: HttpMethod,
    endpoint: string,
    options?: {
      body?: any;
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
        data = (await response.text()) as any;
      }

      if (!response.ok) {
        const error: ApiError = {
          message: typeof data === 'string' ? data : (data as any)?.message || response.statusText,
          status: response.status,
          code: (data as any)?.code,
          details: data,
        };
        throw error;
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      };
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
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
  async get<T = any>(endpoint: string, params?: QueryParams, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, { params, headers });
  }

  /**
   * POST request
   */
  async post<T = any>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, { body, headers });
  }

  /**
   * PUT request
   */
  async put<T = any>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, { body, headers });
  }

  /**
   * PATCH request
   */
  async patch<T = any>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, { body, headers });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(endpoint: string, params?: QueryParams, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, { params, headers });
  }
}
