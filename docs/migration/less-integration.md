# Component Migration and LESS Module Integration

This document outlines the updated migration plan for components, including the integration of LESS modules for each component.

## Component Structure with LESS Modules

Each component will now follow this structure:

```
components/
└── [category]/
    └── [component-name]/
        ├── index.ts         # Main export file
        ├── [ComponentName].tsx    # Component implementation
        ├── [ComponentName].less   # Component-specific styles
        └── [ComponentName].test.tsx  # Component tests (optional)
```

### LESS Module Integration

Each component will have its own LESS module that:

1. Contains component-specific styles
2. Uses variables from the global theme
3. Follows BEM-like naming conventions
4. Exports class names that can be imported in the component

Example LESS module structure:

```less
// ComponentName.less
@import '../../styles/variables.less';

.component-name {
  // Base styles
  
  &__element {
    // Element styles
  }
  
  &--modifier {
    // Modifier styles
  }
  
  // Responsive styles
  @media (max-width: @screen-sm) {
    // Mobile styles
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

## Migration Process with LESS

When migrating a component, follow these additional steps:

1. Create the component directory structure
2. Extract component-specific styles into a LESS module
3. Import the LESS module in the component
4. Update all imports throughout the codebase

## Global LESS Structure

```
styles/
├── variables.less    # Global variables (colors, spacing, etc.)
├── mixins.less       # Reusable mixins
├── functions.less    # LESS functions
└── global.less       # Global styles
```

## Example Component with LESS

### Directory Structure

```
components/
└── common/
    └── cards/
        └── stat-card/
            ├── index.ts
            ├── StatCard.tsx
            └── StatCard.less
```

### LESS Module (StatCard.less)

```less
@import '../../../../styles/variables.less';

.stat-card {
  border-radius: @border-radius-base;
  padding: @spacing-md;
  
  &__title {
    font-size: @font-size-sm;
    font-weight: @font-weight-medium;
    color: @text-color-secondary;
  }
  
  &__value {
    font-size: @font-size-xl;
    font-weight: @font-weight-bold;
    margin: @spacing-xs 0;
  }
  
  &__description {
    font-size: @font-size-xs;
    color: @text-color-secondary;
  }
  
  &__trend {
    display: flex;
    align-items: center;
    margin-top: @spacing-xs;
    font-size: @font-size-xs;
    
    &--up {
      color: @success-color;
    }
    
    &--down {
      color: @error-color;
    }
    
    &--neutral {
      color: @text-color-secondary;
    }
  }
}
```

### Component Implementation (StatCard.tsx)

```tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';
import './StatCard.less';

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
  className = ""
}: StatCardProps) {
  // Component implementation...
  
  return (
    <Card className={`stat-card ${className}`}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="stat-card__title">{title}</CardTitle>
        {icon && getIcon()}
      </CardHeader>
      <CardContent>
        <div className="stat-card__value">{value}</div>
        <p className="stat-card__description">
          {description}
        </p>
        {trend && (
          <div className={`stat-card__trend stat-card__trend--${trend.direction}`}>
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