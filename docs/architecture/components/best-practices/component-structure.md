# Component Structure Best Practices

This document outlines our best practices for structuring components in our application.

## File Organization

We organize component files using a feature-first approach with the following structure:

```
components/
  Button/
      __tests__/       # Unit tests
      parts/           # Reusable parts
      Button.tsx       # Implementation
      Button.module.css # Styles
      ButtonAnimations.module.css
      index.ts         # Re-export
```

## Component Naming

1. **Use PascalCase** for component names and files
2. **Be descriptive** but concise
3. **Use domain-specific prefixes** when appropriate (e.g., `Form`, `Nav`, `Data`)

```tsx
// Good
function UserProfile() { /* ... */ }
function PaymentForm() { /* ... */ }

// Bad
function profile() { /* ... */ }  // Not PascalCase
function TheFormThatHandlesUserPaymentInformation() { /* ... */ }  // Too verbose
```

## Component Architecture

### Functional Components

We use functional components with hooks as our primary component pattern:

```tsx
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <button
      className={cn(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

### Component Composition

We prefer composition over inheritance. Build complex components by composing smaller, focused components.

## Code Organization Within Components

### Order of Operations

1. Imports
2. Type definitions
3. Component function
   - State declarations
   - Effect hooks
   - Event handlers
   - Helper functions
   - Return statement (JSX)
4. Exports

## Component Complexity Management

### Extract Complex Logic to Custom Hooks

When component logic becomes complex, extract it into custom hooks:

```tsx
// Custom hook example
function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Implementation details...
  }, [userId]);
  
  return { user, loading, error };
}

// Usage in component
function UserProfile({ userId }) {
  const { user, loading, error } = useUser(userId);
  // Component JSX
}
```

### Split Large Components

When components grow too large, split them into smaller, focused components.

## Exports and Imports

### Named Exports vs Default Exports

We prefer named exports for components to enable better autocomplete and refactoring tools.

### Barrel Files

Use barrel files (`index.ts`) to simplify imports:

```tsx
// components/index.ts
export * from './Button';
export * from './Card';
export * from './Input';

// Usage
import { Button, Card, Input } from '@/components';
```

## Documentation

Include JSDoc comments for components to provide better IDE hints and documentation:

```tsx
/**
 * Button component for triggering actions.
 * 
 * @param variant - The visual style of the button
 * @param size - The size of the button
 * @param children - The content to display inside the button
 */
export function Button({ variant, size, children, ...props }: ButtonProps) {
  // Implementation
}
```