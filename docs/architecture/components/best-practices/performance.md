# Performance Best Practices

This document outlines our best practices for optimizing component performance.

## Performance Principles

1. **Measure First** - Identify performance issues before optimizing
2. **Focus on User Experience** - Prioritize optimizations that improve perceived performance
3. **Avoid Premature Optimization** - Don't optimize without evidence of a problem
4. **Balance Maintainability and Performance** - Don't sacrifice code clarity for minor gains

## Rendering Optimization

### Component Memoization

Use `React.memo` to prevent unnecessary re-renders of components:

```tsx
// Memoize component to prevent re-renders when props haven't changed
const UserCard = React.memo(function UserCard({ user }) {
  return (
    <div className={styles.card}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
});
```

### Callback Memoization

Use `useCallback` to memoize event handlers:

```tsx
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // Memoize callback to prevent unnecessary re-renders in child components
  const handleIncrement = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <ChildComponent onIncrement={handleIncrement} />
    </div>
  );
}
```

### Value Memoization

Use `useMemo` to memoize expensive computations:

```tsx
function DataGrid({ items, filter }) {
  // Memoize filtered data to avoid recalculation on every render
  const filteredItems = useMemo(() => {
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);
  
  return (
    <div>
      {filteredItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

## List Optimization

### Virtualization

Use virtualization for long lists to only render visible items:

```tsx
import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <div className={styles.item}>{items[index].name}</div>
    </div>
  );
  
  return (
    <FixedSizeList
      height={500}
      width="100%"
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </FixedSizeList>
  );
}
```

### Stable Keys

Use stable, unique keys for list items:

```tsx
// Good: Stable ID from data
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Bad: Index as key
function UserList({ users }) {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## State Management Optimization

### Minimize State

Keep state as minimal as possible:

```tsx
// Good: Only essential state
function SearchForm() {
  const [query, setQuery] = useState('');
  
  // Derived value, not state
  const isValid = query.length > 2;
  
  return (
    <form>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button disabled={!isValid}>Search</button>
    </form>
  );
}
```

### State Colocation

Keep state as close as possible to where it's used:

```tsx
// Good: Colocated state
function UserList() {
  const [selectedId, setSelectedId] = useState(null);
  
  return (
    <div>
      {users.map(user => (
        <UserItem
          key={user.id}
          user={user}
          isSelected={user.id === selectedId}
          onSelect={() => setSelectedId(user.id)}
        />
      ))}
    </div>
  );
}
```

## Event Handling Optimization

### Debouncing and Throttling

Debounce or throttle event handlers for performance-intensive operations:

```tsx
import { debounce } from 'lodash-es';

function SearchInput() {
  const [value, setValue] = useState('');
  
  // Debounce the search API call
  const debouncedSearch = useMemo(
    () => debounce(searchAPI, 300),
    []
  );
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };
  
  return <input value={value} onChange={handleChange} />;
}
```

### Event Delegation

Use event delegation for handling events on multiple elements:

```tsx
function TodoList({ items }) {
  const handleClick = (e) => {
    if (e.target.matches('.delete-btn')) {
      const id = e.target.dataset.id;
      deleteTodo(id);
    }
  };
  
  return (
    <ul onClick={handleClick}>
      {items.map(item => (
        <li key={item.id}>
          {item.text}
          <button className="delete-btn" data-id={item.id}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

## Data Fetching Optimization

### Caching

Cache API responses to avoid redundant requests:

```tsx
function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let isMounted = true;
    
    // Check cache first
    const cachedUsers = sessionStorage.getItem('users');
    if (cachedUsers) {
      setUsers(JSON.parse(cachedUsers));
      setLoading(false);
      return;
    }
    
    // Fetch if not cached
    fetchUsers()
      .then(data => {
        if (isMounted) {
          setUsers(data);
          sessionStorage.setItem('users', JSON.stringify(data));
          setLoading(false);
        }
      });
    
    return () => { isMounted = false; };
  }, []);
  
  return { users, loading };
}
```

### Request Deduplication

Deduplicate API requests to avoid redundant network calls:

```tsx
// Simple request deduplication
const pendingRequests = {};

async function fetchWithDeduplication(url) {
  if (pendingRequests[url]) {
    return pendingRequests[url];
  }
  
  try {
    pendingRequests[url] = fetch(url).then(res => res.json());
    return await pendingRequests[url];
  } finally {
    delete pendingRequests[url];
  }
}
```

## Code Splitting

### Component Lazy Loading

Use `React.lazy` and `Suspense` to load components on demand:

```tsx
import React, { Suspense, lazy } from 'react';

// Lazy load component
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
```

### Route-based Code Splitting

Split code by routes to reduce initial bundle size:

```tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

## Performance Measurement

### React DevTools Profiler

Use React DevTools Profiler to identify unnecessary renders and performance bottlenecks.

### Web Vitals Monitoring

Monitor Core Web Vitals to ensure good user experience:

```tsx
import { getCLS, getFID, getLCP } from 'web-vitals';

function sendToAnalytics({ name, delta, id }) {
  // Send metrics to analytics service
  console.log({ name, delta, id });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getLCP(sendToAnalytics);
```

## Common Performance Issues

### Excessive Re-renders

Identify and fix excessive re-renders:

1. Use React DevTools Profiler to identify components that re-render too often
2. Memoize components with `React.memo`
3. Memoize callbacks with `useCallback`
4. Memoize computed values with `useMemo`
5. Use state management techniques that minimize re-renders

### Memory Leaks

Prevent memory leaks in components:

```tsx
function DataFetcher() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    
    fetchData().then(result => {
      // Only update state if component is still mounted
      if (isMounted) {
        setData(result);
      }
    });
    
    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, []);
  
  return <div>{data ? <DataDisplay data={data} /> : <Loading />}</div>;
}
```