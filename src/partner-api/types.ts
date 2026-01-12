/**
 * Types for Partner API
 */

/**
 * Company object
 */
export interface Company {
  id: string;
  name: string;
  legalForm?: string;
  taxId?: string;
  registrationNumber?: string;
  address?: CompanyAddress;
  contactEmail?: string;
  contactPhone?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

/**
 * Company address
 */
export interface CompanyAddress {
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  [key: string]: any;
}

/**
 * Parameters for creating a company
 */
export interface CreateCompanyParams {
  name: string;
  legalForm?: string;
  taxId?: string;
  registrationNumber?: string;
  address?: CompanyAddress;
  contactEmail?: string;
  contactPhone?: string;
  [key: string]: any;
}

/**
 * Parameters for updating a company
 */
export interface UpdateCompanyParams {
  name?: string;
  legalForm?: string;
  taxId?: string;
  registrationNumber?: string;
  address?: CompanyAddress;
  contactEmail?: string;
  contactPhone?: string;
  [key: string]: any;
}

/**
 * Parameters for listing companies
 */
export interface ListCompaniesParams {
  id?: string;
  limit?: number;
  offset?: number;
  name?: string;
  [key: string]: any;
}

/**
 * Company list response
 */
export interface CompanyListResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Company[];
}

/**
 * User object
 */
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  companyId?: string;
  roles?: string[];
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

/**
 * Parameters for creating a user
 */
export interface CreateUserParams {
  email: string;
  firstName?: string;
  lastName?: string;
  companyId?: string;
  roles?: string[];
  [key: string]: any;
}

/**
 * Parameters for listing users
 */
export interface ListUsersParams {
  limit?: number;
  offset?: number;
  companyId?: string;
  email?: string;
  [key: string]: any;
}

/**
 * User list response
 */
export interface UserListResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: User[];
}

/**
 * User invite object
 */
export interface UserInvite {
  id: string;
  email: string;
  companyId?: string;
  roles?: string[];
  status?: string;
  inviteUrl?: string;
  expiresAt?: string;
  createdAt?: string;
  acceptedAt?: string;
  [key: string]: any;
}

/**
 * Parameters for creating a user invite
 */
export interface CreateUserInviteParams {
  email: string;
  companyId?: string;
  roles?: string[];
  [key: string]: any;
}

/**
 * Onboarded user object
 */
export interface OnboardedUser {
  id: string;
  inviteId: string;
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  companyId?: string;
  onboardedAt?: string;
  [key: string]: any;
}

/**
 * Token info object
 */
export interface TokenInfo {
  userId?: string;
  companyId?: string;
  scopes?: string[];
  expiresAt?: string;
  [key: string]: any;
}
