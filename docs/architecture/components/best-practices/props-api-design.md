# Props API Design Best Practices

This document outlines our best practices for designing component props APIs.

## Props API Design Principles

1. **Consistency** - Props should follow consistent naming and behavior patterns
2. **Simplicity** - Props should be simple and intuitive to use
3. **Flexibility** - Props should provide the right level of customization
4. **Type Safety** - Props should be strongly typed to prevent errors

## Naming Conventions

### Prop Naming

1. **Use camelCase** for prop names
2. **Be descriptive** but concise
3. **Use consistent prefixes** for related props
4. **Follow React conventions** for common props

```tsx
// Good
type ButtonProps = {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  onClick: () => void;
  isDisabled: boolean;
};

// Bad
type ButtonProps = {
  type: 'primary' | 'secondary'; // Conflicts with HTML button type
  buttonSize: 'sm' | 'md' | 'lg'; // Inconsistent prefix
  whenClicked: () => void; // Doesn't follow React convention
};
```

### Event Handler Naming

Use the `on[Event]` pattern for event handler props (e.g., `onClick`, `onFocus`).

## Props Structure

### Required vs Optional Props

Mark props as optional when they have sensible defaults:

```tsx
type ButtonProps = {
  // Required props
  children: React.ReactNode;
  
  // Optional props with defaults
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
};

function Button({
  children,
  variant = 'primary',
  size = 'md',
  isDisabled = false,
}: ButtonProps) {
  // Implementation
}
```

### Prop Grouping

Group related props into objects for complex components:

```tsx
// Grouped props structure
type DataTableProps = {
  data: any[];
  columns: Column[];
  
  sorting?: {
    sortable: boolean;
    sortField: string;
    sortDirection: 'asc' | 'desc';
    onSort: (field: string, direction: 'asc' | 'desc') => void;
  };
  
  // Additional prop groups...
};
```

## Prop Types

### Use Specific Types

Use specific types rather than generic ones:

```tsx
// Good
variant: 'primary' | 'secondary' | 'outline';

// Bad
variant: string; // Too generic
onClick: Function; // Too generic
```

### Use Union Types for Variants

Use union types for props with a fixed set of options.

### Use Enums for Complex Options

For more complex option sets, consider using enums.

## Default Props

### Use Default Parameters

Use default parameters for props with default values:

```tsx
function Button({
  variant = 'primary',
  size = 'md',
  isDisabled = false,
}: ButtonProps) {
  // Implementation
}
```

## Prop Validation

### Use TypeScript for Static Validation

Use TypeScript to validate props at compile time.

### Use Runtime Validation for Complex Cases

For complex validation that can't be expressed in types, use runtime validation.

## Callback Props

### Use Consistent Callback Patterns

Follow consistent patterns for callback props:

```tsx
// Event callbacks
onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;

// Item callbacks
onItemSelect: (item: Item, index: number) => void;

// Value change callbacks
onValueChange: (newValue: string, oldValue: string) => void;
```

## Render Props and Children

### Use Children for Simple Content

Use `children` for simple content rendering.

### Use Render Props for Complex Rendering

Use render props for more complex rendering scenarios:

```tsx
type ListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
};
```

## Component API Evolution

### Backward Compatibility

Maintain backward compatibility when evolving component APIs:

1. **Add new props as optional** - Don't require new props
2. **Deprecate props gradually** - Mark props as deprecated before removing them
3. **Provide migration paths** - Document how to migrate from old to new APIs

```tsx
type ButtonProps = {
  // Current props
  variant?: 'primary' | 'secondary' | 'outline';
  
  // Deprecated props
  /** @deprecated Use `variant` instead */
  type?: 'primary' | 'secondary' | 'outline';
};
```

## Props Documentation

### Document Props with JSDoc

Use JSDoc comments to document props:

```tsx
type ButtonProps = {
  /**
   * The visual style of the button
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline';
  
  /**
   * The content to display inside the button
   */
  children: React.ReactNode;
};
```

## Advanced Patterns

### Prop Forwarding

Use prop forwarding to pass props to underlying elements:

```tsx
function Button({
  variant = 'primary',
  className,
  ...rest
}: ButtonProps) {
  return <button className={cn(styles.button, className)} {...rest} />;
}
```

### Component Polymorphism

Create polymorphic components that can render as different elements when needed:

```tsx
type TextProps<C extends React.ElementType> = {
  as?: C;
  size?: 'sm' | 'md' | 'lg';
};

// Usage
<Text>Default span</Text>
<Text as="h1" size="lg">Heading</Text>
<Text as="p">Paragraph</Text>
```

### Compound Components

Use compound components for complex UI elements with related behaviors:

```tsx
// Usage example
<Tabs defaultTab="tab1">
  <Tabs.TabList>
    <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
    <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
  </Tabs.TabList>
  <Tabs.TabPanels>
    <Tabs.TabPanel id="tab1">Content for Tab 1</Tabs.TabPanel>
    <Tabs.TabPanel id="tab2">Content for Tab 2</Tabs.TabPanel>
  </Tabs.TabPanels>
</Tabs>
```