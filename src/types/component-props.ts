/**
 * Common component props shared across multiple components
 */

import { ReactNode, CSSProperties, HTMLAttributes } from 'react';

/**
 * Base props that most components will extend
 */
export interface BaseComponentProps {
  /** Additional class names to apply to the component */
  className?: string;
  /** Inline styles to apply to the component */
  style?: CSSProperties;
  /** ID attribute for the component */
  id?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Data attributes */
  [dataAttribute: `data-${string}`]: string | number | boolean;
}

/**
 * Props for components that can have children
 */
export interface ChildrenProps {
  /** The content to render inside the component */
  children?: ReactNode;
}

/**
 * Props for components that can be referenced
 */
export interface RefProps<T = HTMLElement> {
  /** Ref to the underlying DOM element */
  ref?: React.Ref<T>;
}

/**
 * Props for components that can be tested
 */
export interface TestProps {
  /** Test ID for component testing */
  'data-testid'?: string;
}

/**
 * Props for components that can have different sizes
 */
export interface SizeProps {
  /** Size variant of the component */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Props for components that can have different visual variants
 */
export interface VariantProps {
  /** Visual variant of the component */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
}

/**
 * Props for components that can have different color schemes
 */
export interface ColorProps {
  /** Color scheme of the component */
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
}

/**
 * Props for interactive components
 */
export interface InteractiveProps {
  /** Whether the component is in a loading state */
  loading?: boolean;
  /** Whether the component is in an active state */
  active?: boolean;
  /** Whether the component is in a focused state */
  focused?: boolean;
}

/**
 * Props for form elements
 */
export interface FormElementProps {
  /** Name attribute for the form element */
  name?: string;
  /** Whether the form element is required */
  required?: boolean;
  /** Whether the form element is read-only */
  readOnly?: boolean;
  /** Placeholder text for the form element */
  placeholder?: string;
  /** Whether the form element has an error */
  hasError?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Help text to display */
  helpText?: string;
  /** Label for the form element */
  label?: string;
}

/**
 * Props for components that can be animated
 */
export interface AnimationProps {
  /** Whether to animate the component */
  animate?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Animation delay in milliseconds */
  animationDelay?: number;
}

/**
 * Props for components with accessibility features
 */
export interface AccessibilityProps {
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelledby */
  'aria-labelledby'?: string;
  /** ARIA describedby */
  'aria-describedby'?: string;
  /** ARIA controls */
  'aria-controls'?: string;
  /** ARIA expanded */
  'aria-expanded'?: boolean;
  /** ARIA hidden */
  'aria-hidden'?: boolean;
  /** ARIA pressed */
  'aria-pressed'?: boolean | 'mixed';
  /** ARIA checked */
  'aria-checked'?: boolean | 'mixed';
  /** ARIA selected */
  'aria-selected'?: boolean;
  /** ARIA current */
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  /** ARIA disabled */
  'aria-disabled'?: boolean;
  /** ARIA invalid */
  'aria-invalid'?: boolean | 'grammar' | 'spelling';
  /** ARIA required */
  'aria-required'?: boolean;
  /** ARIA haspopup */
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  /** Tab index */
  tabIndex?: number;
}

/**
 * Combine multiple prop interfaces for a component
 */
export type ComponentProps<T = {}> = BaseComponentProps & 
  ChildrenProps & 
  TestProps & 
  AccessibilityProps & 
  T;