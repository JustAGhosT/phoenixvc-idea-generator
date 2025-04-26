# Styling Approach

This document outlines our styling approach for the application, explaining the transition from LESS to CSS Modules with Tailwind CSS.

## Styling Options Considered

We evaluated several styling approaches for our React components:

### 1. LESS Modules

**Pros:**
- Powerful preprocessor with variables, mixins, and functions
- Nesting capabilities for more readable CSS
- Mathematical operations and color manipulations
- Modular approach with imports

**Cons:**
- Requires additional build configuration
- Adds complexity to the build pipeline
- Requires TypeScript declaration files
- Less integrated with Next.js than CSS Modules

### 2. CSS Modules

**Pros:**
- Native support in Next.js without additional configuration
- Automatic TypeScript type generation
- Scoped CSS classes to prevent naming collisions
- Simpler build process
- Better performance in Next.js build pipeline

**Cons:**
- Lacks preprocessor features like variables and mixins
- No built-in nesting capabilities (though modern CSS has some nesting)
- Less powerful than LESS for complex styling patterns

### 3. Tailwind CSS

**Pros:**
- Utility-first approach speeds up development
- Consistent design system with predefined values
- Highly customizable through configuration
- Excellent integration with Next.js
- Reduces CSS bundle size through PurgeCSS
- Great developer experience with IntelliSense

**Cons:**
- Learning curve for utility-based approach
- HTML can become verbose with many utility classes
- Some complex designs may still require custom CSS

### 4. CSS-in-JS (Styled Components, Emotion)

**Pros:**
- Co-located styles with components
- Full JavaScript power for dynamic styling
- Runtime styling capabilities

**Cons:**
- Runtime performance cost
- Larger bundle size
- More complex SSR setup

## Our Approach: CSS Modules + Tailwind CSS

After careful consideration, we've chosen to use **CSS Modules with Tailwind CSS** for the following reasons:

1. **Best of both worlds**: Tailwind for rapid development of common patterns, CSS Modules for component-specific styling
2. **Native Next.js support**: Both technologies are well-supported in Next.js without additional configuration
3. **Performance**: CSS Modules are processed at build time, resulting in optimal runtime performance
4. **Type safety**: Automatic TypeScript type generation for CSS Modules
5. **Maintainability**: Clear separation of concerns while keeping styles close to components
6. **Modern CSS features**: CSS Variables can replace most LESS variables, and modern CSS has limited nesting capabilities

## Implementation Strategy

Our implementation uses:

1. **Tailwind CSS** for utility classes and design system consistency
2. **CSS Modules** (`.module.css` files) for component-specific styling
3. **CSS Variables** for global design tokens (replacing LESS variables)
4. **`cn()` utility** for merging Tailwind classes with CSS Module classes

## Example Component

```tsx
// Button.tsx
import styles from './Button.module.css';
import { cn } from '@/utils/classnames';

export function Button({ variant = 'primary', size = 'md', className, ...props }) {
  return (
    <button
      className={cn(
        // Tailwind classes for common patterns
        'rounded font-medium transition-colors focus:outline-none focus:ring-2',
        // CSS Module classes for component-specific styling
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        // Additional custom classes
        className
      )}
      {...props}
    />
  );
}