# Dependency Management

This document outlines best practices for managing dependencies in migrated components to ensure maintainability and performance.

## Dependency Principles

When migrating components, follow these principles for dependency management:

1. **Minimize External Dependencies** - Prefer built-in functionality over external libraries
2. **Centralize Common Dependencies** - Use shared utilities for common functions
3. **Version Control** - Lock dependency versions to prevent unexpected changes
4. **Tree Shaking** - Ensure dependencies support tree shaking for optimal bundle size
5. **Peer Dependencies** - Use peer dependencies for framework libraries

## Component Dependencies Structure

### Internal Dependencies

Organize internal dependencies using this structure:

```
lib/
├── utils/              # Utility functions
│   ├── formatters/     # Data formatting utilities
│   ├── validators/     # Validation utilities
│   └── helpers/        # General helper functions
├── hooks/              # Custom React hooks
├── constants/          # Application constants
└── services/           # Service integrations
```

### External Dependencies

Categorize external dependencies:

1. **Core Dependencies** - Essential libraries (React, Next.js)
2. **UI Dependencies** - UI component libraries (shadcn/ui)
3. **Utility Dependencies** - Helper libraries (date-fns, lodash)
4. **Visualization Dependencies** - Chart and visualization libraries
5. **Optional Dependencies** - Feature-specific libraries

## Dependency Import Patterns

### Recommended Import Patterns

```tsx
// 1. React and core dependencies
import { useState, useEffect, useCallback } from 'react';

// 2. External libraries
import { format } from 'date-fns';
import { motion } from 'framer-motion';

// 3. Internal utilities and hooks
import { formatCurrency } from '@/lib/utils/formatters';
import { useDebounce } from '@/lib/hooks/use-debounce';

// 4. Types and interfaces
import type { ChartData, ChartOptions } from '@/lib/types';

// 5. Components
import { Card } from '@/components/ui/card';

// 6. LESS modules
import './ComponentName.less';
```

### Optimizing Imports

For libraries that support tree shaking, use specific imports:

```tsx
// Good - specific import
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

// Bad - importing entire library
import * as UI from '@/components/ui';
import * as dateFns from 'date-fns';
```

## Managing Component Dependencies

### Component Dependencies Documentation

Document dependencies for each component:

```tsx
/**
 * StatCard Component
 * 
 * @description Displays a statistic with title, value, and optional icon
 * 
 * @dependencies
 * - components/ui/card
 * - lucide-react (for icons)
 * - lib/utils/formatters (for number formatting)
 */
```

### Dependency Injection

For components with service dependencies, use dependency injection:

```tsx
// Instead of importing service directly
const ChartComponent = ({ data, formatter = defaultFormatter }) => {
  // Use injected formatter instead of direct import
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{formatter(item.value)}</div>
      ))}
    </div>
  );
};
```

## Handling Third-Party Dependencies

### Wrapper Components

Create wrapper components for third-party libraries:

```tsx
// components/charts/core/ChartWrapper.tsx
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement);

export interface ChartWrapperProps {
  data: any;
  options?: any;
  type: 'bar' | 'line' | 'pie';
  height?: number | string;
  width?: number | string;
}

export const ChartWrapper = ({ data, options, type, height, width }: ChartWrapperProps) => {
  const ChartComponent = type === 'bar' ? Bar : type === 'line' ? Line : Pie;
  
  return (
    <div style={{ height, width }}>
      <ChartComponent data={data} options={options} />
    </div>
  );
};
```

### Lazy Loading

For heavy dependencies, use lazy loading:

```tsx
import { lazy, Suspense } from 'react';

// Lazy load heavy component
const HeavyChart = lazy(() => import('./HeavyChart'));

const Dashboard = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading chart...</div>}>
        <HeavyChart data={chartData} />
      </Suspense>
    </div>
  );
};
```

## Dependency Auditing

Regularly audit dependencies:

1. **Security Audits** - Run `npm audit` or equivalent
2. **Size Analysis** - Use tools like `webpack-bundle-analyzer`
3. **Unused Dependencies** - Check for and remove unused dependencies
4. **Duplicate Dependencies** - Resolve duplicate dependencies

## Dependency Management Checklist

For each migrated component, complete this dependency checklist:

- [ ] Component uses minimal external dependencies
- [ ] Dependencies are properly imported (specific imports)
- [ ] Heavy dependencies are lazy-loaded if appropriate
- [ ] Dependencies are documented in component JSDoc
- [ ] Third-party libraries are wrapped in abstraction layers
- [ ] Bundle size impact has been assessed
- [ ] No duplicate functionality across dependencies