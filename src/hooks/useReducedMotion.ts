import { useState, useEffect } from 'react';

/**
 * Hook that detects if the user has requested reduced motion
 * through their operating system preferences.
 * 
 * @returns {boolean} True if the user prefers reduced motion, false otherwise
 * 
 * @example
 * ```tsx
 * const Component = () => {
 *   const prefersReducedMotion = useReducedMotion();
 *   
 *   return (
 *     <div className={prefersReducedMotion ? 'no-animation' : 'with-animation'}>
 *       Content
 *     </div>
 *   );
 * };
 * ```
 */
export function useReducedMotion(): boolean {
  // Initialize with null and update after mount to avoid hydration mismatch
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Check if window is defined (for SSR compatibility)
    if (typeof window === 'undefined') {
      return;
    }
    
    // Create media query to detect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Create event listener function
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    
    // Add event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }
    
    // Clean up
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
  
  // Return false during SSR, then update after mount
  return prefersReducedMotion ?? false;
}

export default useReducedMotion;