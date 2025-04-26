/**
 * Validation utility functions
 * 
 * These utilities help validate form inputs, data models, and other values
 * in a consistent way across the application.
 */

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 * 
 * @param value - Value to check
 * @returns True if the value is empty
 * 
 * @example
 * isEmpty('')      // => true
 * isEmpty(null)    // => true
 * isEmpty([])      // => true
 * isEmpty({})      // => true
 * isEmpty('text')  // => false
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Check if a value is not empty
 * 
 * @param value - Value to check
 * @returns True if the value is not empty
 * 
 * @example
 * isNotEmpty('text')  // => true
 * isNotEmpty([1, 2])  // => true
 * isNotEmpty('')      // => false
 */
export function isNotEmpty(value: any): boolean {
  return !isEmpty(value);
}

/**
 * Validate an email address
 * 
 * @param email - Email address to validate
 * @returns True if the email is valid
 * 
 * @example
 * isValidEmail('user@example.com')  // => true
 * isValidEmail('invalid-email')     // => false
 */
export function isValidEmail(email: string): boolean {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

/**
 * Validate a password strength
 * 
 * @param password - Password to validate
 * @param options - Validation options
 * @returns True if the password meets the requirements
 * 
 * @example
 * isStrongPassword('Passw0rd!')  // => true
 * isStrongPassword('password')   // => false
 */
export function isStrongPassword(
  password: string,
  options: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  } = {}
): boolean {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
  } = options;
  
  if (password.length < minLength) return false;
  if (requireUppercase && !/[A-Z]/.test(password)) return false;
  if (requireLowercase && !/[a-z]/.test(password)) return false;
  if (requireNumbers && !/[0-9]/.test(password)) return false;
  if (requireSpecialChars && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) return false;
  
  return true;
}

/**
 * Validate a URL
 * 
 * @param url - URL to validate
 * @param requireProtocol - Whether to require http/https protocol
 * @returns True if the URL is valid
 * 
 * @example
 * isValidUrl('https://example.com')  // => true
 * isValidUrl('example.com', false)   // => true
 * isValidUrl('invalid url')          // => false
 */
export function isValidUrl(url: string, requireProtocol: boolean = true): boolean {
  try {
    if (requireProtocol) {
      new URL(url);
      return true;
    } else {
      // Allow URLs without protocol
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      new URL(url);
      return true;
    }
  } catch (e) {
    return false;
  }
}

/**
 * Validate a phone number
 * 
 * @param phone - Phone number to validate
 * @returns True if the phone number is valid
 * 
 * @example
 * isValidPhone('(123) 456-7890')  // => true
 * isValidPhone('123-456-7890')    // => true
 * isValidPhone('invalid')         // => false
 */
export function isValidPhone(phone: string): boolean {
  // This pattern allows for various phone formats
  const pattern = /^(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return pattern.test(phone);
}

/**
 * Validate a date string
 * 
 * @param dateStr - Date string to validate
 * @param format - Expected format (for user feedback, doesn't affect validation)
 * @returns True if the date string is a valid date
 * 
 * @example
 * isValidDate('2025-04-25')  // => true
 * isValidDate('invalid')     // => false
 */
export function isValidDate(dateStr: string, format: string = 'YYYY-MM-DD'): boolean {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

/**
 * Validate a number is within a range
 * 
 * @param value - Number to validate
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns True if the number is within the range
 * 
 * @example
 * isInRange(5, 1, 10)  // => true
 * isInRange(0, 1, 10)  // => false
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validate a string length is within a range
 * 
 * @param value - String to validate
 * @param min - Minimum length (inclusive)
 * @param max - Maximum length (inclusive)
 * @returns True if the string length is within the range
 * 
 * @example
 * isLengthInRange('hello', 1, 10)  // => true
 * isLengthInRange('hello', 6, 10)  // => false
 */
export function isLengthInRange(value: string, min: number, max: number): boolean {
  return value.length >= min && value.length <= max;
}

/**
 * Validate an array length is within a range
 * 
 * @param array - Array to validate
 * @param min - Minimum length (inclusive)
 * @param max - Maximum length (inclusive)
 * @returns True if the array length is within the range
 * 
 * @example
 * isArrayLengthInRange([1, 2, 3], 1, 5)  // => true
 * isArrayLengthInRange([1, 2, 3], 4, 5)  // => false
 */
export function isArrayLengthInRange<T>(array: T[], min: number, max: number): boolean {
  return array.length >= min && array.length <= max;
}

/**
 * Validate a value matches a regular expression pattern
 * 
 * @param value - String to validate
 * @param pattern - Regular expression pattern
 * @returns True if the value matches the pattern
 * 
 * @example
 * matchesPattern('abc123', /^[a-z0-9]+$/)  // => true
 * matchesPattern('ABC', /^[a-z0-9]+$/)     // => false
 */
export function matchesPattern(value: string, pattern: RegExp): boolean {
  return pattern.test(value);
}

/**
 * Validate a value is one of the allowed values
 * 
 * @param value - Value to validate
 * @param allowedValues - Array of allowed values
 * @returns True if the value is in the allowed values
 * 
 * @example
 * isOneOf('apple', ['apple', 'orange', 'banana'])  // => true
 * isOneOf('grape', ['apple', 'orange', 'banana'])  // => false
 */
export function isOneOf<T>(value: T, allowedValues: T[]): boolean {
  return allowedValues.includes(value);
}

/**
 * Create a validation result object
 * 
 * @param isValid - Whether the validation passed
 * @param message - Error message if validation failed
 * @returns Validation result object
 */
export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Create a validation result
 * 
 * @param isValid - Whether the validation passed
 * @param message - Error message if validation failed
 * @returns Validation result object
 */
export function createValidationResult(isValid: boolean, message?: string): ValidationResult {
  return { isValid, message: isValid ? undefined : message };
}

/**
 * Combine multiple validation results
 * 
 * @param results - Array of validation results
 * @returns Combined validation result
 */
export function combineValidationResults(results: ValidationResult[]): ValidationResult {
  const isValid = results.every(result => result.isValid);
  const messages = results
    .filter(result => !result.isValid && result.message)
    .map(result => result.message);
  
  return {
    isValid,
    message: isValid ? undefined : messages.join(', '),
  };
}