# Component Testing Strategy

We follow a comprehensive testing strategy for components to ensure reliability, maintainability, and a great user experience.

## Testing Levels

Our component testing strategy includes multiple levels:

1. **Unit Tests** - For individual component functionality
2. **Integration Tests** - For component interactions
3. **Visual Regression Tests** - For UI appearance
4. **Accessibility Tests** - For a11y compliance

## 1. Unit Tests

Unit tests focus on testing individual components in isolation, verifying that they render correctly and respond to user interactions as expected.

We use React Testing Library for unit tests:

```tsx
// Example component test
import { render, screen, fireEvent } from '@testing-library/react'
import { StatCard } from './StatCard'

describe('StatCard', () => {
  it('renders the card with title and value', () => {
    render(<StatCard title="Revenue" value="$1,234" />)
    
    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(screen.getByText('$1,234')).toBeInTheDocument()
  })
  
  it('applies the correct CSS class based on trend direction', () => {
    const { rerender } = render(<StatCard title="Revenue" value="$1,234" trend={10} />)
    
    expect(screen.getByTestId('trend-indicator')).toHaveClass('positive')
    
    rerender(<StatCard title="Revenue" value="$1,234" trend={-5} />)
    
    expect(screen.getByTestId('trend-indicator')).toHaveClass('negative')
  })
})
```

### Unit Testing Best Practices

1. **Test behavior, not implementation** - Focus on what the component does, not how it does it
2. **Use user-centric queries** - Prefer queries like `getByRole`, `getByLabelText`, and `getByText` over `getByTestId`
3. **Test accessibility** - Verify that components are accessible by using appropriate ARIA roles and attributes
4. **Test edge cases** - Test empty states, loading states, error states, and boundary conditions
5. **Mock external dependencies** - Use Jest mocks for external dependencies like API calls

## 2. Integration Tests

Integration tests verify that multiple components work together correctly. They test component interactions and data flow between components.

```tsx
// Example integration test
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { UserProfile } from './UserProfile'
import { fetchUserData } from '@/api/users'

// Mock the API call
jest.mock('@/api/users', () => ({
  fetchUserData: jest.fn()
}))

describe('UserProfile', () => {
  it('loads and displays user data', async () => {
    // Mock the API response
    fetchUserData.mockResolvedValueOnce({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin'
    })
    
    render(<UserProfile userId="123" />)
    
    // Initially shows loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    
    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
    
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })
  
  it('handles API errors gracefully', async () => {
    // Mock an API error
    fetchUserData.mockRejectedValueOnce(new Error('Failed to fetch user data'))
    
    render(<UserProfile userId="123" />)
    
    // Wait for the error to be displayed
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch user data')).toBeInTheDocument()
    })
    
    // Test retry functionality
    fireEvent.click(screen.getByText('Retry'))
    
    expect(fetchUserData).toHaveBeenCalledTimes(2)
  })
})
```

### Integration Testing Best Practices

1. **Focus on component interactions** - Test how components communicate with each other
2. **Test user workflows** - Test common user paths through the application
3. **Mock external dependencies** - Use Jest mocks for API calls and other external services
4. **Test error handling** - Verify that components handle errors gracefully

## 3. Visual Regression Tests

Visual regression tests capture screenshots of components and compare them to baseline images to detect unintended visual changes.

We use Storybook and Chromatic for visual regression testing:

```tsx
// Example Storybook story
import { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'UI/Button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
}
```

### Visual Regression Testing Best Practices

1. **Test all component variants** - Create stories for all component variants and states
2. **Test responsive behavior** - Test components at different viewport sizes
3. **Test theme variations** - Test components with different themes (light/dark)
4. **Automate in CI/CD** - Run visual regression tests in CI/CD pipelines

## 4. Accessibility Tests

Accessibility tests verify that components are accessible to all users, including those with disabilities.

We use jest-axe for automated accessibility testing:

```tsx
// Example accessibility test
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from './Button'

expect.extend(toHaveNoViolations)

describe('Button accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>)
    
    const results = await axe(container)
    
    expect(results).toHaveNoViolations()
  })
  
  it('should have appropriate ARIA attributes when disabled', async () => {
    const { container } = render(<Button disabled>Disabled Button</Button>)
    
    const results = await axe(container)
    
    expect(results).toHaveNoViolations()
  })
})
```

### Accessibility Testing Best Practices

1. **Automate with jest-axe** - Use jest-axe for automated accessibility testing
2. **Test keyboard navigation** - Verify that components can be used with keyboard only
3. **Test screen reader compatibility** - Verify that components work well with screen readers
4. **Test color contrast** - Verify that text meets WCAG color contrast requirements
5. **Manual testing** - Supplement automated tests with manual testing using screen readers and keyboard navigation

## Test Organization

We organize our tests in a `__tests__` directory within each component directory:

```
src/components/ui/button/
├── Button.tsx
├── Button.module.css
├── index.ts
└── __tests__/
    ├── Button.test.tsx
    └── Button.stories.tsx
```

## Continuous Integration

We run all tests in our CI/CD pipeline to ensure that changes don't break existing functionality:

1. **Unit and integration tests** - Run on every pull request and merge to main
2. **Visual regression tests** - Run on every pull request and merge to main
3. **Accessibility tests** - Run on every pull request and merge to main

## Test Coverage

We aim for high test coverage, but focus on testing critical paths and edge cases rather than achieving 100% coverage:

1. **Core UI components** - 90%+ coverage
2. **Feature components** - 80%+ coverage
3. **Page components** - 70%+ coverage

## Mocking Strategy

We use Jest mocks for external dependencies:

1. **API calls** - Mock API responses to test success and error cases
2. **Context providers** - Create test providers with controlled values
3. **Browser APIs** - Mock browser APIs like localStorage and fetch

```tsx
// Example of mocking context
const mockTheme = {
  theme: 'light',
  setTheme: jest.fn(),
  toggleTheme: jest.fn(),
}

function renderWithTheme(ui) {
  return render(
    <ThemeContext.Provider value={mockTheme}>
      {ui}
    </ThemeContext.Provider>
  )
}

test('uses theme from context', () => {
  renderWithTheme(<ThemeConsumer />)
  
  expect(screen.getByText('Current theme: light')).toBeInTheDocument()
})
```