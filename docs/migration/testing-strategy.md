# Component Testing Strategy

This document outlines the comprehensive testing approach for migrated components to ensure quality, performance, and accessibility compliance.

## Testing Philosophy

Our testing approach follows these core principles:
- **Comprehensive Coverage**: Test functionality, appearance, interactions, and accessibility
- **Shift Left**: Start testing early in the development process
- **Automation First**: Automate tests wherever possible
- **User-Centric**: Focus on testing from the user's perspective

## Testing Levels

Each migrated component should undergo the following levels of testing:

### 1. Unit Testing

- **Tool**: Jest + React Testing Library
- **Coverage Target**: 80% for critical components, 60% for others
- **Focus Areas**:
  - Component rendering
  - Prop validation
  - Event handling
  - State management
  - Conditional rendering
  - Hook logic

### 2. Visual Testing

- **Tool**: Storybook + Chromatic (or similar)
- **Coverage**: All component variants and states
- **Focus Areas**:
  - Visual appearance
  - Responsive behavior
  - Theme variations
  - Animation states
  - Edge cases (long text, empty states, error states)

### 3. Integration Testing

- **Tool**: Cypress (or similar)
- **Coverage**: Key user flows that use the component
- **Focus Areas**:
  - Component interaction with other components
  - Real-world usage scenarios
  - Form submissions and validations
  - State management across components

### 4. Accessibility Testing

- **Tool**: axe-core, jest-axe, Lighthouse
- **Coverage**: All interactive components
- **Focus Areas**:
  - ARIA compliance
  - Keyboard navigation
  - Screen reader compatibility
  - Color contrast
  - Focus management

### 5. Performance Testing

- **Tool**: React Profiler, Lighthouse
- **Coverage**: Complex components and frequently used components
- **Focus Areas**:
  - Render performance
  - Re-render optimization
  - Memory usage
  - Bundle size impact

## Test File Structure

Each component should include test files following this structure:

```
components/
└── [category]/
    └── [component-name]/
        ├── [ComponentName].tsx        # Component implementation
        ├── [ComponentName].less       # Component styles
        ├── [ComponentName].test.tsx   # Unit tests
        ├── [ComponentName].stories.tsx # Storybook stories
        ├── [ComponentName].cy.tsx     # Cypress component tests (optional)
        └── [ComponentName].a11y.test.tsx # Accessibility tests
```

## Unit Test Template

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  // Basic rendering
  it('renders correctly with default props', () => {
    render(<ComponentName />);
    // Assertions...
  });

  // Prop variations
  it('handles prop changes correctly', () => {
    const { rerender } = render(<ComponentName prop="value1" />);
    // Assertions for first render
    
    rerender(<ComponentName prop="value2" />);
    // Assertions for rerender
  });

  // User interactions
  it('handles user interactions correctly', async () => {
    const onAction = jest.fn();
    render(<ComponentName onAction={onAction} />);
    
    // Using userEvent for more realistic interactions
    await userEvent.click(screen.getByRole('button'));
    
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onAction).toHaveBeenCalledWith(expect.any(Object));
  });

  // State management
  it('manages internal state correctly', async () => {
    render(<ComponentName />);
    
    // Initial state assertions
    expect(screen.getByText('Initial State')).toBeInTheDocument();
    
    // Trigger state change
    await userEvent.click(screen.getByRole('button', { name: 'Update' }));
    
    // Updated state assertions
    await waitFor(() => {
      expect(screen.getByText('Updated State')).toBeInTheDocument();
    });
  });

  // Error handling
  it('handles error states gracefully', () => {
    render(<ComponentName hasError />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  // Edge cases
  it('handles edge cases correctly', () => {
    render(<ComponentName data={[]} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
});
```

## Hook Testing

For custom hooks used in components:

```tsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useCustomHook } from './useCustomHook';

describe('useCustomHook', () => {
  it('returns the correct initial state', () => {
    const { result } = renderHook(() => useCustomHook());
    expect(result.current.value).toBe(initialValue);
  });

  it('updates state correctly', () => {
    const { result } = renderHook(() => useCustomHook());
    
    act(() => {
      result.current.updateValue('new value');
    });
    
    expect(result.current.value).toBe('new value');
  });
  
  // Test side effects, cleanup, etc.
});
```

## Accessibility Testing

```tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ComponentName } from './ComponentName';

expect.extend(toHaveNoViolations);

describe('ComponentName accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<ComponentName />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  
  it('has proper keyboard navigation', () => {
    render(<ComponentName />);
    // Test keyboard navigation
  });
  
  it('has proper ARIA attributes', () => {
    render(<ComponentName />);
    // Test ARIA attributes
  });
});
```

## Storybook Template

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  component: ComponentName,
  title: 'Category/ComponentName',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Description of the component and its usage',
      },
    },
    a11y: {
      config: {
        rules: [
          // Specific a11y rules
        ],
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Configure controls for props
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'The visual style variant of the component',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the component',
    },
    // Additional props
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

// Default state
export const Default: Story = {
  args: {
    // Default props
  },
};

// Variants
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

// States
export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    hasError: true,
    errorMessage: 'Something went wrong',
  },
};

// Interactive example
export const Interactive: Story = {
  render: (args) => {
    return (
      <div>
        <ComponentName {...args} />
        {/* Additional interactive elements */}
      </div>
    );
  },
};
```

## Testing Compound Components

For compound components, test both the individual parts and the complete component:

```tsx
describe('Tabs compound component', () => {
  it('renders the complete tabs component correctly', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Content value="tab1">Content 1</Tabs.Content>
        <Tabs.Content value="tab2">Content 2</Tabs.Content>
      </Tabs>
    );
    
    // Assertions
  });
  
  it('shows the correct content when tabs are clicked', async () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Content value="tab1">Content 1</Tabs.Content>
        <Tabs.Content value="tab2">Content 2</Tabs.Content>
      </Tabs>
    );
    
    // Initial state
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    
    // Click second tab
    await userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    
    // Updated state
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });
});
```

## Testing Checklist

For each component, complete this testing checklist:

- [ ] Unit tests cover all key functionality
- [ ] Tests verify all prop combinations
- [ ] Tests verify accessibility requirements
- [ ] Visual tests capture all component states
- [ ] Integration tests verify component works in context
- [ ] Tests run successfully in CI pipeline
- [ ] Test coverage meets targets
- [ ] Performance tests verify render efficiency
- [ ] Tests for compound components verify all sub-components
- [ ] Tests verify proper error handling
- [ ] Tests verify proper loading states

## Continuous Integration

All tests should be integrated into the CI pipeline:

- Unit tests run on every PR
- Visual tests run on every PR with approval workflow
- Integration tests run on main branch merges
- Test coverage reports generated automatically
- Accessibility tests run on every PR
- Performance benchmarks tracked over time

## Best Practices

1. **Test behavior, not implementation** - Focus on what the component does, not how it does it
2. **Use realistic user interactions** - Use `userEvent` instead of `fireEvent` when possible
3. **Test edge cases** - Empty states, error states, loading states
4. **Mock external dependencies** - Use Jest mocks for API calls, complex dependencies
5. **Keep tests simple** - One assertion per test when possible
6. **Use test-data attributes** - Add `data-testid` for elements that are hard to select
7. **Test accessibility** - Include accessibility tests for all components
8. **Test responsiveness** - Verify components work at different viewport sizes