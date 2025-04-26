# CSS Modules with Tailwind Integration

This document outlines our approach for migrating components from LESS to CSS Modules with Tailwind CSS integration.

## Component Structure with CSS Modules

Each component will now follow this structure:

```
components/
└── [category]/
    └── [component-name]/
        ├── index.ts                          # Main export file
        ├── [ComponentName].tsx               # Component implementation
        ├── [ComponentName].module.css        # Component-specific styles
        ├── __tests__/                        # Test directory
        │   ├── [ComponentName].test.tsx      # Component tests
        │   └── [ComponentName].stories.tsx   # Component stories
        └── parts/                            # Sub-components (if needed)
            └── [ComponentPart].tsx           # Component part implementation
```

### CSS Modules with Tailwind Integration

Each component will have its own CSS Module that:

1. Contains component-specific styles that extend Tailwind
2. Uses Tailwind's `@apply` directive for common patterns
3. Uses CSS variables for theme values
4. Follows camelCase naming conventions for CSS classes
5. Exports class names that can be imported in the component

Example CSS Module structure:

```css
/* ComponentName.module.css */
.component {
  @apply rounded-md p-4 shadow-sm;
}

.header {
  @apply flex items-center justify-between mb-2;
}

.title {
  @apply text-lg font-semibold;
}

.content {
  @apply text-gray-700;
}

/* Custom styles beyond Tailwind */
.customElement {
  position: relative;
  transition: transform 0.2s ease;
}

.customElement:hover {
  transform: translateY(-2px);
}

/* Responsive styles using Tailwind breakpoints */
@media (max-width: 768px) {
  .component {
    @apply p-2;
  }
}
```

## Component Export Pattern

Each component will use a consistent export pattern:

```typescript
// index.ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps } from './ComponentName';
```

This allows for clean imports:

```typescript
import { ComponentName } from '@/components/category/component-name';
```

## Migration Process from LESS to CSS Modules with Tailwind

When migrating a component, follow these steps:

1. Create the component directory structure
2. Create a new CSS Module file (.module.css) for the component
3. Convert LESS styles to CSS Module styles, incorporating Tailwind utilities
4. Import the CSS Module in the component
5. Update the component to use the imported styles
6. Update all imports throughout the codebase
7. Remove the old LESS file once migration is complete

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
        styles[variant],
        className
      )}
      {...props}
    >
      {/* Component content */}
    </div>
  );
}
```

## Global Styles Structure

```
styles/
├── globals.css      # Global styles and Tailwind imports
└── theme.css        # CSS variables for theming
```

Example globals.css:

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

## Tailwind Configuration

The `tailwind.config.js` file extends Tailwind with our design tokens:

```js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... other shades
          500: '#0ea5e9',
          // ... other shades
          900: '#0c4a6e',
        },
        secondary: {
          // ... color shades
        },
        // ... other color categories
      },
      spacing: {
        // Custom spacing values
      },
      borderRadius: {
        // Custom border radius values
      },
      // ... other theme extensions
    },
  },
  plugins: [],
}
```

## Example Component with CSS Modules and Tailwind

### Directory Structure

```
components/
└── common/
    └── cards/
        └── stat-card/
            ├── index.ts
            ├── StatCard.tsx
            └── StatCard.module.css
```

### CSS Module (StatCard.module.css)

```css
.statCard {
  @apply rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm;
}

.header {
  @apply pb-2 flex flex-row items-center justify-between;
}

.title {
  @apply text-sm font-medium text-gray-500 dark:text-gray-400;
}

.value {
  @apply text-2xl font-bold;
}

.description {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

.trend {
  @apply flex items-center mt-2 text-xs;
}

.trendUp {
  @apply text-green-500;
}

.trendDown {
  @apply text-red-500;
}

.trendNeutral {
  @apply text-gray-500;
}
```

### Component Implementation (StatCard.tsx)

```tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';
import styles from './StatCard.module.css';
import { cn } from '@/utils/classnames';

export interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon?: string | React.ReactNode;
  trend?: {
    value: number;
    label: string;
    direction: "up" | "down" | "neutral";
  };
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon, 
  trend,
  className
}: StatCardProps) {
  // Component implementation...
  
  return (
    <Card className={cn(styles.statCard, className)}>
      <CardHeader className={styles.header}>
        <CardTitle className={styles.title}>{title}</CardTitle>
        {icon && getIcon()}
      </CardHeader>
      <CardContent>
        <div className={styles.value}>{value}</div>
        <p className={styles.description}>
          {description}
        </p>
        {trend && (
          <div className={cn(
            styles.trend,
            trend.direction === "up" ? styles.trendUp : 
            trend.direction === "down" ? styles.trendDown : 
            styles.trendNeutral
          )}>
            {trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "→"}
            <span className="ml-1">{trend.value}% {trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

### Export (index.ts)

```typescript
export { StatCard } from './StatCard';
export type { StatCardProps } from './StatCard';
```

## Handling Dynamic Styles

For dynamic styles, use computed class names:

```tsx
// Dynamic class names with CSS Modules
<div className={cn(
  styles.button,
  disabled ? styles.buttonDisabled : null,
  size === 'large' ? styles.buttonLarge : 
  size === 'small' ? styles.buttonSmall : 
  styles.buttonMedium
)}>
  {children}
</div>
```

## Handling LESS Mixins and Variables

Convert LESS mixins and variables to CSS custom properties and Tailwind utilities:

### LESS Variables to CSS Custom Properties

```less
// LESS variables
@color-primary: #0070f3;
@border-radius-md: 4px;
```

Becomes:

```css
/* CSS custom properties */
:root {
  --color-primary: #0070f3;
  --border-radius-md: 4px;
}
```

Or better yet, use Tailwind's theme configuration:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
      },
      borderRadius: {
        md: '4px',
      },
    },
  },
}
```

### LESS Mixins to Tailwind Utilities

```less
// LESS mixin
.box-shadow() {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

Becomes:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        default: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
}
```

Then use it in your component:

```tsx
<div className="shadow-default">Content</div>
```

## Migration Checklist

For each component:

1. ✅ Create CSS Module file (.module.css)
2. ✅ Convert LESS styles to CSS Module styles with Tailwind
3. ✅ Import the CSS Module in the component
4. ✅ Update the component to use the imported styles
5. ✅ Test the component visually and functionally
6. ✅ Update all imports throughout the codebase
7. ✅ Remove the old LESS file

## Best Practices

1. **Use Tailwind First**: Leverage Tailwind utilities before writing custom CSS
2. **Modular Styles**: Keep styles scoped to their components
3. **Consistent Naming**: Use camelCase for CSS class names
4. **Responsive Design**: Use Tailwind's responsive utilities
5. **Theme Consistency**: Use CSS variables for theme values
6. **Avoid Global Styles**: Minimize global styles in favor of component-scoped styles
7. **Composition**: Compose styles using the `cn` utility function