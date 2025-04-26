/**
 * Hook for responsive design based on media queries
 * 
 * This hook allows components to respond to media query changes,
 * such as screen size breakpoints.
 */

import { useState, useEffect } from 'react';

/**
 * Hook to check if a media query matches
 * 
 * @param query - CSS media query string
 * @returns Boolean indicating if the media query matches
 * 
 * @example
 * // Check if screen is at least medium size
 * const isMediumScreen = useMediaQuery('(min-width: 768px)');
 * 
 * @example
 * // Check if user prefers dark mode
 * const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with the current match state
  const getMatches = (): boolean => {
    // Check if window is defined (for SSR)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches());

  useEffect(() => {
    // Get initial match
    setMatches(getMatches());

    // Create media query list
    const mediaQueryList = window.matchMedia(query);

    // Define listener function
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener for older browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(handleChange);
    }

    // Cleanup function
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
}

/**
 * Predefined breakpoint hooks based on the theme breakpoints
 */

/**
 * Check if screen is at least small size (640px)
 */
export function useIsSmScreen(): boolean {
  return useMediaQuery('(min-width: 640px)');
}

/**
 * Check if screen is at least medium size (768px)
 */
export function useIsMdScreen(): boolean {
  return useMediaQuery('(min-width: 768px)');
}

/**
 * Check if screen is at least large size (1024px)
 */
export function useIsLgScreen(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

/**
 * Check if screen is at least extra large size (1280px)
 */
export function useIsXlScreen(): boolean {
  return useMediaQuery('(min-width: 1280px)');
}

/**
 * Check if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/**
 * Check if user prefers dark color scheme
 */
export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)');
}

export default useMediaQuery;