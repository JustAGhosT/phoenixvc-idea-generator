# Input Component

A versatile text input component that supports various styles, sizes, and states.

## Usage

```tsx
import { Input } from '@/components/ui/input/Input';

// Basic usage
<Input placeholder="Enter your name" />

// With label and help text
<Input 
  label="Email" 
  placeholder="Enter your email" 
  helpText="We'll never share your email with anyone else."
/>

// With validation
<Input 
  label="Username" 
  hasError={true}
  errorMessage="Username is already taken"
/>

// With icons
<Input 
  leftIcon={<SearchIcon />} 
  placeholder="Search..." 
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the input |
| `label` | `string` | - | Label text for the input |
| `helpText` | `string` | - | Help text displayed below the input |
| `hasError` | `boolean` | `false` | Whether the input has an error |
| `errorMessage` | `string` | - | Error message to display when hasError is true |
| `leftIcon` | `ReactNode` | - | Icon to display before the input text |
| `rightIcon` | `ReactNode` | - | Icon to display after the input text |
| `fullWidth` | `boolean` | `true` | Whether the input should take the full width of its container |
| `rounded` | `boolean` | `false` | Whether the input has a rounded appearance |
| `pill` | `boolean` | `false` | Whether the input has a pill appearance (fully rounded) |
| `showClearButton` | `boolean` | `false` | Whether to show a button to clear the input value |
| `onClear` | `() => void` | - | Callback when clear button is clicked |
| `showPasswordToggle` | `boolean` | `false` | Whether to show a button to toggle password visibility |
| `loading` | `boolean` | `false` | Whether the input is in a loading state |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `required` | `boolean` | `false` | Whether the input is required |
| `placeholder` | `string` | - | Placeholder text for the input |
| `type` | `string` | `'text'` | HTML input type |

The component also accepts all standard HTML input attributes.

## Examples

### Input Sizes

```tsx
<Input size="xs" placeholder="Extra Small" />
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />
<Input size="xl" placeholder="Extra Large" />
```

### Input with Label and Help Text

```tsx
<Input 
  label="Username" 
  placeholder="Enter your username" 
  helpText="Username must be at least 3 characters."
/>

<Input 
  label="Email" 
  placeholder="Enter your email" 
  required
  helpText="We'll use this for account recovery."
/>
```

### Input with Validation

```tsx
<Input 
  label="Username" 
  value={username}
  onChange={handleUsernameChange}
  hasError={!!usernameError}
  errorMessage={usernameError}
/>
```

### Input with Icons

```tsx
<Input 
  leftIcon={<UserIcon />}
  placeholder="Username" 
/>

<Input 
  rightIcon={<CalendarIcon />}
  placeholder="Select date" 
  type="date"
/>

<Input 
  leftIcon={<SearchIcon />}
  rightIcon={<FilterIcon />}
  placeholder="Search..." 
/>
```

### Password Input with Toggle

```tsx
<Input 
  label="Password"
  type="password"
  showPasswordToggle
  placeholder="Enter your password" 
/>
```

### Input with Clear Button

```tsx
<Input 
  value={searchTerm}
  onChange={handleSearchChange}
  showClearButton
  onClear={() => setSearchTerm('')}
  placeholder="Search..." 
/>
```

### Input Shapes

```tsx
<Input placeholder="Default input" />
<Input rounded placeholder="Rounded input" />
<Input pill placeholder="Pill input" />
```

### Input States

```tsx
<Input placeholder="Default input" />
<Input disabled placeholder="Disabled input" />
<Input loading placeholder="Loading input" />
<Input required placeholder="Required input" label="Required Field" />
```

## Accessibility

- The input is properly associated with its label using the `for` attribute
- Error states are communicated using `aria-invalid` and `aria-describedby`
- Help text and error messages are associated with the input using `aria-describedby`
- The clear button has an appropriate `aria-label`
- The password toggle button has appropriate `aria-label` based on its state
- Focus states are clearly visible for keyboard navigation

## Customization

The Input component uses both Tailwind classes and LESS modules for styling. You can customize the appearance by:

1. Modifying the LESS variables in `src/styles/variables.less`
2. Extending the Input.less file for component-specific styles
3. Passing additional classes via the `className` prop