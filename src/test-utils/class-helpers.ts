/**
 * Helper functions for testing CSS classes in a way that's resilient to naming changes
 */

/**
 * Creates a function that checks if an element has a class with the component prefix or without
 * This makes tests resilient to class naming changes
 * 
 * @param componentName The name of the component (e.g., 'button', 'quoteDisplay')
 * @returns A function that checks for component-prefixed or unprefixed classes
 */
export function createClassChecker(componentName: string) {
  const prefix = componentName.charAt(0).toLowerCase() + componentName.slice(1);
  
  return {
    /**
     * Checks if an element has a component-prefixed class or the unprefixed version
     * 
     * @param element The DOM element to check
     * @param className The class name without the component prefix
     * @returns boolean
     */
    hasComponentClass: (element: Element, className: string): boolean => {
      // First letter of className should be uppercase for the concatenation
      const formattedClassName = className.charAt(0).toUpperCase() + className.slice(1);
      const prefixedClassName = `${prefix}${formattedClassName}`;
      
      // Check for both prefixed and unprefixed versions
      return element.classList.contains(prefixedClassName) || 
             element.classList.contains(className);
    },
    
    /**
     * Gets all possible class names (prefixed and unprefixed)
     * 
     * @param className The class name without the component prefix
     * @returns Array of possible class names
     */
    getPossibleClassNames: (className: string): string[] => {
      // First letter of className should be uppercase for the concatenation
      const formattedClassName = className.charAt(0).toUpperCase() + className.slice(1);
      const prefixedClassName = `${prefix}${formattedClassName}`;
      
      return [prefixedClassName, className];
    }
  };
}

/**
 * Custom Jest matcher to check if an element has a component class
 * This works with both prefixed and unprefixed class names
 * 
 * @example
 * // In your test file:
 * import { toHaveComponentClass } from '../test-utils/class-helpers';
 * expect.extend({ toHaveComponentClass });
 * 
 * // Then in your tests:
 * expect(element).toHaveComponentClass('button', 'primary');
 */
export function toHaveComponentClass(received: Element, componentName: string, className: string) {
  const checker = createClassChecker(componentName);
  const pass = checker.hasComponentClass(received, className);
  const possibleClassNames = checker.getPossibleClassNames(className).join(' or ');
  
  return {
    pass,
    message: () => 
      pass
        ? `Expected element not to have class ${possibleClassNames}`
        : `Expected element to have class ${possibleClassNames}`
  };
}

/**
 * Example usage:
 * 
 * // In your test file:
 * import { createClassChecker, toHaveComponentClass } from '../test-utils/class-helpers';
 * expect.extend({ toHaveComponentClass });
 * 
 * const buttonClasses = createClassChecker('button');
 * 
 * // Instead of:
 * expect(element).toHaveClass('buttonPrimary');
 * 
 * // You can use:
 * expect(buttonClasses.hasComponentClass(element, 'primary')).toBe(true);
 * 
 * // Or with the custom matcher:
 * expect(element).toHaveComponentClass('button', 'primary');
 */