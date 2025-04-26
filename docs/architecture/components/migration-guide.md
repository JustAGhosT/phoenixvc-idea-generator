# Migration Guide: LESS to CSS Modules with Tailwind

This guide provides a step-by-step approach for migrating components from LESS to CSS Modules with Tailwind CSS.

## Migration Overview

### Benefits of Migration

1. **Scoped Styles** - CSS Modules provide local scoping to prevent style conflicts
2. **Utility-First Approach** - Tailwind CSS offers utility classes for rapid development
3. **Improved Performance** - Reduced CSS bundle size through better tree-shaking
4. **Better Developer Experience** - Consistent styling patterns and reduced maintenance

### Migration Strategy

We recommend an incremental migration approach:

1. Migrate one component or feature at a time
2. Start with leaf components before container components
3. Add comprehensive tests before migration
4. Validate visual consistency after migration

## Step-by-Step Migration Process

### 1. Setup and Prerequisites

Ensure your project has the necessary dependencies:

```bash
# Install required packages
npm install tailwindcss postcss autoprefixer
npm install -D postcss-loader

# Initialize Tailwind CSS
npx tailwindcss init -p
```

Configure Tailwind in `tailwind.config.js`:

```js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Extend theme with your design tokens
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... other shades
          500: '#0ea5e9',
          // ... other shades
          900: '#0c4a6e',
        },
        // ... other color categories
      },
      // ... other theme extensions
    },
  },
  plugins: [],
}
```

### 2. Create CSS Module for a Component

For each component you're migrating:

1. Create a new CSS Module file with the same name as your component:

```
Button.less → Button.module.css
```

2. Move styles from LESS to CSS Module, converting LESS syntax to CSS:

```less
// Original Button.less
.button {
  padding: @spacing-md;
  border-radius: @border-radius-md;
  
  &.primary {
    background-color: @color-primary;
    color: white;
  }
  
  &.secondary {
    background-color: @color-secondary;
    color: white;
  }
  
  &:hover {
    opacity: 0.9;
  }
}
```

```css
/* New Button.module.css */
.button {
  padding: 1rem;
  border-radius: 0.25rem;
}

.primary {
  background-color: var(--color-primary);
  color: white;
}

.secondary {
  background-color: var(--color-secondary);
  color: white;
}

.button:hover {
  opacity: 0.9;
}
```

### 3. Incorporate Tailwind Utilities

Refactor the CSS Module to use Tailwind utilities where appropriate:

```css
/* Button.module.css with Tailwind */
.button {
  @apply py-4 px-4 rounded-md transition-opacity;
}

.primary {
  @apply bg-primary-500 text-white;
}

.secondary {
  @apply bg-secondary-500 text-white;
}

.button:hover {
  @apply opacity-90;
}
```

### 4. Update Component Implementation

Update your component to use the CSS Module:

```tsx
// Before: Using LESS
import './Button.less';

function Button({ variant = 'primary', children, ...props }) {
  return (
    <button className={`button ${variant}`} {...props}>
      {children}
    </button>
  );
}
```

```tsx
// After: Using CSS Module
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

### 5. Create Utility Function for Class Names

Create a utility function to combine class names:

```tsx
// utils/classnames.ts
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}
```

### 6. Handle Dynamic Styles

For dynamic styles, use computed class names:

```tsx
// Before: Using LESS with dynamic styles
function Alert({ type = 'info', message }) {
  return (
    <div className={`alert alert-${type}`}>
      {message}
    </div>
  );
}
```

```tsx
// After: Using CSS Module with dynamic styles
import styles from './Alert.module.css';

function Alert({ type = 'info', message }) {
  return (
    <div className={`${styles.alert} ${styles[`alert${type.charAt(0).toUpperCase() + type.slice(1)}`]}`}>
      {message}
    </div>
  );
}
```

### 7. Handling Global Styles

For global styles that need to be shared across components:

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: theme('colors.primary.500');
  --color-secondary: theme('colors.secondary.500');
  /* Other global CSS variables */
}

/* Global styles that can't be componentized */
@layer base {
  html {
    @apply text-gray-900;
  }
  
  h1 {
    @apply text-2xl font-bold mb-4;
  }
  
  /* Other global styles */
}
```

### 8. Migrating Mixins and Variables

Convert LESS mixins and variables to CSS custom properties and Tailwind utilities:

```less
// LESS variables and mixins
@color-primary: #0070f3;
@border-radius-md: 4px;

.box-shadow() {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

```css
/* CSS custom properties */
:root {
  --color-primary: #0070f3;
  --border-radius-md: 4px;
}

