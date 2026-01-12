/**
 * Types for Partner API
 * Based on official Paywise API documentation
 */

// ==================== Common Types ====================

/**
 * Paginated list response
 */
export interface PaginatedResponse<T> {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
}

// ==================== Companies ====================

/**
 * Company address
 */
export interface CompanyAddress {
  street: string | null;
  zip: string | null;
  city: string | null;
  country: string;
}

/**
 * Contact person for company
 */
export interface ContactPerson {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
}

/**
 * Company object
 */
export interface Company {
  href: string;
  id?: string;
  name: string;
  legal_form?: string;
  vat_id?: string;
  tax_number?: string;
  registration_court?: string;
  registration_number?: string;
  legal_representatives?: string;
  address?: CompanyAddress;
  contact_person?: ContactPerson;
  status: 'pending' | 'active' | 'suspended' | 'closed';
  dca_client_no?: string;
  created: string;
  updated: string;
}

/**
 * Parameters for creating a company
 */
export interface CreateCompanyParams {
  [key: string]: unknown;
  name: string;
  legal_form?: string;
  vat_id?: string;
  tax_number?: string;
  registration_court?: string;
  registration_number?: string;
  legal_representatives?: string;
  address?: CompanyAddress;
  contact_person?: ContactPerson;
}

/**
 * Parameters for updating a company
 */
export interface UpdateCompanyParams {
  [key: string]: unknown;
  name?: string;
  legal_form?: string;
  vat_id?: string;
  tax_number?: string;
  registration_court?: string;
  registration_number?: string;
  legal_representatives?: string;
  address?: CompanyAddress;
  contact_person?: ContactPerson;
}

/**
 * Parameters for listing companies
 */
export interface ListCompaniesParams {
  [key: string]: string | number | boolean | undefined;
  dca_client_no?: string;
  id?: string;
  limit?: number;
  name?: string;
  offset?: number;
  status?: string;
}

/**
 * Company list response
 */
export type CompanyListResponse = PaginatedResponse<Company>;

// ==================== Users ====================

/**
 * User status
 */
export type UserStatus = 'active' | 'inactive';

/**
 * User role
 */
export type UserRole = 'admin' | 'user' | 'viewer';

/**
 * Company reference in user
 */
export interface UserCompanyReference {
  href: string;
  id: string;
  name: string;
}

/**
 * User object
 */
export interface User {
  href: string;
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  company: UserCompanyReference;
  role: UserRole;
  status: UserStatus;
  last_login?: string | null;
  created: string;
  updated: string;
}

/**
 * Parameters for creating a user
 */
export interface CreateUserParams {
  [key: string]: unknown;
  email: string;
  first_name: string;
  last_name: string;
  company: string;
  role: UserRole;
}

/**
 * Parameters for listing users
 */
export interface ListUsersParams {
  [key: string]: string | number | boolean | undefined;
  company?: string;
  email?: string;
  first_name?: string;
  id?: string;
  last_name?: string;
  limit?: number;
  offset?: number;
  role?: string;
  status?: string;
}

/**
 * User list response
 */
export type UserListResponse = PaginatedResponse<User>;

// ==================== User Invites ====================

/**
 * User invite status
 */
export type UserInviteStatus = 'pending' | 'accepted' | 'expired' | 'revoked';

/**
 * User invite object
 */
export interface UserInvite {
  href: string;
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  company: UserCompanyReference;
  role: UserRole;
  status: UserInviteStatus;
  invite_url?: string;
  expires_at: string;
  created: string;
  accepted_at?: string | null;
}

/**
 * Parameters for creating a user invite
 */
export interface CreateUserInviteParams {
  [key: string]: unknown;
  email: string;
  first_name: string;
  last_name: string;
  company: string;
  role: UserRole;
}

/**
 * Onboarded user object
 */
export interface OnboardedUser {
  href: string;
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  company: UserCompanyReference;
  role: UserRole;
  status: UserStatus;
  created: string;
  updated: string;
}

// ==================== Partner Info ====================

/**
 * Partner info object
 */
export interface PartnerInfo {
  id: string;
  token_name: string;
  user: string;
  user_first_name: string;
  user_last_name: string;
  access_mode: string;
}
