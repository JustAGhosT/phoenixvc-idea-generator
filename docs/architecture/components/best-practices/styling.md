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

### BEM-Inspired Naming

Use BEM-inspired naming in CSS Modules:

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

### Consistent Class Naming

Use consistent class naming patterns:

```css
/* Good: Consistent naming */
.button { }
.buttonPrimary { }
.buttonSecondary { }
.buttonLarge { }
.buttonSmall { }

/* Bad: Inconsistent naming */
.button { }
.primaryBtn { }
.secondary { }
.lg { }
.sm { }
```

## Design Tokens

Use design tokens for consistent styling:

```css
/* tokens.css */
:root {
  /* Colors */
  --color-primary: #0070f3;
  --color-secondary: #6b46c1;
  --color-success: #0070f3;
  --color-danger: #e53e3e;
  --color-warning: #dd6b20;
  --color-info: #3182ce;
  
  /* Typography */
  --font-family-base: system-ui, -apple-system, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Border radius */
  --radius-sm: 0.125rem;
  --radius-md: 0.25rem;
  --radius-lg: 0.5rem;
  --radius-full: 9999px;
}
```

## Layout Patterns

### Responsive Design

Use responsive design patterns:

```css
.container {
  width: 100%;
  padding: 0 var(--spacing-md);
  margin: 0 auto;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}
```

### Flexbox and Grid

Use Flexbox and Grid for layouts:

```css
/* Flexbox example */
.card {
  display: flex;
  flex-direction: column;
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Grid example */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-md);
}
```

## Component Variants

### Variant Patterns

Create component variants using CSS classes:

```css
/* Button variants */
.button {
  /* Base styles */
}

.buttonPrimary {
  /* Primary variant */
}

.buttonSecondary {
  /* Secondary variant */
}

.buttonOutline {
  /* Outline variant */
}
```

```tsx
function Button({ variant = 'primary', size = 'md', ...props }) {
  return (
    <button
      className={cn(
        styles.button,
        styles[`button${capitalize(variant)}`],
        styles[`button${capitalize(size)}`]
      )}
      {...props}
    />
  );
}
```

## Theme Support

### Theme Variables

Use CSS variables for theming:

```css
/* Light theme (default) */
:root {
  --color-background: #ffffff;
  --color-foreground: #000000;
  --color-primary: #0070f3;
  --color-secondary: #6b46c1;
}

/* Dark theme */
[data-theme="dark"] {
  --color-background: #1a202c;
  --color-foreground: #ffffff;
  --color-primary: #3182ce;
  --color-secondary: #805ad5;
}
```

### Theme Switching

Implement theme switching:

```tsx
function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  );
}
```

## Style Composition

### Utility Functions

Use utility functions for composing styles:

```tsx
// Utility function for composing class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Usage
<div className={cn(
  styles.card,
  isActive && styles.cardActive,
  isDisabled && styles.cardDisabled,
  className
)}>
  {children}
</div>
```

## Global Styles

### Reset and Base Styles

Include reset and base styles:

```css
/* reset.css */
*, *::before, *::after {
  box-sizing: border-box;
}

body, h1, h2, h3, h4, p, figure, blockquote, dl, dd {
  margin: 0;
}

/* base.css */
body {
  font-family: var(--font-family-base);
  font-size: var(--font-size-md);
  line-height: 1.5;
  color: var(--color-foreground);
  background-color: var(--color-background);
}
```

## Performance Considerations

### Reduce CSS Size

Minimize CSS size:

1. Remove unused styles
2. Use shorthand properties
3. Avoid deeply nested selectors

### Critical CSS

Inline critical CSS for faster initial rendering:

```html
<head>
  <style>
    /* Critical CSS for above-the-fold content */
    .header { /* ... */ }
    .hero { /* ... */ }
  </style>
  <link rel="stylesheet" href="/styles.css" media="print" onload="this.media='all'">
</head>
```

## Animation Best Practices

### Performant Animations

Create performant animations:

```css
/* Use transform and opacity for smooth animations */
.button {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button:active {
  transform: translateY(0);
}
```

### Reduced Motion

Respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Styling Anti-patterns

### Avoid Inline Styles

Avoid inline styles for better maintainability:

```tsx
// Bad: Inline styles
<div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
  Content
</div>

// Good: CSS Modules
<div className={styles.container}>
  Content
</div>
```

### Avoid Global Selectors

Avoid global selectors to prevent style conflicts:

```css
/* Bad: Global selectors */
.button { /* ... */ }

/* Good: Scoped selectors with CSS Modules */
.button { /* ... */ }
```

### Avoid !important

Avoid using `!important` unless absolutely necessary:

```css
/* Bad: Overusing !important */
.button {
  color: red !important;
}

/* Good: Properly structured CSS with appropriate specificity */
.buttonDanger {
  color: red;
}
```