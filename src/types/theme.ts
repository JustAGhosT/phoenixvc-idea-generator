/**
 * Theme type definitions for the application
 */

/**
 * Color theme definition
 */
export type Theme = 'light' | 'dark';

/**
 * Color palette definition
 */
export interface ColorPalette {
  primary: string;
  'primary-light': string;
  'primary-dark': string;
  success: string;
  'success-light': string;
  'success-dark': string;
  warning: string;
  'warning-light': string;
  'warning-dark': string;
  danger: string;
  'danger-light': string;
  'danger-dark': string;
  info: string;
  'info-light': string;
  'info-dark': string;
  'text-primary': string;
  'text-secondary': string;
  'text-disabled': string;
  'background-card': string;
  'background-page': string;
  'background-secondary': string;
  'border-color': string;
}

/**
 * Spacing scale definition
 */
export interface SpacingScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

/**
 * Typography scale definition
 */
export interface TypographyScale {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
}

/**
 * Breakpoints definition
 */
export interface Breakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

/**
 * Border radius definition
 */
export interface BorderRadius {
  sm: string;
  md: string;
  lg: string;
  full: string;
}

/**
 * Shadow definition
 */
export interface Shadows {
  sm: string;
  md: string;
  lg: string;
}

/**
 * Complete theme definition
 */
export interface ThemeDefinition {
  name: Theme;
  colors: ColorPalette;
  spacing: SpacingScale;
  typography: TypographyScale;
  breakpoints: Breakpoints;
  borderRadius: BorderRadius;
  shadows: Shadows;
}

/**
 * Theme context type
 */
export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

/**
 * Available color schemes for components
 */
export type ColorScheme = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';

/**
 * Available sizes for components
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Available variants for components
 */
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';