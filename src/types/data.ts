/**
 * Common data models used across the application
 */

/**
 * User model
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

/**
 * User role
 */
export type UserRole = 'admin' | 'editor' | 'viewer';

/**
 * Authentication state
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Notification model
 */
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

/**
 * Notification type
 */
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

/**
 * API response model
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

/**
 * Sort direction
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Sort option
 */
export interface SortOption {
  field: string;
  direction: SortDirection;
}

/**
 * Filter option
 */
export interface FilterOption {
  field: string;
  value: string | number | boolean | null;
  operator: FilterOperator;
}

/**
 * Filter operator
 */
export type FilterOperator = 
  | 'eq'      // equals
  | 'neq'     // not equals
  | 'gt'      // greater than
  | 'gte'     // greater than or equal
  | 'lt'      // less than
  | 'lte'     // less than or equal
  | 'in'      // in array
  | 'nin'     // not in array
  | 'contains' // string contains
  | 'starts'  // string starts with
  | 'ends';   // string ends with

/**
 * Query params for API requests
 */
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: SortOption[];
  filters?: FilterOption[];
  search?: string;
}

/**
 * Status type for async operations
 */
export type Status = 'idle' | 'loading' | 'success' | 'error';

/**
 * Async state for data fetching
 */
export interface AsyncState<T, E = string> {
  data: T | null;
  status: Status;
  error: E | null;
}

/**
 * Menu item model
 */
export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
  permissions?: string[];
}

/**
 * Breadcrumb item model
 */
export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: string;
}

/**
 * Tab item model
 */
export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  content?: React.ReactNode;
}

/**
 * Chart data point
 */
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

/**
 * Chart dataset
 */
export interface ChartDataset {
  id: string;
  label: string;
  data: ChartDataPoint[];
  color?: string;
}

/**
 * Chart data
 */
export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

/**
 * Form field model
 */
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'date';
  placeholder?: string;
  defaultValue?: any;
  required?: boolean;
  disabled?: boolean;
  options?: { label: string; value: string | number }[];
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validate?: (value: any) => boolean | string;
  };
}