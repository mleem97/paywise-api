/**
 * Types for Case Management API
 */

/**
 * Case status
 */
export type CaseStatus = 'open' | 'pending' | 'in_progress' | 'resolved' | 'closed' | 'cancelled';

/**
 * Case priority
 */
export type CasePriority = 'low' | 'medium' | 'high' | 'urgent';

/**
 * Case type
 */
export type CaseType = 'support' | 'billing' | 'technical' | 'general' | 'complaint';

/**
 * Case object
 */
export interface Case {
  id: string;
  caseNumber?: string;
  title: string;
  description?: string;
  status: CaseStatus;
  priority?: CasePriority;
  type?: CaseType;
  customerId?: string;
  assignedTo?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
  resolvedAt?: string;
  closedAt?: string;
}

/**
 * Parameters for creating a case
 */
export interface CreateCaseParams {
  title: string;
  description?: string;
  priority?: CasePriority;
  type?: CaseType;
  customerId?: string;
  assignedTo?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

/**
 * Parameters for updating a case
 */
export interface UpdateCaseParams {
  title?: string;
  description?: string;
  status?: CaseStatus;
  priority?: CasePriority;
  type?: CaseType;
  assignedTo?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

/**
 * Parameters for listing cases
 */
export interface ListCasesParams {
  status?: CaseStatus | CaseStatus[];
  priority?: CasePriority | CasePriority[];
  type?: CaseType | CaseType[];
  customerId?: string;
  assignedTo?: string;
  tags?: string[];
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  createdAfter?: string;
  createdBefore?: string;
}

/**
 * Case comment
 */
export interface CaseComment {
  id: string;
  caseId: string;
  content: string;
  authorId?: string;
  authorName?: string;
  isInternal?: boolean;
  attachments?: string[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Parameters for creating a case comment
 */
export interface CreateCaseCommentParams {
  content: string;
  isInternal?: boolean;
  attachments?: string[];
}

/**
 * Case attachment
 */
export interface CaseAttachment {
  id: string;
  caseId: string;
  filename: string;
  filesize?: number;
  contentType?: string;
  url?: string;
  uploadedBy?: string;
  createdAt?: string;
}

/**
 * Case activity/history entry
 */
export interface CaseActivity {
  id: string;
  caseId: string;
  action: string;
  description?: string;
  performedBy?: string;
  changes?: Record<string, any>;
  createdAt?: string;
}

/**
 * List response
 */
export interface CaseListResponse {
  cases: Case[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Comments list response
 */
export interface CaseCommentsListResponse {
  comments: CaseComment[];
  total: number;
  page?: number;
  limit?: number;
}

/**
 * Activities list response
 */
export interface CaseActivitiesListResponse {
  activities: CaseActivity[];
  total: number;
  page?: number;
  limit?: number;
}
