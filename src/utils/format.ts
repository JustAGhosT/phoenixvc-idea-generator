/**
 * Utility functions for formatting values
 * 
 * These utilities help format dates, numbers, currencies, and other values
 * in a consistent way across the application.
 */

/**
 * Format a date to a localized string
 * 
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @param locale - Locale string (defaults to user's locale)
 * @returns Formatted date string
 * 
 * @example
 * // Basic usage
 * formatDate(new Date())
 * // => "4/25/2025"
 * 
 * @example
 * // With custom format
 * formatDate(new Date(), { dateStyle: 'full' })
 * // => "Friday, April 25, 2025"
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'short' },
  locale?: string
): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Format a time to a localized string
 * 
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @param locale - Locale string (defaults to user's locale)
 * @returns Formatted time string
 * 
 * @example
 * formatTime(new Date())
 * // => "3:30 PM"
 */
export function formatTime(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = { timeStyle: 'short' },
  locale?: string
): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Format a date and time to a localized string
 * 
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @param locale - Locale string (defaults to user's locale)
 * @returns Formatted date and time string
 * 
 * @example
 * formatDateTime(new Date())
 * // => "4/25/2025, 3:30 PM"
 */
export function formatDateTime(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'short', timeStyle: 'short' },
  locale?: string
): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Format a relative time (e.g., "2 hours ago")
 * 
 * @param date - Date to format relative to now
 * @param options - Intl.RelativeTimeFormatOptions
 * @param locale - Locale string (defaults to user's locale)
 * @returns Formatted relative time string
 * 
 * @example
 * formatRelativeTime(new Date(Date.now() - 5 * 60 * 1000))
 * // => "5 minutes ago"
 */
export function formatRelativeTime(
  date: Date | string | number,
  options: Intl.RelativeTimeFormatOptions = { numeric: 'auto' },
  locale?: string
): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  const formatter = new Intl.RelativeTimeFormat(locale, options);
  
  if (diffInSeconds < 60) {
    return formatter.format(-diffInSeconds, 'second');
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return formatter.format(-diffInMinutes, 'minute');
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return formatter.format(-diffInHours, 'hour');
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return formatter.format(-diffInDays, 'day');
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return formatter.format(-diffInMonths, 'month');
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return formatter.format(-diffInYears, 'year');
}

/**
 * Format a number to a localized string
 * 
 * @param value - Number to format
 * @param options - Intl.NumberFormatOptions
 * @param locale - Locale string (defaults to user's locale)
 * @returns Formatted number string
 * 
 * @example
 * formatNumber(1234567.89)
 * // => "1,234,567.89"
 * 
 * @example
 * formatNumber(1234.56, { maximumFractionDigits: 0 })
 * // => "1,235"
 */
export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions = {},
  locale?: string
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Format a currency value
 * 
 * @param value - Number to format as currency
 * @param currency - Currency code (e.g., 'USD', 'EUR')
 * @param options - Intl.NumberFormatOptions
 * @param locale - Locale string (defaults to user's locale)
 * @returns Formatted currency string
 * 
 * @example
 * formatCurrency(1234.56, 'USD')
 * // => "$1,234.56"
 * 
 * @example
 * formatCurrency(1234.56, 'EUR', {}, 'de-DE')
 * // => "1.234,56 €"
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  options: Intl.NumberFormatOptions = {},
  locale?: string
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    ...options,
  }).format(value);
}

/**
 * Format a percentage value
 * 
 * @param value - Number to format as percentage (0.1 = 10%)
 * @param options - Intl.NumberFormatOptions
 * @param locale - Locale string (defaults to user's locale)
 * @returns Formatted percentage string
 * 
 * @example
 * formatPercent(0.1234)
 * // => "12.34%"
 * 
 * @example
 * formatPercent(0.1234, { maximumFractionDigits: 0 })
 * // => "12%"
 */
export function formatPercent(
  value: number,
  options: Intl.NumberFormatOptions = {},
  locale?: string
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    ...options,
  }).format(value);
}

/**
 * Format a file size in bytes to a human-readable string
 * 
 * @param bytes - File size in bytes
 * @param options - Options for formatting
 * @returns Formatted file size string
 * 
 * @example
 * formatFileSize(1500)
 * // => "1.5 KB"
 * 
 * @example
 * formatFileSize(1500000)
 * // => "1.5 MB"
 */
export function formatFileSize(
  bytes: number,
  options: { decimals?: number; binary?: boolean } = {}
): string {
  if (bytes === 0) return '0 Bytes';
  
  const { decimals = 2, binary = false } = options;
  const k = binary ? 1024 : 1000;
  const sizes = binary
    ? ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
    : ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

/**
 * Truncate a string to a maximum length and add an ellipsis
 * 
 * @param text - String to truncate
 * @param maxLength - Maximum length
 * @param ellipsis - String to add at the end (default: '...')
 * @returns Truncated string
 * 
 * @example
 * truncate('This is a long text that should be truncated', 20)
 * // => "This is a long text..."
 */
export function truncate(
  text: string,
  maxLength: number,
  ellipsis: string = '...'
): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - ellipsis.length) + ellipsis;
}

/**
 * Format a phone number to a standard format
 * 
 * @param phone - Phone number to format
 * @param format - Format string (default: '(xxx) xxx-xxxx')
 * @returns Formatted phone number
 * 
 * @example
 * formatPhone('1234567890')
 * // => "(123) 456-7890"
 */
export function formatPhone(
  phone: string,
  format: string = '(xxx) xxx-xxxx'
): string {
  const digits = phone.replace(/\D/g, '');
  let result = format;
  
  for (let i = 0; i < digits.length; i++) {
    result = result.replace('x', digits[i]);
  }
  
  // Remove any remaining 'x' placeholders
  result = result.replace(/x/g, '');
  
  return result;
}