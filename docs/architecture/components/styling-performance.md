# Styling and Performance

This document covers our approach to organizing styles and optimizing performance in our component library.

## CSS Module Organization

We organize our CSS Modules with a consistent structure:

```css
/* Button.module.css */

/* Base styles */
.button {
  /* Base button styles */
}

/* Variants */
.button--primary {
  /* Primary variant styles */
}

.button--secondary {
  /* Secondary variant styles */
}

/* Sizes */
.button--sm {
  /* Small size styles */
}

.button--md {
  /* Medium size styles */
}

/* States */
.button:hover {
  /* Hover state styles */
}

.button:disabled {
  /* Disabled state styles */
}

/* Dark mode overrides */
:global(:root[data-theme="dark"]) .button {
  /* Dark mode styles */
}
```

## Performance Considerations

We optimize our styles for performance:

### 1. Minimize Specificity

High specificity selectors can lead to specificity wars and make styles harder to override. We use low-specificity selectors:

```css
/* Good - Low specificity */
.button {
  background-color: var(--color-primary);
}

/* Avoid - High specificity */
.container .sidebar .button {
  background-color: var(--color-primary);
}
```

### 2. Avoid Descendant Selectors

Descendant selectors can be performance bottlenecks. We use direct child selectors when possible:

```css
/* Good - Direct child selector */
.card > .header {
  font-weight: bold;
}

/* Avoid - Descendant selector */
.card .header {
  font-weight: bold;
}
```

### 3. Limit Animations

We animate only necessary properties and use `will-change` sparingly:

```css
/* Good - Animate only necessary properties */
.button {
  transition: transform 0.2s, opacity 0.2s;
}

/* Avoid - Animating everything */
.button {
  transition: all 0.2s;
}

/* Use will-change sparingly */
.card:hover {
  will-change: transform;
}
```

### 4. Leverage Tailwind's JIT

We use Tailwind's Just-in-Time mode to minimize CSS bundle size:

```js
// tailwind.config.js
module.exports = {
  mode: 'jit',
  // rest of the config
};
```

### 5. Code Splitting

We use code splitting to load styles only when needed:

```tsx
// Lazy-loaded component with styles
import { lazy } from 'react';

const Modal = lazy(() => import('@/components/ui/modal'));

function App() {
  return (
    <div>
      {showModal && <Modal />}
    </div>
  );
}
```

## Styling Guidelines for Different Component Types

### 1. Layout Components

Layout components should use Tailwind for flexibility:

```tsx
// Layout component with Tailwind
function Grid({ columns = 3, gap = 4, children }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-${gap}`}>
      {children}
    </div>
  );
}
```

### 2. UI Components

UI components should use CSS Modules for consistent styling:

```tsx
// UI component with CSS Modules
import styles from './Button.module.css';
import { cn } from '@/utils/classnames';

function Button({ variant = 'primary', className, children, ...props }) {
  return (
    <button
      className={cn(
        styles.button,
        styles[`button--${variant}`],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 3. Page Components

Page components should combine both approaches:

```tsx
// Page component
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.home}>
      <header className="w-full py-4 bg-primary text-white">
        <h1 className={styles.title}>Welcome</h1>
      </header>
      <main className="container mx-auto py-8">
        <section className={styles.heroSection}>
          {/* Content */}
        </section>
      </main>
    </div>
  );
}
```

## Style Debugging and Documentation

### Debugging

We use browser developer tools to debug styles:

1. **Inspect element** - Use browser developer tools to inspect element styles
2. **CSS Module class names** - CSS Modules generate unique class names that can be inspected
3. **CSS Variables** - Inspect CSS variables in the browser developer tools

### Documentation

We document our styling approach for better maintainability:

1. **Component documentation** - Document component props and styling options
2. **Style guide** - Maintain a style guide with examples of all components
3. **Design tokens** - Document all design tokens (colors, spacing, etc.)

### Style Linting

We use stylelint to enforce styling best practices:

```js
// .stylelintrc.js
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
  ],
  rules: {
    'selector-class-pattern': '^[a-z][a-zA-Z0-9]*(__[a-z][a-zA-Z0-9]*)?(-{1,2}[a-z][a-zA-Z0-9]*)?$',
    'selector-id-pattern': '^[a-z][a-zA-Z0-9]*$',
    'no-descending-specificity': null,
    'no-duplicate-selectors': true,
    'declaration-block-no-duplicate-properties': true,
  },
};
```

## Conclusion

Our approach to organizing styles and optimizing performance focuses on maintainability, scalability, and performance. By following these best practices, we create a consistent and efficient styling system that works well for both developers and users.