/* Tailwind extensions in tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
      },
      borderRadius: {
        md: '4px',
      },
      boxShadow: {
        default: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
}
```

## Common Migration Challenges

### Handling Nested Selectors

LESS allows deep nesting, which needs to be flattened in CSS Modules:

```less
// LESS with nesting
.card {
  padding: 20px;
  
  .header {
    font-weight: bold;
    
    .title {
      font-size: 18px;
    }
  }
}
```

```css
/* CSS Module without nesting */
.card {
  padding: 20px;
}

.header {
  font-weight: bold;
}

.title {
  font-size: 18px;
}
```

### Managing Media Queries

Convert LESS media queries to CSS:

```less
// LESS media queries
.container {
  width: 100%;
  
  @media (min-width: 768px) {
    width: 750px;
  }
}
```

```css
/* CSS Module media queries */
.container {
  width: 100%;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
```

Or use Tailwind's responsive utilities:

```tsx
<div className="w-full md:w-[750px]">
  {/* Content */}
</div>
```

### Handling LESS Functions and Operations

Replace LESS functions and operations with CSS calculations or Tailwind utilities:

```less
// LESS with functions
.element {
  width: calc(100% - 20px);
  padding: @base-padding * 2;
}
```

```css
/* CSS Module with calculations */
.element {
  width: calc(100% - 20px);
  padding: calc(var(--base-padding) * 2);
}
```

## Testing and Validation

### Visual Regression Testing

Implement visual regression tests to ensure consistency:

```tsx
// Example using jest-image-snapshot
describe('Button component', () => {
  it('renders correctly', async () => {
    const { container } = render(<Button variant="primary">Click me</Button>);
    const image = await takeScreenshot(container);
    expect(image).toMatchImageSnapshot();
  });
});
```

### Component Storybook

Create or update Storybook stories to validate different component states:

```tsx
// Button.stories.tsx
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = () => <Button variant="primary">Primary Button</Button>;
export const Secondary = () => <Button variant="secondary">Secondary Button</Button>;
export const Large = () => <Button size="lg">Large Button</Button>;
```

## Migration Checklist

For each component:

- [ ] Create CSS Module file
- [ ] Convert LESS styles to CSS
- [ ] Incorporate Tailwind utilities
- [ ] Update component implementation
- [ ] Test component visually
- [ ] Validate accessibility
- [ ] Update documentation
- [ ] Remove old LESS file

## Best Practices During Migration

1. **Maintain Visual Consistency** - Ensure the component looks the same before and after migration
2. **Avoid Mixed Styling Approaches** - Don't mix LESS and CSS Modules in the same component
3. **Refactor Incrementally** - Migrate one component at a time
4. **Add Tests First** - Add tests before migration to catch regressions
5. **Document Changes** - Update component documentation to reflect new styling approach

## Example: Complete Migration

### Before: LESS Component

```less
// Card.less
.card {
  border: 1px solid @border-color;
  border-radius: @border-radius-md;
  padding: @spacing-md;
  margin-bottom: @spacing-lg;
  
  .card-header {
    font-size: @font-size-lg;
    font-weight: bold;
    margin-bottom: @spacing-sm;
  }
  
  .card-body {
    color: @text-color;
  }
  
  &.card-primary {
    border-color: @color-primary;
    
    .card-header {
      color: @color-primary;
    }
  }
  
  &.card-secondary {
    border-color: @color-secondary;
    
    .card-header {
      color: @color-secondary;
    }
  }
}
```

```tsx
// Card.tsx
import './Card.less';

function Card({ title, variant, children }) {
  return (
    <div className={`card ${variant ? `card-${variant}` : ''}`}>
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </div>
  );
}
```

### After: CSS Modules with Tailwind

```css
/* Card.module.css */
.card {
  @apply border border-gray-200 rounded-md p-4 mb-6;
}

.cardHeader {
  @apply text-lg font-bold mb-2;
}

.cardBody {
  @apply text-gray-700;
}

.cardPrimary {
  @apply border-primary-500;
}

.cardPrimary .cardHeader {
  @apply text-primary-500;
}

.cardSecondary {
  @apply border-secondary-500;
}

.cardSecondary .cardHeader {
  @apply text-secondary-500;
}
```

```tsx
// Card.tsx
import styles from './Card.module.css';
import { cn } from '@/utils/classnames';

function Card({ title, variant, className, children }) {
  return (
    <div 
      className={cn(
        styles.card,
        variant && styles[`card${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
        className
      )}
    >
      <div className={styles.cardHeader}>{title}</div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}
```

## Conclusion

Migrating from LESS to CSS Modules with Tailwind is a significant undertaking, but the benefits in terms of maintainability, performance, and developer experience are substantial. By following this guide and migrating incrementally, you can ensure a smooth transition with minimal disruption to your application.