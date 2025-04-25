# Component Logic Architecture

## Overview

Our component architecture follows a structured approach to ensure maintainability, reusability, and performance. This document outlines the patterns, organization, and best practices for our React component system.

## Component Hierarchy

We organize our components into the following categories:

1. **Core Components** - Fundamental building blocks (atoms)
2. **Composite Components** - Combinations of core components (molecules)
3. **Feature Components** - Business logic specific components (organisms)
4. **Layout Components** - Page structure components
5. **Page Components** - Full page implementations

## Directory Structure

```
components/
├── ui/                 # Core UI components (atoms)
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── ...
├── common/             # Composite reusable components (molecules)
│   ├── cards/
│   ├── forms/
│   └── display/
├── features/           # Feature-specific components (organisms)
│   ├── auth/
│   ├── notification/
│   ├── search/
│   └── ...
├── layout/             # Layout components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── sidebar.tsx
│   └── ...
└── [feature-name]/     # Feature-specific component directories
    └── ...
```

## Component Design Patterns

### 1. Compound Components

For complex components with multiple related parts, we use the compound component pattern:

```tsx
// Example of a compound component
import { createContext, useContext, useState } from 'react'

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export function Tabs({ children, defaultValue, ...props }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs-container" {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

Tabs.List = function TabsList({ children }: { children: React.ReactNode }) {
  return <div className="tabs-list">{children}</div>
}

Tabs.Tab = function Tab({ value, children }: TabProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('Tab must be used within Tabs')
  
  const { activeTab, setActiveTab } = context
  
  return (
    <button 
      className={`tab ${activeTab === value ? 'active' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

Tabs.Content = function TabContent({ value, children }: TabContentProps) {
  const context = useContext(TabsContext)
  if (!context) throw new Error('TabContent must be used within Tabs')
  
  const { activeTab } = context
  
  if (activeTab !== value) return null
  
  return <div className="tab-content">{children}</div>
}
```

### 2. Hooks for Logic Extraction

We extract complex logic into custom hooks to keep components clean and focused on rendering:

```tsx
// Component with extracted logic
import { useNotifications } from '@/hooks/use-notifications'

function NotificationBell() {
  const { unreadCount, notifications, markAsRead } = useNotifications()
  
  return (
    <div className="notification-bell">
      <button onClick={() => setOpen(true)}>
        <BellIcon />
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>
      
      {/* Notification display logic */}
    </div>
  )
}
```

### 3. Composition Over Inheritance

We favor composition over inheritance for component reuse:

```tsx
// Base card component
function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("card", className)} {...props}>
      {children}
    </div>
  )
}

// Specialized cards through composition
function StatCard({ title, value, icon, trend, ...props }: StatCardProps) {
  return (
    <Card {...props}>
      <div className="stat-card-header">
        <h3>{title}</h3>
        {icon && <span className="icon">{icon}</span>}
      </div>
      <div className="stat-card-value">{value}</div>
      {trend && <TrendIndicator value={trend} />}
    </Card>
  )
}
```

## State Management

We use a combination of state management approaches:

1. **Local Component State** - For UI state specific to a component
2. **Context API** - For shared state across component trees
3. **Server State** - For data fetched from APIs using hooks like `useResource`

### Context Usage Example

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
```

## Component Testing Strategy

We follow a comprehensive testing strategy for components:

1. **Unit Tests** - For individual component functionality
2. **Integration Tests** - For component interactions
3. **Visual Regression Tests** - For UI appearance
4. **Accessibility Tests** - For a11y compliance

### Example Test

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

## Performance Optimization

We implement several performance optimization techniques:

1. **Code Splitting** - Using dynamic imports for route-based code splitting
2. **Memoization** - Using `React.memo`, `useMemo`, and `useCallback` for expensive operations
3. **Virtualization** - For long lists using libraries like `react-window`
4. **Image Optimization** - Using Next.js Image component with proper sizing
5. **Bundle Analysis** - Regular monitoring of bundle size

