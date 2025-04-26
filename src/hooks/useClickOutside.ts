/**
 * Hook for detecting clicks outside of a specified element
 * 
 * This hook is useful for components like dropdowns, modals, and popovers
 * that need to close when the user clicks outside of them.
 */

import { useEffect, useRef, RefObject } from 'react';

/**
 * Options for the useClickOutside hook
 */
interface UseClickOutsideOptions {
  /** Whether the hook is enabled */
  enabled?: boolean;
  /** Elements to exclude from triggering the outside click */
  excludeRefs?: RefObject<HTMLElement>[];
}

/**
 * Hook to detect clicks outside of a specified element
 * 
 * @param callback - Function to call when a click outside is detected
 * @param options - Options for the hook
 * @returns Ref to attach to the element
 * 
 * @example
 * // Basic usage
 * const dropdownRef = useClickOutside(() => {
 *   setIsOpen(false);
 * });
 * 
 * return (
 *   <div ref={dropdownRef}>
 *     Dropdown content
 *   </div>
 * );
 * 
 * @example
 * // With excluded elements
 * const buttonRef = useRef(null);
 * const dropdownRef = useClickOutside(
 *   () => setIsOpen(false),
 *   { excludeRefs: [buttonRef] }
 * );
 * 
 * return (
 *   <>
 *     <button ref={buttonRef}>Toggle</button>
 *     {isOpen && (
 *       <div ref={dropdownRef}>
 *         Dropdown content
 *       </div>
 *     )}
 *   </>
 * );
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void,
  options: UseClickOutsideOptions = {}
): RefObject<T> {
  const { enabled = true, excludeRefs = [] } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click was outside the ref element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // Check if the click was inside any of the excluded elements
        const isInsideExcludedElement = excludeRefs.some(
          excludeRef => excludeRef.current && excludeRef.current.contains(event.target as Node)
        );

        if (!isInsideExcludedElement) {
          callback();
        }
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, enabled, excludeRefs]);

  return ref;
}

export default useClickOutside;