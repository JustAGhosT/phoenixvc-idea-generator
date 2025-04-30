# Styling Best Practices

This document outlines our best practices for styling components.

## Styling Principles

1. **Consistency** - Follow a consistent styling approach across components
2. **Modularity** - Keep styles modular and scoped to components
3. **Maintainability** - Write styles that are easy to maintain and update
4. **Performance** - Optimize styles for performance

## CSS Modules

We use CSS Modules as our primary styling approach:

```css
/* Button.module.css */
.button {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
}

.primary {
  background-color: var(--color-primary);
  color: white;
}

.secondary {
  background-color: var(--color-secondary);
  color: white;
}
```

```tsx
// Button.tsx
import styles from './Button.module.css';
import { cn } from '@/utils/classnames';

function Button({ variant = 'primary', className, children, ...props }) {
  return (
    <button
      className={cn(styles.button, styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
```

## Naming Conventions

### Component-First Naming

Use component-first naming in CSS Modules to clearly associate styles with components:

```css
/* Component */
.card { }

/* Element */
.cardHeader { }
.cardBody { }
.cardFooter { }

/* Modifier */
.cardSmall { }
.cardLarge { }
.cardPrimary { }
```

## File Structure Standards

### 1. Keep CSS Module Files at Component Root Level

```
button/
├── Button.tsx
├── Button.module.css  <- Always at root level
├── index.ts
└── parts/
    ├── ButtonIcon.tsx
    └── ButtonSpinner.tsx
```

### 2. Import Styles Using Relative Paths

```tsx
// In Button.tsx
import styles from './Button.module.css';

// In parts/ButtonIcon.tsx
import styles from '../Button.module.css';
```

### 3. Avoid Duplicate CSS Files

Don't create separate CSS files for subcomponents. Instead, use the main component's CSS file with properly namespaced classes.