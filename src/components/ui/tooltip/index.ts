/**
 * Tooltip component exports
 * 
 * This file exports the Tooltip component and its subcomponents.
 * It supports both the compound component pattern and individual component imports.
 */

// Export the main Tooltip component with all subcomponents attached
export { default as Tooltip } from './Tooltip';
export { default } from './Tooltip';

// Export individual components for direct imports
export { TooltipProvider } from './parts/TooltipProvider';
export { TooltipTrigger } from './parts/TooltipTrigger';
export { TooltipContent } from './parts/TooltipContent';