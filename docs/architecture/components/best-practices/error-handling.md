# Error Handling Best Practices

This document outlines our best practices for handling errors in components.

## Error Handling Principles

1. **Graceful Degradation** - Components should fail gracefully
2. **User Communication** - Errors should be communicated clearly to users
3. **Developer Feedback** - Errors should provide useful information for debugging
4. **Recovery** - Where possible, provide ways to recover from errors

## Component Error Boundaries

### Creating Error Boundaries

Use error boundaries to catch and handle errors in component trees:

```tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to trigger fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return this.props.fallback ? (
        this.props.fallback(this.state.error)
      ) : (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Using Error Boundaries

Place error boundaries strategically in your component tree:

```tsx
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <main>
        {/* Wrap critical sections in their own boundaries */}
        <ErrorBoundary fallback={(error) => <p>Dashboard error: {error.message}</p>}>
          <Dashboard />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={(error) => <p>Feed error: {error.message}</p>}>
          <Feed />
        </ErrorBoundary>
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
```

## Handling Async Errors

### Promise Error Handling

Handle errors in async operations:

```tsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user: ${response.statusText}`);
        }
        
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
        // Log error to monitoring service
        logError(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId]);
  
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <EmptyState />;
  
  return <UserDetails user={user} />;
}
```

### Custom Hooks for Async Operations

Create reusable hooks for handling async operations:

```tsx
function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);
    
    try {
      const result = await asyncFunction();
      setData(result);
      setStatus('success');
      return result;
    } catch (err) {
      setError(err);
      setStatus('error');
      throw err;
    }
  }, [asyncFunction]);
  
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  
  return { execute, status, data, error, isLoading: status === 'pending' };
}

// Usage
function UserProfile({ userId }) {
  const fetchUser = useCallback(() => {
    return fetch(`/api/users/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json();
      });
  }, [userId]);
  
  const { data: user, error, isLoading } = useAsync(fetchUser);
  
  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!user) return <EmptyState />;
  
  return <UserDetails user={user} />;
}
```

## Form Validation Errors

### Client-Side Validation

Handle form validation errors:

```tsx
function LoginForm() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validate = () => {
    const newErrors = {};
    
    if (!values.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!values.password) {
      newErrors.password = 'Password is required';
    } else if (values.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      await loginUser(values);
      // Handle successful login
    } catch (err) {
      // Handle API errors
      if (err.field) {
        // Field-specific error from API
        setErrors(prev => ({ ...prev, [err.field]: err.message }));
      } else {
        // General error
        setErrors(prev => ({ ...prev, form: err.message }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {errors.form && (
        <div role="alert" className="error">
          {errors.form}
        </div>
      )}
      
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <div id="email-error" className="error">
            {errors.email}
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && (
          <div id="password-error" className="error">
            {errors.password}
          </div>
        )}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  );
}
```

## Error UI Components

### Error Messages

Create reusable error message components:

```tsx
function ErrorMessage({ message, onRetry }) {
  return (
    <div role="alert" className="error-message">
      <div className="error-icon">⚠️</div>
      <p>{message || 'An error occurred'}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Try Again
        </button>
      )}
    </div>
  );
}
```

### Empty States

Create empty state components for when data is missing:

```tsx
function EmptyState({ message, icon, action }) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state-icon">{icon}</div>}
      <p>{message || 'No data available'}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}

// Usage
<EmptyState 
  message="No results found" 
  icon={<SearchIcon />}
  action={<button onClick={resetFilters}>Clear Filters</button>}
/>
```

## Error Logging

### Client-Side Error Logging

Implement client-side error logging:

```tsx
// Error logging service
function logError(error, context = {}) {
  // Add additional context
  const errorData = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    ...context
  };
  
  // Send to error tracking service
  console.error('Logged error:', errorData);
  
  // In production, send to actual service
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData)
    }).catch(err => {
      // Fallback if logging fails
      console.error('Failed to log error:', err);
    });
  }
}

