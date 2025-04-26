# Styling Approach

This document outlines our styling approach as we migrate from LESS to CSS Modules with Tailwind CSS integration.

## Styling Technologies

We use a combination of styling approaches:

1. **CSS Modules** - For component-specific styles with local scoping
2. **Tailwind CSS** - For utility-based styling and consistent design tokens
3. **CSS Variables** - For theme values and dynamic styling

## 1. CSS Modules

CSS Modules provide local scoping for component styles, preventing style conflicts and improving maintainability:

```css
/* Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

.button--primary {
  background-color: var(--color-primary);
  color: white;
}

.button--secondary {
  background-color: var(--color-secondary);
  color: white;
}

.button--outline {
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.button--sm {
  height: 2rem;
  padding: 0 0.75rem;
  font-size: 0.875rem;
}

.button--md {
  height: 2.5rem;
  padding: 0 1rem;
  font-size: 1rem;
}

.button--lg {
  height: 3rem;
  padding: 0 1.5rem;
  font-size: 1.125rem;
}
```

```tsx
// Button.tsx
import styles from './Button.module.css';
import { cn } from '@/utils/classnames';

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### CSS Modules Best Practices

1. **Use meaningful class names** - Name classes based on their purpose, not their appearance
2. **Follow BEM-like naming** - Use `component`, `component--modifier`, and `component__element` patterns
3. **Keep files small** - Each component should have its own CSS Module file
4. **Use composition** - Compose styles from other CSS Modules when appropriate
5. **Use CSS variables** - Use CSS variables for theme values and dynamic styling

## 2. Tailwind CSS Integration

We integrate Tailwind CSS with CSS Modules for utility-based styling:

```tsx
// Using Tailwind with CSS Modules
import styles from './Card.module.css';
import { cn } from '@/utils/classnames';

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        // CSS Module styles for component-specific styling
        styles.card,
        // Tailwind utilities for common styling needs
        'rounded-lg shadow-md overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

### Tailwind Integration Best Practices

1. **Use Tailwind for layout and common utilities** - Padding, margin, flex, grid, etc.
2. **Use CSS Modules for component-specific styling** - Custom appearances, animations, etc.
3. **Use the `cn` utility** - Combine CSS Module classes with Tailwind utilities
4. **Extend Tailwind theme** - Customize the Tailwind theme to match your design system
5. **Use Tailwind's JIT mode** - Enable Just-in-Time mode for faster builds and smaller CSS

## 3. CSS Variables for Theming

We use CSS variables for theming and dynamic styling:

```css
/* global.css */
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-primary-light: #60a5fa;
  --color-primary-dark: #2563eb;
  --color-secondary: #10b981;
  --color-secondary-light: #34d399;
  --color-secondary-dark: #059669;
  --color-background: #ffffff;
  --color-foreground: #f9fafb;
  --color-border: #e5e7eb;
  --color-text: #111827;
  --color-text-secondary: #6b7280;
  
  /* Typography */
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  
  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  
  /* Border Radius */
  --radius-sm: 0.125rem;
  --radius: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Dark theme */
:root[data-theme="dark"] {
  --color-primary: #3b82f6;
  --color-primary-light: #60a5fa;
  --color-primary-dark: #2563eb;
  --color-secondary: #10b981;
  --color-secondary-light: #34d399;
  --color-secondary-dark: #059669;
  --color-background: #111827;
  --color-foreground: #1f2937;
  --color-border: #374151;
  --color-text: #f9fafb;
  --color-text-secondary: #9ca3af;
}
```

### CSS Variables Best Practices

1. **Define variables at the root level** - Make variables available globally
2. **Use semantic variable names** - Name variables based on their purpose, not their value
3. **Provide fallback values** - Always provide fallback values for CSS variables
4. **Organize variables by category** - Group variables by category (colors, spacing, etc.)
5. **Use theme-specific variables** - Define separate variables for light and dark themes

## 4. Dark Mode Support

We implement dark mode using CSS variables and the `data-theme` attribute:

```css
/* Component-specific dark mode styles */
.card {
  background-color: var(--color-foreground);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

/* Global dark mode selector */
:global(:root[data-theme="dark"]) .card {
  /* Override specific properties for dark mode if needed */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}
```

