# CSS Modules and Tailwind Integration Guide

This guide outlines our approach to integrating CSS Modules with Tailwind CSS in our component library.

## Core Principles

1. **Keep all component styles at the component root level**
   - Each component has a single CSS Module file at the root level
   - Subcomponents import styles from the parent component's CSS file

2. **Always use relative paths for style imports**
   - Main component: `import styles from './ComponentName.module.css';`
   - Subcomponents: `import styles from '../ComponentName.module.css';`

3. **Use component-prefixed class names**
   - All class names should be prefixed with the component name
   - Example: `.button`, `.buttonPrimary`, `.buttonIcon`

## Component Structure Example

```
button/
├── Button.tsx               # Main component
├── Button.module.css        # All button styles in one file
├── index.ts                 # Exports
└── parts/
    ├── ButtonIcon.tsx       # Imports styles from ../Button.module.css
    └── ButtonLabel.tsx      # Imports styles from ../Button.module.css
```

## CSS Module Example

```css
/* Button.module.css */
.button {
  @apply inline-flex items-center justify-center rounded-md;
  padding: var(--button-padding, 0.5rem 1rem);
}

.buttonPrimary {
  @apply bg-primary-500 text-white;
}

.buttonSecondary {
  @apply bg-secondary-500 text-white;
}

.buttonIcon {
  @apply mr-2;
}

.buttonLabel {
  @apply font-medium;
}
```

## Component Implementation Example

```tsx
// Button.tsx
import styles from './Button.module.css';
import { cn } from '@/utils/classnames';

function Button({ variant = 'primary', className, children, ...props }) {
  return (
    <button
      className={cn(
        styles.button,
        styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

```tsx
// parts/ButtonIcon.tsx
import styles from '../Button.module.css';
import { cn } from '@/utils/classnames';

function ButtonIcon({ className, children }) {
  return (
    <span className={cn(styles.buttonIcon, className)}>
      {children}
    </span>
  );
}
```

## Migration Process from LESS to CSS Modules with Tailwind

When migrating a component, follow these steps:

1. Create the component directory structure
2. Create a new CSS Module file (.module.css) at the component root level
3. Convert LESS styles to CSS Module styles, incorporating Tailwind utilities
4. Update all component and subcomponent files to import styles from the correct relative path
5. Ensure class names follow the component-prefixed naming convention
6. Remove any duplicate CSS files in subdirectories

## Utility Functions for Class Names

We use utility functions to combine CSS Module classes with Tailwind classes:

```typescript
// utils/classnames.ts
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}
```

Usage in components:

```tsx
import styles from './ComponentName.module.css';
import { cn } from '@/utils/classnames';

function ComponentName({ className, variant = 'primary', ...props }) {
  return (
    <div 
      className={cn(
        styles.component,
        styles[`component${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
        className
      )}
      {...props}
    />
  )
}
```

## Migration Checklist

For each component:

1. ✅ Create CSS Module file (.module.css) at the component root level
2. ✅ Convert styles to follow component-prefixed naming convention
3. ✅ Update all imports to use relative paths
4. ✅ Remove any duplicate CSS files in subdirectories
5. ✅ Test the component visually and functionally
6. ✅ Update documentation to reflect the new structure

## Best Practices

1. **Use Tailwind First**: Leverage Tailwind utilities before writing custom CSS
2. **Modular Styles**: Keep styles scoped to their components
3. **Consistent Naming**: Use camelCase for CSS class names, prefixed with component name
4. **Responsive Design**: Use Tailwind's responsive utilities
5. **Theme Consistency**: Use CSS variables for theme values
6. **Avoid Global Styles**: Minimize global styles in favor of component-scoped styles
7. **Composition**: Compose styles using the `cn` utility function

## Implementation Tasks

### Identify Components Needing Updates

1. **Identify components with incorrectly placed CSS files**
   - Look for CSS/LESS files in subdirectories that should be at the component root
   - Check for duplicate style files across component directories

2. **Identify components with incorrect import paths**
   - Find absolute imports for styles that should be relative
   - Check for imports using incorrect paths (e.g., wrong directory level)

3. **Identify components with inconsistent class naming**
   - Look for class names that don't follow the component-prefixed convention
   - Check for inconsistent casing (kebab-case vs camelCase)

### Update Documentation

1. **Update styling best practices documentation**
   - Ensure all documentation reflects the CSS Modules + Tailwind approach
   - Add examples of correct and incorrect patterns

2. **Update component structure documentation**
   - Ensure component directory structure guidelines are consistent
   - Add visual diagrams of correct component organization

3. **Update migration guides**
   - Provide step-by-step instructions for converting existing components
   - Include before/after examples for common components

### Standardize Components

1. **Move all CSS Module files to component root level**
   - Relocate any CSS files from subdirectories to the component root
   - Update imports in all affected files

2. **Update all import paths to use relative paths**
   - Convert absolute imports to relative imports
   - Ensure subcomponents use parent-relative paths (`../Component.module.css`)

3. **Rename CSS classes to follow component-prefixed naming**
   - Update class names to use component prefix
   - Ensure consistent camelCase naming

### Add Linting Rules

1. **Consider adding ESLint rules to enforce the new standards**
   - Create custom ESLint rules for CSS Module imports
   - Add naming convention checks for CSS class names

2. **Add path checking to prevent absolute imports for component styles**
   - Configure ESLint to flag absolute imports for component styles
   - Add automated testing for style import patterns