### Example Optimization

```tsx
// Memoization example
import { useMemo } from 'react'

function DataGrid({ data, filter }: DataGridProps) {
  // Memoize filtered data to prevent unnecessary recalculations
  const filteredData = useMemo(() => {
    return data.filter(item => 
      Object.entries(filter).every(([key, value]) => 
        item[key].includes(value)
      )
    )
  }, [data, filter])
  
  return (
    <div className="data-grid">
      {filteredData.map(item => (
        <DataRow key={item.id} data={item} />
      ))}
    </div>
  )
}

// Use React.memo for pure components
const DataRow = React.memo(function DataRow({ data }: DataRowProps) {
  return (
    <div className="data-row">
      {/* Row content */}
    </div>
  )
})
```

## Styling Approach

We use a combination of Tailwind CSS and CSS LESS Modules for styling:

1. **Tailwind CSS** - For rapid UI development and consistent design tokens
2. **CSS Modules** - For component-specific styles that go beyond Tailwind
3. **CSS Variables** - For theme values and dynamic styling

### Example Styling

```tsx
// Component with Tailwind and CSS Module
import styles from './Button.module.css'

function Button({ variant = 'primary', size = 'md', children, className, ...props }: ButtonProps) {
  return (
    <button 
      className={cn(
        "rounded font-medium transition-colors",
        {
          "bg-primary text-white hover:bg-primary-dark": variant === 'primary',
          "border border-gray-300 hover:bg-gray-50": variant === 'outline',
          "py-1 px-2 text-sm": size === 'sm',
          "py-2 px-4": size === 'md',
          "py-3 px-6 text-lg": size === 'lg',
        },
        styles.button,
        className
      )} 
      {...props}
    >
      {children}
    </button>
  )
}
```

## Accessibility Standards

We prioritize accessibility in our component design:

1. **Semantic HTML** - Using the correct HTML elements
2. **ARIA Attributes** - Adding proper aria roles and attributes
3. **Keyboard Navigation** - Ensuring all interactions work with keyboard
4. **Focus Management** - Proper focus handling for modals and dialogs
5. **Color Contrast** - Meeting WCAG AA standards for contrast

### Example Accessibility Implementation

```tsx
// Accessible dialog component
function Dialog({ isOpen, onClose, title, children }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  
  // Focus trap and escape key handling
  useEffect(() => {
    if (!isOpen) return
    
    const dialog = dialogRef.current
    if (!dialog) return
    
    // Save previous active element
    const previousActiveElement = document.activeElement as HTMLElement
    
    // Focus the dialog
    dialog.focus()
    
    // Handle escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      // Restore focus when dialog closes
      previousActiveElement?.focus()
    }
  }, [isOpen, onClose])
  
  if (!isOpen) return null
  
  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div 
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="dialog"
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
      >
        <header>
          <h2 id="dialog-title">{title}</h2>
          <button 
            aria-label="Close dialog"
            onClick={onClose}
          >
            &times;
          </button>
        </header>
        <div className="dialog-content">
          {children}
        </div>
      </div>
    </div>
  )
}
```

## Best Practices

1. **Component API Design**
   - Use consistent prop naming across components
   - Provide sensible defaults for optional props
   - Support common HTML attributes (className, style, etc.)
   - Use TypeScript for prop type definitions

2. **Error Handling**
   - Implement error boundaries for component trees
   - Provide fallback UI for error states
   - Handle loading and empty states gracefully

3. **Documentation**
   - Document component APIs with JSDoc comments
   - Create Storybook stories for visual documentation
   - Include usage examples in component files

4. **Naming Conventions**
   - Use PascalCase for component names
   - Use camelCase for props and variables
   - Use descriptive names that indicate purpose

5. **Code Organization**
   - Keep components focused on a single responsibility
   - Extract complex logic to custom hooks
   - Group related components in feature directories