# Component Directory Structure

Our component architecture follows a functional organization while adhering to atomic design principles:

```
src/
  components/
    ui/                        # Core UI components (atoms)
      button/
      input/
      card/
    data-display/              # Data presentation components (molecules)
      stat-card/
      quote-display/
      metrics/
    charts/                    # Chart components (molecules)
      core/                    # Shared chart utilities and types
      bar/
      line/
      pie/
    layout/                    # Layout components
      wrappers/
      header/
      footer/
      sidebar/
    navigation/                # Navigation components (molecules)
      main-nav/
      breadcrumbs/
      tabs/
      pagination/
    lists/                     # List components (molecules)
      activity-list/
      projects-list/
      virtualized-list/
    forms/                     # Form components (molecules)
      inputs/
      selects/
      buttons/
      validation/
    features/                  # Feature-specific components (organisms)
      auth/
      media/
      analysis/
      dashboard/
      projects/
  styles/                      # Global styles
    variables.css
    mixins.css
    global.css
  hooks/                       # Custom hooks
  utils/                       # Utility functions
  types/                       # TypeScript type definitions
```

## Component Directory Structure

Each component directory contains:

1. **Main Component File** - `ComponentName.tsx`
2. **Style File** - `ComponentName.module.css` (migrated from `.less`)
3. **Tests** - `__tests__/ComponentName.test.tsx`
4. **Stories** - `__tests__/ComponentName.stories.tsx` (for Storybook)
5. **Documentation** - `README.md`

### Basic Component Structure

For basic components, we use the following structure:

```
src/components/ui/button/
├── Button.tsx                 # Main component file
├── Button.module.css          # CSS Module styles
├── ButtonAnimations.module.css # Animation styles
├── index.ts                   # Re-export for clean imports
├── README.md                  # Documentation
└── __tests__/
    ├── Button.test.tsx        # Unit tests
    └── Button.stories.tsx     # Storybook stories
```

### Compound Component Structure

For compound components, we use a more detailed structure with a `parts/` subfolder:

```
src/components/navigation/tabs/
├── Tabs.tsx                   # Main component file
├── parts/                     # Subfolder for component parts
│   ├── TabsList.tsx           # Component part
│   ├── TabsTrigger.tsx        # Component part
│   └── TabsContent.tsx        # Component part
├── Tabs.module.css            # CSS Module styles
├── TabsAnimations.module.css  # Animation styles
├── index.ts                   # Re-export for clean imports
└── __tests__/
    ├── Tabs.test.tsx          # Unit tests
    └── Tabs.stories.tsx       # Storybook stories
```

### File Structure Best Practices

1. **Group related files** - Keep component files together in directories
2. **Use consistent naming** - Use consistent naming conventions for all files
3. **Export from index** - Use index files to simplify imports
4. **Separate animations** - Keep animations in separate files
5. **Co-locate tests** - Keep tests close to the components they test

### Example Index File

```tsx
// components/ui/button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

## Import Conventions

We use path aliases to maintain clean and consistent imports across the project:

```tsx
// Preferred: Use path aliases for imports
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/utils/classnames';

// Avoid: Don't use relative paths with multiple levels
// import { Button } from '../../../../components/ui/button';
// import { useMediaQuery } from '../../../hooks/use-media-query';
// import { cn } from '../../../utils/classnames';
```

Path aliases are configured in the tsconfig.json file and provide several benefits:
- Improved readability
- Easier refactoring
- No need to update imports when moving files
- Consistent import style across the codebase

## Component Organization

Components are organized by their function and complexity level:

1. **Core UI Components** (`ui/`) - Basic building blocks used throughout the application
2. **Composite Components** - Components that combine multiple core components
3. **Feature Components** - Components tied to specific business features
4. **Layout Components** - Components that define the structure of the application

This organization makes it easy to find components and understand their purpose in the application.