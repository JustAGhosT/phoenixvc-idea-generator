# Testing Best Practices

This document outlines our best practices for testing components.

## Testing Principles

1. **User-Centric** - Test from the user's perspective
2. **Confidence** - Tests should give confidence that components work as expected
3. **Maintainability** - Tests should be easy to maintain
4. **Speed** - Tests should run quickly to support fast feedback cycles

## Testing Types

### Unit Tests

Test individual components in isolation:

```tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});

test('calls onClick handler when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Integration Tests

Test how components work together:

```tsx
// Form.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

test('submits form with correct data', async () => {
  const handleSubmit = jest.fn();
  render(<Form onSubmit={handleSubmit} />);
  
  fireEvent.change(screen.getByLabelText('Name'), {
    target: { value: 'John Doe' }
  });
  
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'john@example.com' }
  });
  
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  
  expect(handleSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com'
  });
});
```

### Snapshot Tests

Use snapshot tests to detect unexpected UI changes:

```tsx
// Card.test.tsx
import { render } from '@testing-library/react';
import Card from './Card';

test('matches snapshot', () => {
  const { container } = render(
    <Card title="Example Card">
      <p>Card content</p>
    </Card>
  );
  expect(container).toMatchSnapshot();
});
```

## Testing Library

### Queries

Use appropriate queries to find elements:

```tsx
// Prioritize queries in this order:
// 1. Accessible queries (most preferred)
const button = screen.getByRole('button', { name: 'Submit' });
const nameInput = screen.getByLabelText('Name');
const heading = screen.getByRole('heading', { name: 'Form Title' });

// 2. Text content
const element = screen.getByText('Hello, world!');

// 3. Form elements
const emailInput = screen.getByPlaceholderText('Enter email');

// 4. Test IDs (least preferred, but sometimes necessary)
const specialElement = screen.getByTestId('special-element');
```

### User Interactions

Simulate user interactions:

```tsx
// Click events
fireEvent.click(screen.getByRole('button'));

// Form interactions
fireEvent.change(screen.getByLabelText('Email'), {
  target: { value: 'user@example.com' }
});

// Keyboard events
fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter', code: 'Enter' });

// Using user-event for more realistic interactions
import userEvent from '@testing-library/user-event';

test('typing in input field', async () => {
  const user = userEvent.setup();
  render(<Input />);
  
  await user.type(screen.getByRole('textbox'), 'Hello, world!');
  expect(screen.getByRole('textbox')).toHaveValue('Hello, world!');
});
```

### Async Testing

Test asynchronous operations:

```tsx
// Using findBy queries for async elements
test('shows data after loading', async () => {
  render(<DataFetcher />);
  
  // Initially shows loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Wait for data to load
  const dataElement = await screen.findByText('Data loaded');
  expect(dataElement).toBeInTheDocument();
});

// Using waitFor for more complex scenarios
test('updates UI after async operation', async () => {
  render(<AsyncComponent />);
  
  fireEvent.click(screen.getByRole('button', { name: 'Load Data' }));
  
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});
```

## Mocking

### Mock Functions

Use mock functions to test component behavior:

```tsx
test('calls API on form submission', async () => {
  const mockSubmit = jest.fn();
  render(<Form onSubmit={mockSubmit} />);
  
  fireEvent.change(screen.getByLabelText('Name'), {
    target: { value: 'John Doe' }
  });
  
  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  
  expect(mockSubmit).toHaveBeenCalledWith({
    name: 'John Doe'
  });
});
```

### Mock API Calls

Mock API calls to test components that fetch data:

```tsx
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Setup mock server
const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('displays users from API', async () => {
  render(<UserList />);
  
  // Wait for users to load
  const johnElement = await screen.findByText('John Doe');
  const janeElement = await screen.findByText('Jane Smith');
  
  expect(johnElement).toBeInTheDocument();
  expect(janeElement).toBeInTheDocument();
});
```

### Mock Components

Mock child components when needed:

```tsx
// Mock a complex child component
jest.mock('./ComplexChart', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mocked-chart">Chart Placeholder</div>
  };
});

test('renders dashboard with chart', () => {
  render(<Dashboard />);
  expect(screen.getByTestId('mocked-chart')).toBeInTheDocument();
});
```

## Test Organization

### File Structure

Organize test files consistently:

```
components/
  Button/
    Button.tsx
    Button.module.css
    __tests__/
      Button.test.tsx
      Button.part.test.tsx
