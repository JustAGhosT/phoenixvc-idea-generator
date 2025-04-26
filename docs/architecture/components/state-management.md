# State Management

This document outlines our approach to state management in components, from local component state to application-wide state solutions.

## State Management Approaches

We use a combination of state management approaches based on the scope and complexity of the state:

1. **Local Component State** - For UI state specific to a component
2. **Context API** - For shared state across component trees
3. **Server State** - For data fetched from APIs using hooks like `useResource`

## 1. Local Component State

For state that is specific to a single component, we use React's built-in `useState` and `useReducer` hooks:

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
```

For more complex state logic, we use `useReducer`:

```tsx
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
}

function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  
  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', text });
  };
  
  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', id });
  };
  
  // Component JSX
}
```

## 2. Context API for Shared State

For state that needs to be shared across multiple components, we use React's Context API:

```tsx
// Theme context example
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Usage in a component
function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

### Context Organization

We organize our contexts by feature and provide custom hooks for accessing them:

```tsx
// In hooks/use-theme.ts
export function useTheme() {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}
```

## 3. Server State Management

For data fetched from APIs, we use custom hooks that handle loading, error, and data states:

```tsx
// Custom hook for fetching resources
function useResource<T>({
  fetchFn,
  autoFetch = true,
  initialData = null,
  onError,
  errorContext = "resource"
}: UseResourceOptions<T>) {
  const [data, setData] = useState<T | null>(initialData)
  const [loading, setLoading] = useState(autoFetch)
  const [error, setError] = useState<Error | null>(null)
  
  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await fetchFn()
      setData(result)
      return result
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err))
      setError(error)
      onError?.(error)
      return null
    } finally {
      setLoading(false)
    }
  }, [fetchFn, onError])
  
  useEffect(() => {
    if (autoFetch) {
      fetch()
    }
  }, [fetch, autoFetch])
  
  return { data, loading, error, fetch, setData }
}

// Usage in a component
function UserProfile({ userId }) {
  const { data: user, loading, error } = useResource({
    fetchFn: () => fetchUser(userId),
    errorContext: "user-profile"
  })
  
  if (loading) return <Spinner />
  if (error) return <ErrorMessage error={error} />
  if (!user) return <NotFound />
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
```

## 4. State Colocation

We follow the principle of state colocation - keeping state as close as possible to where it's used:

1. **Component State** - For state used by a single component
2. **Parent Component State** - For state shared between a few closely related components
3. **Context API** - For state shared across many components in a subtree
4. **Global State** - Only for truly application-wide state

## 5. State Derivation

We derive state from props or other state when possible, rather than duplicating state:

```tsx
function FilteredList({ items, filter }) {
  // Derived state - computed from props
  const filteredItems = useMemo(() => {
    return items.filter(item => item.name.includes(filter))
  }, [items, filter])
  
  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}
```

## Best Practices

1. **State Initialization**
   - Use meaningful defaults
   - Consider lazy initialization for expensive computations
   - Derive initial state from props when appropriate

2. **State Updates**
   - Use functional updates for state that depends on previous state
   - Batch related state updates
   - Consider using reducers for complex state logic

3. **State Organization**
   - Split complex state into smaller, focused pieces
   - Use custom hooks to encapsulate related state logic
   - Keep state as local as possible

4. **Performance Considerations**
   - Memoize expensive computations with `useMemo`
   - Memoize callbacks with `useCallback` when passed as props
   - Use context selectors to prevent unnecessary re-renders