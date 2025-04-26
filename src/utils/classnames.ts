/**
 * Utility for managing class names in components
 * 
 * This utility helps combine Tailwind classes with LESS modules
 * in a clean and type-safe way.
 */

type ClassValue = string | number | boolean | undefined | null;
type ClassObject = Record<string, boolean | undefined | null>;
type ClassArray = ClassValue[];
type ClassInput = ClassValue | ClassObject | ClassArray;

/**
 * Combines multiple class values into a single string
 * 
 * @param inputs - Class values to combine
 * @returns A string of combined class names
 * 
 * @example
 * // Basic usage
 * cn('text-red-500', 'bg-blue-200')
 * // => 'text-red-500 bg-blue-200'
 * 
 * @example
 * // With conditional classes
 * cn('btn', { 'btn-primary': isPrimary, 'btn-disabled': isDisabled })
 * // => 'btn btn-primary' or 'btn btn-disabled' or 'btn'
 * 
 * @example
 * // With LESS modules
 * cn(styles.button, 'text-white', { [styles.large]: isLarge })
 * // => 'button_a1b2c3 text-white large_d4e5f6'
 */
export function cn(...inputs: ClassInput[]): string {
  return inputs
    .flatMap(input => {
      // Handle array inputs recursively
      if (Array.isArray(input)) {
        return cn(...input);
      }
      
      // Handle object inputs
      if (input && typeof input === 'object') {
        return Object.entries(input)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key);
      }
      
      // Handle primitive inputs
      return input ? String(input) : '';
    })
    .filter(Boolean)
    .join(' ');
}

/**
 * Creates conditional class names based on a condition
 * 
 * @param condition - Boolean condition
 * @param trueClasses - Classes to apply when condition is true
 * @param falseClasses - Optional classes to apply when condition is false
 * @returns The appropriate class names based on the condition
 * 
 * @example
 * // Basic usage
 * cx(isActive, 'bg-blue-500', 'bg-gray-200')
 * // => 'bg-blue-500' when isActive is true, 'bg-gray-200' when false
 */
export function cx(
  condition: boolean,
  trueClasses: ClassInput,
  falseClasses?: ClassInput
): string {
  return cn(condition ? trueClasses : falseClasses);
}

/**
 * Creates variant-based class names
 * 
 * @param variant - The current variant
 * @param variantClasses - Object mapping variants to class names
 * @returns The class names for the current variant
 * 
 * @example
 * // Usage with variants
 * const buttonVariants = {
 *   primary: 'bg-blue-500 text-white',
 *   secondary: 'bg-gray-200 text-gray-800',
 *   danger: 'bg-red-500 text-white'
 * };
 * 
 * vx('primary', buttonVariants)
 * // => 'bg-blue-500 text-white'
 */
export function vx<T extends string>(
  variant: T,
  variantClasses: Record<T, ClassInput>
): string {
  return cn(variantClasses[variant]);
}

/**
 * Creates size-based class names
 * 
 * @param size - The current size
 * @param sizeClasses - Object mapping sizes to class names
 * @returns The class names for the current size
 * 
 * @example
 * // Usage with sizes
 * const buttonSizes = {
 *   sm: 'text-sm py-1 px-2',
 *   md: 'text-base py-2 px-4',
 *   lg: 'text-lg py-3 px-6'
 * };
 * 
 * sx('md', buttonSizes)
 * // => 'text-base py-2 px-4'
 */
export function sx<T extends string>(
  size: T,
  sizeClasses: Record<T, ClassInput>
): string {
  return cn(sizeClasses[size]);
}

export default cn;