```

### Test Structure

Structure tests with clear arrangement:

```tsx
// Arrange-Act-Assert pattern
test('increments counter when button is clicked', () => {
  // Arrange
  render(<Counter />);
  const initialCount = screen.getByText('Count: 0');
  const button = screen.getByRole('button', { name: 'Increment' });
  
  // Act
  fireEvent.click(button);
  
  // Assert
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### Test Descriptions

Write clear test descriptions:

```tsx
// Describe-test pattern
describe('Button component', () => {
  test('renders with default props', () => {
    // Test implementation
  });
  
  test('applies custom className', () => {
    // Test implementation
  });
  
  describe('when disabled', () => {
    test('has disabled attribute', () => {
      // Test implementation
    });
    
    test('does not trigger onClick when clicked', () => {
      // Test implementation
    });
  });
});
```

## Component Testing Strategies

### Presentational Components

Test presentational components by verifying rendered output:

```tsx
test('Card renders title and content', () => {
  render(
    <Card title="Card Title">
      <p>Card content</p>
    </Card>
  );
  
  expect(screen.getByRole('heading')).toHaveTextContent('Card Title');
  expect(screen.getByText('Card content')).toBeInTheDocument();
});
```

### Interactive Components

Test interactive components by simulating user interactions:

```tsx
test('Accordion expands when header is clicked', async () => {
  render(
    <Accordion title="Section Title">
      <p>Hidden content</p>
    </Accordion>
  );
  
  // Content is hidden initially
  expect(screen.queryByText('Hidden content')).not.toBeVisible();
  
  // Click to expand
  fireEvent.click(screen.getByRole('button', { name: 'Section Title' }));
  
  // Content is now visible
  expect(screen.getByText('Hidden content')).toBeVisible();
});
```

### Container Components

Test container components by mocking dependencies:

```tsx
test('UserProfile displays user data from API', async () => {
  // Mock API response
  server.use(
    rest.get('/api/users/123', (req, res, ctx) => {
      return res(
        ctx.json({
          id: 123,
          name: 'John Doe',
          email: 'john@example.com'
        })
      );
    })
  );
  
  render(<UserProfile userId="123" />);
  
  // Check loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Wait for data to load
  expect(await screen.findByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
});
```

## Test Coverage

### Coverage Goals

Aim for comprehensive test coverage:

1. **Critical paths** - Ensure all critical user flows are tested
2. **Edge cases** - Test boundary conditions and error states
3. **Accessibility** - Verify accessibility requirements

### Coverage Reports

Use coverage reports to identify untested code:

```bash
# Generate coverage report
npm test -- --coverage
```

## Testing Custom Hooks

Test custom hooks with a test component or renderHook:

```tsx
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './useCounter';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

## Testing Context Providers

Test components that use context:

```tsx
// Create a wrapper with the provider
function renderWithThemeProvider(ui, { theme = 'light', ...options } = {}) {
  function Wrapper({ children }) {
    return (
      <ThemeProvider initialTheme={theme}>
        {children}
      </ThemeProvider>
    );
  }
  
  return render(ui, { wrapper: Wrapper, ...options });
}

test('ThemedButton uses theme from context', () => {
  renderWithThemeProvider(<ThemedButton>Click me</ThemedButton>, {
    theme: 'dark'
  });
  
  const button = screen.getByRole('button');
  expect(button).toHaveClass('darkButton');
});
```

## Common Testing Pitfalls

### Avoid Implementation Details

Focus on behavior, not implementation details:

```tsx
// Bad: Testing implementation details
test('sets isLoading state to true when fetching data', () => {
  const { result } = renderHook(() => useDataFetcher());
  expect(result.current.isLoading).toBe(true);
});

// Good: Testing observable behavior
test('shows loading indicator when fetching data', async () => {
  render(<DataFetcher />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
```

### Avoid Overlapping Tests

Each test should focus on a specific aspect:

```tsx
// Bad: Overlapping tests
test('form validation works', () => {
  // Tests too many things at once
});

// Good: Focused tests
test('shows error when name field is empty', () => {
  // Tests specific validation case
});

test('shows error when email format is invalid', () => {
  // Tests another specific validation case
});
```