/**
 * Mock API responses for Partner API
 * Based on: https://docs.paywise.de/api-docs/partner-api/
 */

import type {
  Company,
  CompanyListResponse,
  User,
  UserListResponse,
  UserInvite,
} from '../../src/partner-api/types';

// ==================== Companies ====================

export const mockCompany: Company = {
  id: 'company-66666666-6666-6666-6666-666666666666',
  href: '/partner/v1/companies/company-66666666-6666-6666-6666-666666666666',
  name: 'MVNet Solutions UG',
  legal_form: 'UG (haftungsbeschränkt)',
  vat_id: 'DE123456789',
  tax_number: '27/123/45678',
  registration_court: 'Amtsgericht Berlin Charlottenburg',
  registration_number: 'HRB 123456',
  legal_representatives: 'Max Mustermann',
  address: {
    street: 'Techstraße 42',
    zip: '10115',
    city: 'Berlin',
    country: 'DE',
  },
  contact_person: {
    first_name: 'Max',
    last_name: 'Mustermann',
    email: 'max@mvnet-solutions.de',
    phone: '+49 30 123456789',
  },
  status: 'active',
  created: '2024-01-01T00:00:00Z',
  updated: '2024-01-15T12:00:00Z',
};

export const mockCompanyListResponse: CompanyListResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [mockCompany],
};

// ==================== Users ====================

export const mockUser: User = {
  id: 'user-55555555-5555-5555-5555-555555555555',
  href: '/partner/v1/users/user-55555555-5555-5555-5555-555555555555',
  email: 'admin@mvnet-solutions.de',
  first_name: 'Max',
  last_name: 'Mustermann',
  company: {
    href: '/partner/v1/companies/company-66666666-6666-6666-6666-666666666666',
    id: 'company-66666666-6666-6666-6666-666666666666',
    name: 'MVNet Solutions UG',
  },
  role: 'admin',
  status: 'active',
  created: '2024-01-01T00:00:00Z',
  updated: '2024-01-15T12:00:00Z',
};

export const mockUserListResponse: UserListResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [mockUser],
};

// ==================== User Invites ====================

export const mockUserInvite: UserInvite = {
  id: 'invite-77777777-7777-7777-7777-777777777777',
  href: '/partner/v1/user-invites/invite-77777777-7777-7777-7777-777777777777',
  email: 'newuser@mvnet-solutions.de',
  first_name: 'New',
  last_name: 'User',
  company: {
    href: '/partner/v1/companies/company-66666666-6666-6666-6666-666666666666',
    id: 'company-66666666-6666-6666-6666-666666666666',
    name: 'MVNet Solutions UG',
  },
  role: 'user',
  status: 'pending',
  invite_url: 'https://app.paywise.de/invite/abc123def456',
  expires_at: '2024-02-01T00:00:00Z',
  created: '2024-01-15T00:00:00Z',
};
