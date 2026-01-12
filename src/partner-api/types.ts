/**
 * Types for Partner API
 */

/**
 * Partner status
 */
export type PartnerStatus = 'active' | 'inactive' | 'pending' | 'suspended';

/**
 * Partner type
 */
export type PartnerType = 'reseller' | 'affiliate' | 'integration' | 'technology';

/**
 * Partner object
 */
export interface Partner {
  id: string;
  name: string;
  email?: string;
  type?: PartnerType;
  status: PartnerStatus;
  companyName?: string;
  contactPerson?: string;
  phone?: string;
  address?: Address;
  website?: string;
  apiKey?: string;
  commission?: number;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
  activatedAt?: string;
}

/**
 * Address information
 */
export interface Address {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

/**
 * Parameters for creating a partner
 */
export interface CreatePartnerParams {
  name: string;
  email?: string;
  type?: PartnerType;
  companyName?: string;
  contactPerson?: string;
  phone?: string;
  address?: Address;
  website?: string;
  commission?: number;
  metadata?: Record<string, any>;
}

/**
 * Parameters for updating a partner
 */
export interface UpdatePartnerParams {
  name?: string;
  email?: string;
  type?: PartnerType;
  status?: PartnerStatus;
  companyName?: string;
  contactPerson?: string;
  phone?: string;
  address?: Address;
  website?: string;
  commission?: number;
  metadata?: Record<string, any>;
}

/**
 * Parameters for listing partners
 */
export interface ListPartnersParams {
  status?: PartnerStatus | PartnerStatus[];
  type?: PartnerType | PartnerType[];
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

/**
 * Partner transaction
 */
export interface PartnerTransaction {
  id: string;
  partnerId: string;
  type: 'commission' | 'payment' | 'refund' | 'adjustment';
  amount: number;
  currency?: string;
  description?: string;
  referenceId?: string;
  status?: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdAt?: string;
  processedAt?: string;
}

/**
 * Parameters for creating a transaction
 */
export interface CreatePartnerTransactionParams {
  type: 'commission' | 'payment' | 'refund' | 'adjustment';
  amount: number;
  currency?: string;
  description?: string;
  referenceId?: string;
}

/**
 * Partner analytics/statistics
 */
export interface PartnerAnalytics {
  partnerId: string;
  totalRevenue?: number;
  totalCommission?: number;
  totalTransactions?: number;
  activeCustomers?: number;
  conversionRate?: number;
  periodStart?: string;
  periodEnd?: string;
  currency?: string;
}

/**
 * Parameters for analytics query
 */
export interface PartnerAnalyticsParams {
  partnerId?: string;
  startDate?: string;
  endDate?: string;
  groupBy?: 'day' | 'week' | 'month' | 'year';
}

/**
 * Partner API key
 */
export interface PartnerApiKey {
  id: string;
  partnerId: string;
  name?: string;
  key: string;
  scope?: string[];
  expiresAt?: string;
  createdAt?: string;
  lastUsedAt?: string;
}

/**
 * Parameters for creating an API key
 */
export interface CreatePartnerApiKeyParams {
  name?: string;
  scope?: string[];
  expiresAt?: string;
}

/**
 * Partner list response
 */
export interface PartnerListResponse {
  partners: Partner[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Transaction list response
 */
export interface PartnerTransactionListResponse {
  transactions: PartnerTransaction[];
  total: number;
  page?: number;
  limit?: number;
}

/**
 * API keys list response
 */
export interface PartnerApiKeyListResponse {
  apiKeys: PartnerApiKey[];
  total: number;
}