// Global error handler
window.addEventListener('error', (event) => {
  logError(event.error, { type: 'uncaught' });
});

window.addEventListener('unhandledrejection', (event) => {
  logError(event.reason, { type: 'unhandledrejection' });
});
```

## HTTP Error Handling

### API Error Handling

Create utilities for handling API errors:

```tsx
// API client with error handling
async function fetchAPI(url, options = {}) {
  try {
    const response = await fetch(url, options);
    
    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      const error = new Error(
        errorData.message || `API error: ${response.status} ${response.statusText}`
      );
      
      // Add additional properties
      error.status = response.status;
      error.statusText = response.statusText;
      error.data = errorData;
      
      throw error;
    }
    
    return await response.json();
  } catch (error) {
    // Add request context to error
    error.url = url;
    error.method = options.method || 'GET';
    
    // Log error
    logError(error, { type: 'api', url, method: options.method || 'GET' });
    
    // Rethrow for component handling
    throw error;
  }
}
```

### Status-Specific Error Handling

Handle different HTTP status codes appropriately:

```tsx
async function handleAPIRequest(url) {
  try {
    return await fetchAPI(url);
  } catch (error) {
    switch (error.status) {
      case 400:
        // Bad request
        return { error: 'Invalid request. Please check your input.' };
      
      case 401:
        // Unauthorized
        // Redirect to login
        window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
        return { error: 'Please log in to continue.' };
      
      case 403:
        // Forbidden
        return { error: 'You do not have permission to access this resource.' };
      
      case 404:
        // Not found
        return { error: 'The requested resource was not found.' };
      
      case 500:
      case 502:
      case 503:
      case 504:
        // Server errors
        return { error: 'A server error occurred. Please try again later.' };
      
      default:
        // Generic error
        return { error: 'An unexpected error occurred. Please try again.' };
    }
  }
}
```

## Fallback Content

### Progressive Enhancement

Implement progressive enhancement for critical features:

```tsx
function DataVisualization({ data }) {
  const [error, setError] = useState(null);
  
  // Try to render advanced visualization, fall back to simple table
  const renderVisualization = () => {
    try {
      return <ComplexChart data={data} />;
    } catch (err) {
      // Log error but don't crash
      logError(err, { component: 'DataVisualization' });
      setError(err);
      return null;
    }
  };
  
  return (
    <div>
      {error ? (
        <div>
          <p>Unable to display chart visualization.</p>
          <DataTable data={data} />
        </div>
      ) : (
        renderVisualization() || <DataTable data={data} />
      )}
    </div>
  );
}
```

## Testing Error States

### Error State Testing

Test component error states:

```tsx
// Testing error states
test('shows error message when API call fails', async () => {
  // Mock failed API call
  server.use(
    rest.get('/api/users', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  
  render(<UserList />);
  
  // Check loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Wait for error state
  const errorMessage = await screen.findByText(/error occurred/i);
  expect(errorMessage).toBeInTheDocument();
});
```

## Error Prevention

### Type Safety

Use TypeScript to prevent type-related errors:

```tsx
// Define explicit prop types
type ButtonProps = {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

// Use defined types
function Button({
  variant,
  size = 'md',
  onClick,
  disabled = false,
  children
}: ButtonProps) {
  // Implementation
}
```

### Defensive Programming

Use defensive programming techniques:

```tsx
function UserProfile({ user }) {
  // Guard against null or undefined
  if (!user) {
    return <EmptyState message="User not found" />;
  }
  
  // Safely access nested properties
  const displayName = user.profile?.displayName || user.name || 'Unknown User';
  const avatarUrl = user.profile?.avatar?.url || '/default-avatar.png';
  
  return (
    <div>
      <img src={avatarUrl} alt={`${displayName}'s avatar`} />
      <h2>{displayName}</h2>
    </div>
  );
}
```