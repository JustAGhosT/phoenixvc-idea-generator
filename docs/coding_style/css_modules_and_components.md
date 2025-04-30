# CSS Modules and Component Organization Style Guide

This document outlines our team's conventions for CSS Modules usage and component organization.

## CSS Modules Notation

### Accessing CSS Classes

When accessing CSS classes from a CSS Module, use the following conventions:

1. **For standard class names without special characters:**
   ```jsx
   // Preferred: Dot notation
   className={styles.card}
   ```

2. **For class names with hyphens, underscores, or other special characters:**
   ```jsx
   // Preferred: Bracket notation
   className={styles['card--elevated']}
   className={styles['card__header']}
   ```

3. **For combining multiple classes:**
   ```jsx
   // Preferred: Use the cn utility
   import { cn } from '@/utils/classnames';

   className={cn(
     styles.card,
     styles['card--elevated'],
     isActive && styles['card--active']
   )}
   ```

### CSS Module File Structure

Organize CSS Module files with the following structure:

1. **Base component styles** at the top
2. **Variants** grouped together
3. **State modifiers** (hover, active, etc.) near their related styles
4. **Subcomponent styles** grouped by subcomponent
5. **Media queries and theme variations** at the bottom

Example:
```css
/* Base styles */
.card {
  /* Base card styles */
}

/* Variants */
.cardPrimary { /* ... */ }
.cardSecondary { /* ... */ }
.cardOutline { /* ... */ }

/* Subcomponents */
.cardHeader { /* ... */ }
.cardContent { /* ... */ }
.cardFooter { /* ... */ }

/* Theme variations */
:global(:root[data-theme="dark"]) .card { /* ... */ }
```

## Component Directory Structure

Organize component directories using the following structure:

```
src/components/ui/[component-name]/
├── index.ts                  # Main exports
├── [ComponentName].tsx       # Main component
├── [ComponentName].module.css # CSS Module styles at root level
├── README.md                 # Documentation
├── parts/                    # Subcomponents
│   ├── [SubComponent1].tsx
│   ├── [SubComponent2].tsx
│   └── ...
└── __tests__/                # Test and story files
    ├── [ComponentName].test.tsx
    ├── [SubComponent].test.tsx
    └── [ComponentName].stories.tsx
```

### Naming Conventions

1. **Component Files:** PascalCase (e.g., `Card.tsx`, `CardHeader.tsx`)
2. **CSS Module Files:** PascalCase.module.css (e.g., `Card.module.css`)
3. **CSS Classes:** camelCase, prefixed with component name (e.g., `card`, `cardHeader`)
4. **Test Files:** PascalCase.test.tsx (e.g., `Card.test.tsx`)
5. **Story Files:** PascalCase.stories.tsx (e.g., `Card.stories.tsx`)
6. **Directory Names:** lowercase with hyphens (e.g., `ui/card/`)
7. **Subcomponent Directory:** `parts/` (preferred over components, subcomponents, or elements)

## Import Paths

1. **For main component styles:**
   ```tsx
   import styles from './ComponentName.module.css';
   ```

2. **For subcomponent styles:**
   ```tsx
   import styles from '../ComponentName.module.css';
   ```

3. **Never use absolute paths for component styles:**
   ```tsx
   // Incorrect
   import styles from '@/components/ui/card/Card.module.css';
   ```

## CSS Modules and Dark Theme Support

For dark theme support, use the `:global` selector with a data attribute:

```css
/* Light theme (default) */
.card {
  background-color: var(--card-bg, white);
  color: var(--text, black);
}

/* Dark theme */
:global(:root[data-theme="dark"]) .card {
  background-color: var(--card-bg-dark, #1a202c);
  color: var(--text-dark, white);
}
```

## CSS Variables

Always provide fallback values for CSS variables:

```css
.card {
  padding: var(--spacing-md, 1rem);
  color: var(--text-primary, #1a202c);
}
```

## Testing CSS Modules

When mocking CSS Modules in tests, use the following pattern:

```tsx
// Mock the styles import
jest.mock('../ComponentName.module.css', () => ({
  card: 'card',
  cardHeader: 'cardHeader',
  cardPrimary: 'cardPrimary',
}));
```

## Component Props Interface

Follow this pattern for component props:

```tsx
export interface ComponentNameProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Description of the prop
   * @default defaultValue
   */
  variant?: 'default' | 'primary' | 'secondary';
  
  /**
   * Description of the prop
   */
  children: React.ReactNode;
}
```

## Compound Components

For compound components, use the following pattern:

```tsx
// Main component
export const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>((props, ref) => {
  // Component implementation
});

ComponentName.displayName = "ComponentName";

// Attach subcomponents
ComponentName.SubComponent = SubComponent;

export default ComponentName;
```