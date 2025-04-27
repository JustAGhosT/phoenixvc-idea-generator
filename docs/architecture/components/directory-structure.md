# Component Directory Structure

Our component architecture follows a functional organization while adhering to atomic design principles:

```
src/
  components/
    ui/                        # Core UI components (atoms)
      button/
      input/
      card/
      tooltip/
    patterns/                  # Composite component patterns
      sidebar/                 # Compound components with composition patterns
      data-table/
      command-menu/
      form-layout/
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
      app-sidebar/             # Application-specific sidebar implementation
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
  contexts/                    # React contexts for state management
    sidebar-context.tsx        # Contains both context and associated hook
    theme-context.tsx
    auth-context.tsx
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

### Pattern Component Structure

For pattern components that use a composition API, we use this structure:

```
src/components/patterns/sidebar/
├── sidebar-root.tsx           # Root container component
├── sidebar-header.tsx         # Header component part
├── sidebar-content.tsx        # Content component part
├── sidebar-footer.tsx         # Footer component part
├── sidebar-rail.tsx           # Rail component part
├── sidebar-trigger.tsx        # Trigger component part
├── sidebar.module.css         # CSS Module styles
├── index.tsx                  # Exports components as namespace and individually
├── README.md                  # Documentation with usage examples
└── __tests__/
    ├── sidebar.test.tsx       # Unit tests
    └── sidebar.stories.tsx    # Storybook stories with examples
```

All components that are part of the reusable pattern should be in this directory. For example, with the sidebar pattern:

- `sidebar-root.tsx`, `sidebar-header.tsx`, `sidebar-content.tsx`, etc. are all part of the reusable pattern
- Utility components like `sidebar-item.tsx` and `sidebar-section.tsx` that are meant to be used with the pattern should also be here
- These components are exported together as a namespace: `Sidebar.Root`, `Sidebar.Header`, `Sidebar.Item`, etc.

### Implementation Example

Pattern components are used to create specific implementations:

```
src/components/layout/app-sidebar/
├── AppSidebar.tsx             # Application-specific sidebar implementation
├── AppSidebar.module.css      # Implementation-specific styles
├── index.ts                   # Re-export for clean imports
└── __tests__/
    └── AppSidebar.test.tsx    # Unit tests
```

The implementation uses the pattern components but doesn't define new pattern pieces. For example:

```tsx
// src/components/layout/app-sidebar/AppSidebar.tsx
import { Sidebar } from "@/components/patterns/sidebar";

export function AppSidebar() {
  return (
    <Sidebar.Root>
      <Sidebar.Header>...</Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Section>
          <Sidebar.Item>...</Sidebar.Item>
        </Sidebar.Section>
      </Sidebar.Content>
    </Sidebar.Root>
  );
}
```

Implementation-specific components that aren't meant to be reused elsewhere can be placed in the implementation directory.

### Context Organization

We organize React contexts in a dedicated `contexts/` directory at the root level:

```
src/contexts/
├── sidebar-context.tsx        # Sidebar state management
├── theme-context.tsx          # Theme state management
└── auth-context.tsx           # Authentication state management
```

Each context file contains both the context definition and its associated hook:

```tsx
// src/contexts/sidebar-context.tsx
export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  // Provider implementation
}

export function useSidebarContext() {
  // Hook implementation
}
```

We keep the context and its hook in the same file because:

1. **Encapsulation and cohesion** - They are tightly coupled and designed to work together
2. **Single source of truth** - All related state management is in one place
3. **Import simplicity** - Consumers can import everything with a single import
4. **Preventing circular dependencies** - Avoids potential circular reference issues
5. **Easier maintenance** - Changes to the context almost always require changes to the hook

### File Structure Best Practices

1. **Group related files** - Keep component files together in directories
2. **Use consistent naming** - Use consistent naming conventions for all files
3. **Export from index** - Use index files to simplify imports
4. **Separate animations** - Keep animations in separate files
5. **Co-locate tests** - Keep tests close to the components they test
6. **Context cohesion** - Keep contexts and their hooks in the same file

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
2. **Pattern Components** (`patterns/`) - Composable component patterns that follow specific design patterns
3. **Composite Components** - Components that combine multiple core components
4. **Feature Components** - Components tied to specific business features
5. **Layout Components** - Components that define the structure of the application

This organization makes it easy to find components and understand their purpose in the application.