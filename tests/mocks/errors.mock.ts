/**
 * Mock HTTP responses for error scenarios
 * Based on Paywise API error handling patterns
 */

export interface MockApiError {
  status: number;
  statusText: string;
  body: {
    error: string;
    message: string;
    code?: string;
    details?: Record<string, unknown>;
  };
}

// ==================== Authentication Errors ====================

export const mockUnauthorizedError: MockApiError = {
  status: 401,
  statusText: 'Unauthorized',
  body: {
    error: 'Unauthorized',
    message: 'Invalid or expired API key',
    code: 'INVALID_API_KEY',
  },
};

export const mockForbiddenError: MockApiError = {
  status: 403,
  statusText: 'Forbidden',
  body: {
    error: 'Forbidden',
    message: 'You do not have permission to access this resource',
    code: 'ACCESS_DENIED',
  },
};

export const mockMissingUserIdError: MockApiError = {
  status: 403,
  statusText: 'Forbidden',
  body: {
    error: 'Forbidden',
    message: 'X-User-Id header is required for Partner API',
    code: 'MISSING_USER_ID',
  },
};

// ==================== Rate Limiting ====================

export const mockRateLimitError: MockApiError = {
  status: 429,
  statusText: 'Too Many Requests',
  body: {
    error: 'Too Many Requests',
    message: 'Rate limit exceeded. Please retry after 60 seconds.',
    code: 'RATE_LIMIT_EXCEEDED',
    details: {
      retryAfter: 60,
      limit: 100,
      remaining: 0,
      resetAt: new Date(Date.now() + 60000).toISOString(),
    },
  },
};

// ==================== Validation Errors ====================

export const mockValidationError: MockApiError = {
  status: 400,
  statusText: 'Bad Request',
  body: {
    error: 'Validation Error',
    message: 'Request validation failed',
    code: 'VALIDATION_ERROR',
    details: {
      fields: {
        debtor: ['This field is required'],
        total_claim_amount: ['Amount must be positive'],
      },
    },
  },
};

export const mockInvalidIbanError: MockApiError = {
  status: 400,
  statusText: 'Bad Request',
  body: {
    error: 'Validation Error',
    message: 'Invalid IBAN format',
    code: 'INVALID_IBAN',
    details: {
      iban: 'The provided IBAN is not valid',
    },
  },
};

// ==================== Not Found Errors ====================

export const mockNotFoundError: MockApiError = {
  status: 404,
  statusText: 'Not Found',
  body: {
    error: 'Not Found',
    message: 'The requested resource was not found',
    code: 'RESOURCE_NOT_FOUND',
  },
};

export const mockClaimNotFoundError: MockApiError = {
  status: 404,
  statusText: 'Not Found',
  body: {
    error: 'Not Found',
    message: 'Claim with the specified ID was not found',
    code: 'CLAIM_NOT_FOUND',
  },
};

// ==================== Conflict Errors ====================

export const mockDuplicateDebtorError: MockApiError = {
  status: 409,
  statusText: 'Conflict',
  body: {
    error: 'Conflict',
    message: 'A debtor with this reference already exists',
    code: 'DUPLICATE_DEBTOR',
    details: {
      existingDebtorHref: '/v1/debtors/debtor-existing-123',
    },
  },
};

export const mockClaimAlreadyReleasedError: MockApiError = {
  status: 409,
  statusText: 'Conflict',
  body: {
    error: 'Conflict',
    message: 'Claim has already been released and cannot be modified',
    code: 'CLAIM_ALREADY_RELEASED',
  },
};

// ==================== Business Logic Errors ====================

export const mockReleaseWithoutDocumentError: MockApiError = {
  status: 422,
  statusText: 'Unprocessable Entity',
  body: {
    error: 'Unprocessable Entity',
    message: 'Claim cannot be released without at least one document attached',
    code: 'DOCUMENT_REQUIRED',
    details: {
      claimId: 'claim-12345',
      documentsCount: 0,
    },
  },
};

export const mockInvalidStateTransitionError: MockApiError = {
  status: 422,
  statusText: 'Unprocessable Entity',
  body: {
    error: 'Unprocessable Entity',
    message: 'Invalid state transition from "released" to "created"',
    code: 'INVALID_STATE_TRANSITION',
    details: {
      currentState: 'released',
      requestedState: 'created',
      allowedTransitions: ['under_review', 'accepted', 'rejected'],
    },
  },
};

// ==================== Server Errors ====================

export const mockInternalServerError: MockApiError = {
  status: 500,
  statusText: 'Internal Server Error',
  body: {
    error: 'Internal Server Error',
    message: 'An unexpected error occurred. Please try again later.',
    code: 'INTERNAL_ERROR',
  },
};

export const mockServiceUnavailableError: MockApiError = {
  status: 503,
  statusText: 'Service Unavailable',
  body: {
    error: 'Service Unavailable',
    message: 'The service is temporarily unavailable. Please try again later.',
    code: 'SERVICE_UNAVAILABLE',
    details: {
      retryAfter: 300,
    },
  },
};

// ==================== Timeout Simulation ====================

export const mockTimeoutError = {
  name: 'AbortError',
  message: 'Request timeout',
  code: 'TIMEOUT',
};

export const mockNetworkError = {
  name: 'TypeError',
  message: 'Failed to fetch',
  code: 'NETWORK_ERROR',
};
