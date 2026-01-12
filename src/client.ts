/**
 * Paywise API Client - Main entry point
 * 
 * Repository: https://github.com/mleem97/paywise-api
 * Package: https://www.npmjs.com/package/paywise-api
 * License: MIT
 */

import { PaywiseConfig } from './types';
import { HttpClient } from './http-client';
import { CaseManagementClient } from './case-management/client';
import { PartnerApiClient } from './partner-api/client';

/**
 * Main Paywise API Client
 * 
 * @example
 * ```typescript
 * import { PaywiseClient } from 'paywise-api';
 * 
 * const client = new PaywiseClient({
 *   baseUrl: 'https://api.paywise.de',
 *   apiKey: 'your-api-key'
 * });
 * 
 * // Use Case Management API
 * const cases = await client.caseManagement.listCases();
 * 
 * // Use Partner API
 * const partners = await client.partner.listPartners();
 * ```
 */
export class PaywiseClient {
  private httpClient: HttpClient;
  
  /**
   * Case Management API client
   */
  public caseManagement: CaseManagementClient;
  
  /**
   * Partner API client
   */
  public partner: PartnerApiClient;

  /**
   * Create a new Paywise API client
   * @param config - Client configuration
   */
  constructor(config: PaywiseConfig) {
    this.httpClient = new HttpClient(config);
    this.caseManagement = new CaseManagementClient(this.httpClient);
    this.partner = new PartnerApiClient(this.httpClient);
  }

  /**
   * Get the underlying HTTP client for advanced usage
   */
  getHttpClient(): HttpClient {
    return this.httpClient;
  }
}