```tsx
// Theme provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Dark Mode Best Practices

1. **Use CSS variables for theme values** - Define separate variables for light and dark themes
2. **Use the `data-theme` attribute** - Toggle the theme by changing the `data-theme` attribute
3. **Support system preference** - Default to the user's system preference
4. **Persist user preference** - Save the user's theme preference in localStorage
5. **Prevent flash of incorrect theme** - Use server-side rendering or early theme detection

## 5. Migration from LESS to CSS Modules

We are migrating from LESS to CSS Modules. Here's our migration process:

1. **Create a new CSS Module file** - Create a `.module.css` file from the existing `.less` file
2. **Convert LESS syntax to CSS** - Convert LESS-specific syntax to standard CSS
3. **Replace variables** - Replace LESS variables with CSS variables
4. **Update class references** - Update class references in the component
5. **Add dark theme support** - Add dark theme support using `:global` selectors

### Example Migration

Before (LESS):
```less
// Button.less
@import '../../styles/variables.less';

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: @border-radius;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  
  &--primary {
    background-color: @color-primary;
    color: white;
    
    &:hover {
      background-color: darken(@color-primary, 10%);
    }
  }
  
  &--secondary {
    background-color: @color-secondary;
    color: white;
    
    &:hover {
      background-color: darken(@color-secondary, 10%);
    }
  }
  
  &--outline {
    background-color: transparent;
    border: 1px solid @color-border;
    color: @color-text;
    
    &:hover {
      background-color: @color-background-secondary;
    }
  }
  
  &--sm {
    height: 2rem;
    padding: 0 0.75rem;
    font-size: 0.875rem;
  }
  
  &--md {
    height: 2.5rem;
    padding: 0 1rem;
    font-size: 1rem;
  }
  
  &--lg {
    height: 3rem;
    padding: 0 1.5rem;
    font-size: 1.125rem;
  }
}
```

After (CSS Module):
```css
/* Button.module.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

.button--primary {
  background-color: var(--color-primary);
  color: white;
}

.button--primary:hover {
  background-color: var(--color-primary-dark);
}

.button--secondary {
  background-color: var(--color-secondary);
  color: white;
}

.button--secondary:hover {
  background-color: var(--color-secondary-dark);
}

.button--outline {
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.button--outline:hover {
  background-color: var(--color-foreground);
}

.button--sm {
  height: 2rem;
  padding: 0 0.75rem;
  font-size: 0.875rem;
}

.button--md {
  height: 2.5rem;
  padding: 0 1rem;
  font-size: 1rem;
}

.button--lg {
  height: 3rem;
  padding: 0 1.5rem;
  font-size: 1.125rem;
}

/* Dark mode specific overrides if needed */
:global(:root[data-theme="dark"]) .button--outline:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
```

## 6. Utility Functions

We use utility functions to help with class composition:

```tsx
// utils/classnames.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class values into a single string,
 * resolving Tailwind conflicts using twMerge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Conditionally applies classes based on a condition
 */
export function cx(
  condition: boolean,
  trueClasses: ClassValue,
  falseClasses?: ClassValue
) {
  return condition ? trueClasses : falseClasses || '';
}

/**
 * Applies classes based on a size value
 */
export function sx<T extends string>(
  size: T,
  sizeClasses: Record<T, ClassValue>
) {
  return sizeClasses[size] || '';
}

/**
 * Applies classes based on a variant value
 */
export function vx<T extends string>(
  variant: T,
  variantClasses: Record<T, ClassValue>
) {
  return variantClasses[variant] || '';
}
```

### Utility Function Best Practices

1. **Use `cn` for class composition** - Combine CSS Module classes with Tailwind utilities
2. **Use `cx` for conditional classes** - Apply classes conditionally
3. **Use `sx` for size-based classes** - Apply classes based on size props
4. **Use `vx` for variant-based classes** - Apply classes based on variant props

## 7. Responsive Design

We implement responsive design using CSS media queries and Tailwind's responsive utilities:

```css
/* CSS Module media queries */
.card {
  padding: var(--spacing-4);
}

@media (min-width: 768px) {
  .card {
    padding: var(--spacing-6);
  }
}
```

```tsx
// Tailwind responsive utilities
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

### Responsive Design Best Practices

1. **Mobile-first approach** - Design for mobile first, then enhance for larger screens
2. **Use Tailwind's responsive prefixes** - Use `sm:`, `md:`, `lg:`, `xl:` prefixes for responsive utilities
3. **Use CSS media queries for complex cases** - Use CSS media queries for more complex responsive behavior
4. **Test on multiple devices** - Test responsive design on various devices and screen sizes
5. **Use relative units** - Use relative units (`rem`, `em`) instead of pixels for better scaling