# UI Components

This document provides an overview of our UI component system and guidelines for creating and maintaining components.

> **Note to AI assistants**: When working with our components, please also review the [CSS Modules and Component Organization Style Guide](../coding_style/css_modules_and_components.md) for detailed conventions and patterns.

## Component Library Structure

Our UI components are organized in the following structure:

```
src/components/
├── ui/                       # Core UI components
│   ├── button/
│   ├── card/
│   ├── input/
│   └── ...
├── layout/                   # Layout components
│   ├── container/
│   ├── grid/
│   └── ...
├── data/                     # Data display components
│   ├── table/
│   ├── chart/
│   └── ...
└── composite/                # Higher-order components
    ├── auth-form/
    ├── dashboard-card/
    └── ...
```

## Component Guidelines

### Creating New Components

1. Follow the [CSS Modules and Component Organization Style Guide](../coding_style/css_modules_and_components.md) for directory structure and naming conventions.

2. Each component should have:
   - Main component file (ComponentName.tsx)
   - CSS Module file (ComponentName.module.css)
   - Tests (__tests__/ComponentName.test.tsx)
   - Storybook stories (__tests__/ComponentName.stories.tsx)
   - README.md with usage examples and props documentation

3. Use TypeScript interfaces for props with JSDoc comments.

4. Implement proper accessibility features (ARIA attributes, keyboard navigation).

### Component Architecture

1. **Atomic Design Principles**
   - Atoms: Basic UI elements (Button, Input, etc.)
   - Molecules: Simple component combinations (InputGroup, Card, etc.)
   - Organisms: Complex UI sections (Header, Sidebar, etc.)
   - Templates: Page layouts
   - Pages: Specific instances of templates

2. **Compound Components Pattern**
   For complex components with multiple parts (like Card, Table), use the compound component pattern:
   ```tsx
   <Card>
     <Card.Header>
       <Card.Title>Title</Card.Title>
     </Card.Header>
     <Card.Content>Content</Card.Content>
     <Card.Footer>Footer</Card.Footer>
   </Card>
   ```

3. **Render Props and Hooks**
   For components with complex logic, provide both component and hook versions:
   ```tsx
   // Component version
   <DataTable data={data} />
   
   // Hook version
   const { table, headers, rows } = useDataTable(data);
   ```

## Styling Guidelines

1. **CSS Modules**
   - Use CSS Modules for component styling
   - Follow the conventions in the [CSS Modules and Component Organization Style Guide](../coding_style/css_modules_and_components.md)

2. **Design Tokens**
   - Use CSS variables for design tokens (colors, spacing, etc.)
   - Provide fallback values for CSS variables

3. **Responsive Design**
   - Design components to be responsive by default
   - Use relative units (rem, em) instead of pixels where appropriate
   - Test components at various viewport sizes

4. **Dark Mode Support**
   - Implement dark mode using the `:global(:root[data-theme="dark"])` selector
   - Use separate CSS variables for dark mode

## Accessibility Guidelines

1. **Semantic HTML**
   - Use appropriate HTML elements (button for actions, a for links, etc.)
   - Use heading levels (h1-h6) correctly

2. **ARIA Attributes**
   - Add aria-label, aria-labelledby, aria-describedby where needed
   - Use aria-hidden for decorative elements

3. **Keyboard Navigation**
   - Ensure all interactive elements are keyboard accessible
   - Implement proper focus management
   - Add visible focus styles

4. **Color Contrast**
   - Ensure text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
   - Don't rely on color alone to convey information

## Performance Considerations

1. **Component Optimization**
   - Use React.memo for pure components
   - Implement useMemo and useCallback where appropriate
   - Avoid unnecessary re-renders

2. **Lazy Loading**
   - Use dynamic imports for large components
   - Implement code-splitting for different sections

3. **Bundle Size**
   - Monitor component bundle size
   - Avoid large dependencies where possible

## Migration from LESS to CSS Modules

We are currently migrating our components from LESS to CSS Modules. When updating components:

1. Create a new .module.css file from the existing .less file
2. Update class references in the component
3. Add dark theme support using :global selectors
4. Update tests to mock the CSS Module
5. Update the README to reflect the new styling approach

See the [Card component](../../src/components/ui/card/README.md) for an example of a completed migration.

## Examples

### Basic Component Structure

```tsx
// Button.tsx
import React from 'react';
import { cn } from '@/utils/classnames';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline';
  
  /**
   * Button size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Button content
   */
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
```