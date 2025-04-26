# Component Design Patterns

This document outlines the key design patterns we use for our React components to ensure consistency, maintainability, and reusability.

## 1. Compound Components

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

### Benefits of Compound Components

- **Encapsulated state** - State is managed within the parent component
- **Flexible API** - Components can be composed in different ways
- **Clear relationships** - The relationship between components is explicit
- **Self-documenting** - Usage is clear from the component structure

## 2. Hooks for Logic Extraction

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

### Benefits of Logic Extraction

- **Separation of concerns** - UI logic is separated from rendering
- **Reusability** - Hooks can be used across multiple components
- **Testability** - Logic can be tested independently
- **Readability** - Components are focused on rendering

## 3. Composition Over Inheritance

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

### Benefits of Composition

- **Flexibility** - Components can be combined in various ways
- **Maintainability** - Changes to base components propagate to composed components
- **Readability** - Component relationships are explicit
- **Testability** - Components can be tested in isolation

## 4. Render Props and Hooks

For components with complex logic, we provide both component and hook versions:

```tsx
// Hook version
function useDataTable(data) {
  // Data table logic
  return { table, headers, rows };
}

// Component version using the hook
function DataTable({ data }) {
  const { table, headers, rows } = useDataTable(data);
  
  return (
    <table>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header.id}>{header.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(row => (
          <tr key={row.id}>
            {row.cells.map(cell => (
              <td key={cell.id}>{cell.value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Benefits of Render Props and Hooks

- **Flexibility** - Consumers can use either the component or hook
- **Control** - Hook users have more control over rendering
- **Reusability** - Logic can be reused in different UI contexts

## 5. Forward Refs

We use `forwardRef` to allow parent components to access DOM elements within our components:

```tsx
import React, { forwardRef } from 'react';
import styles from './Button.module.css';
import { cn } from '@/utils/classnames';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
```

### Benefits of Forward Refs

- **Accessibility** - Parent components can manage focus
- **Integration** - Components work with libraries that need refs
- **Animation** - Refs enable DOM-based animations
- **Measurements** - Parent components can measure child elements

## 6. Controlled vs. Uncontrolled Components

We support both controlled and uncontrolled patterns for form components:

```tsx
// Supports both controlled and uncontrolled usage
function Input({ value, defaultValue, onChange, ...props }: InputProps) {
  // For uncontrolled usage
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  
  // Determine if component is controlled
  const isControlled = value !== undefined;
  const inputValue = isControlled ? value : internalValue;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Always update internal state for uncontrolled usage
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    
    // Call external onChange if provided
    onChange?.(e);
  };
  
  return (
    <input
      value={inputValue}
      onChange={handleChange}
      {...props}
    />
  );
}
```

### Benefits of Supporting Both Patterns

- **Flexibility** - Components can be used in different contexts
- **Progressive enhancement** - Start uncontrolled, move to controlled as needed
- **Simplicity** - Uncontrolled for simple cases, controlled for complex ones