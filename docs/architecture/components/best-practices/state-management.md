# State Management Best Practices

This document outlines our best practices for managing state in components.

## State Management Principles

1. **Locality** - Keep state as close as possible to where it's used
2. **Minimalism** - Store only the minimal required state
3. **Derivation** - Derive values from state rather than duplicating state
4. **Separation** - Separate UI state from business logic

## Local Component State

### Using useState

Use `useState` for simple state management within a component:

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  
  // Functional update pattern (recommended when new state depends on old state)
  const increment = () => setCount(prevCount => prevCount + 1);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

### State Initialization

Initialize state with meaningful defaults and use lazy initialization for expensive operations:

```tsx
// Lazy initialization for expensive operations
const [data, setData] = useState(() => computeExpensiveInitialState());
```

## Complex State Management

### Using useReducer

Use `useReducer` for complex state logic:

```tsx
type State = {
  items: string[];
  isLoading: boolean;
  error: Error | null;
};

type Action =
  | { type: 'REQUEST_START' }
  | { type: 'REQUEST_SUCCESS'; payload: string[] }
  | { type: 'REQUEST_ERROR'; error: Error };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'REQUEST_START':
      return { ...state, isLoading: true, error: null };
    case 'REQUEST_SUCCESS':
      return { ...state, items: action.payload, isLoading: false };
    case 'REQUEST_ERROR':
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
}
```

### Custom Hooks for State Logic

Extract reusable state logic into custom hooks:

```tsx
function useFormField(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Hook implementation...
  
  return {
    value,
    setValue,
    touched,
    error,
    handleChange,
    handleBlur,
    validate,
    reset
  };
}
```

## State Sharing Between Components

### Prop Drilling

For shallow component trees, passing props is acceptable.

### Context API

For deeper component trees, use Context API to avoid excessive prop drilling:

```tsx
// Create context and provider
const CountContext = createContext<{
  count: number;
  setCount: (count: number) => void;
} | undefined>(undefined);

// Create custom hook for consuming context
function useCount() {
  const context = useContext(CountContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}
```

### Context Optimization

Optimize context to prevent unnecessary re-renders by splitting into multiple contexts:

```tsx
// Split into value and update contexts
const CountValueContext = createContext<number>(0);
const CountUpdateContext = createContext<(count: number) => void>(() => {});
```

## State Derivation

Derive values from state rather than duplicating state:

```tsx
// Good: Derived state
function UserList({ users }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Derived value - not stored in state
  const filteredUsers = useMemo(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);
  
  // Component JSX
}
```

## Server State Management

Use custom hooks for managing server state:

```tsx
function useResource<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Implementation...
  
  return { data, loading, error };
}
```

## State Persistence

Persist state across sessions when needed:

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  // Implementation...
  
  return [storedValue, setValue] as const;
}
```

## Performance Optimization

### Memoization

Use `useMemo` to memoize expensive computations and `useCallback` to memoize functions:

```tsx
// Memoize filtered data
const filteredData = useMemo(() => {
  return data.filter(item => item.matches(criteria));
}, [data, criteria]);

// Memoize callback
const handleIncrement = useCallback(() => {
  setCount(prevCount => prevCount + 1);
}, []);
```

## State Management Anti-patterns

### Avoid Redundant State

Don't store values that can be derived from existing state:

```tsx
// Bad: Redundant state
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState('');

// Good: Derived value
const fullName = `${firstName} ${lastName}`;
```

### Avoid Deep Nesting

Avoid deeply nested state objects in favor of flatter structures:

```tsx
// Bad: Deeply nested state
const [user, setUser] = useState({
  personal: {
    name: { first: 'John', last: 'Doe' },
    contact: { email: 'john@example.com' }
  }
});

// Good: Flattened state
const [personalInfo, setPersonalInfo] = useState({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com'
});
```

### Avoid Premature Optimization

Don't optimize state management prematurely - start simple and optimize when needed.