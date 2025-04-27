# Button Component System

A comprehensive, accessible, and highly customizable button system with specialized variants for different use cases.

## Overview

The Button component system provides a set of components for various interaction patterns, from simple clicks to complex confirmation flows. All components share a consistent API and visual language while being optimized for their specific use cases.

## Base Button Component

The foundation of the system is the `Button` component, which supports various visual styles, sizes, colors, and states.

```tsx
import { Button } from '@/components/ui/button';

// Basic usage
<Button>Click me</Button>

// With variants and colors
<Button variant="outline" color="primary">Outline Button</Button>

// With icons
<Button icons={{ left: <IconMail /> }}>Send Email</Button>

// Loading state
<Button loading={{ isLoading: true, loadingText: "Saving..." }}>Save</Button>

// With animations
<Button animation={{ effect: "scale", ripple: true }}>Animated Button</Button>
```

### Base Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'link'` | `'primary'` | Visual style variant of the button |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the button |
| `color` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'primary'` | Color scheme of the button |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean \| ButtonLoadingProps` | `false` | Loading state configuration |
| `icons` | `ButtonIconProps` | - | Icon configuration |
| `animation` | `ButtonAnimationProps \| 'none' \| 'scale' \| 'lift' \| 'pulse'` | `'none'` | Animation configuration |
| `fullWidth` | `boolean` | `false` | Whether the button should take the full width of its container |
| `rounded` | `boolean` | `false` | Whether the button has a rounded appearance |
| `pill` | `boolean` | `false` | Whether the button has a pill appearance (fully rounded) |
| `active` | `boolean` | `false` | Whether the button is in an active state |
| `pressed` | `boolean` | - | Whether the button is in a pressed state (for toggle buttons) |
| `as` | `React.ElementType` | `'button'` | The HTML element to render the button as |

The component also accepts all standard HTML button attributes.

## Specialized Button Variants

### IconButton

Optimized for icon-only actions with built-in accessibility features.

```tsx
import { IconButton } from '@/components/ui/button';

<IconButton 
  icon={<SearchIcon />} 
  aria-label="Search" 
  variant="ghost"
/>
```

#### IconButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `React.ReactNode` | **Required** | The icon to display |
| `aria-label` | `string` | **Required** | Accessible label for the button |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the button |
| `color` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'primary'` | Color scheme |

### LinkButton

For navigation actions, rendering as an anchor (`<a>`) element while maintaining button styling.

```tsx
import { LinkButton } from '@/components/ui/button';

<LinkButton 
  href="/dashboard" 
  external={true}
  buttonStyle={true}
>
  Go to Dashboard
</LinkButton>
```

#### LinkButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | **Required** | The URL to navigate to |
| `external` | `boolean` | `false` | Whether the link should open in a new tab |
| `underlined` | `boolean` | `false` | Whether the link should be styled as an underlined link |
| `buttonStyle` | `boolean` | `false` | Whether the link should be styled as a button |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the button |
| `color` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'primary'` | Color scheme |

### ToggleButton

Designed for toggling between two states, perfect for on/off controls or selection.

```tsx
import { ToggleButton } from '@/components/ui/button';

// Controlled usage
const [isSelected, setIsSelected] = useState(false);

<ToggleButton 
  isPressed={isSelected} 
  onPressedChange={setIsSelected}
  variant="outline"
>
  Toggle Feature
</ToggleButton>
```

#### ToggleButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isPressed` | `boolean` | - | Whether the toggle button is pressed/selected |
| `onPressedChange` | `(isPressed: boolean) => void` | - | Callback when the pressed state changes |
| `uncontrolled` | `boolean` | `false` | Whether the toggle button should manage its own state |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'outline'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the button |
| `color` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'primary'` | Color scheme |

### LoadingButton

Optimized for actions that require processing time, with built-in loading states and progress indicators.

```tsx
import { LoadingButton } from '@/components/ui/button';

// With automatic loading state
<LoadingButton 
  autoLoading 
  loadingDuration={3000}
  loadingText="Processing..."
  onClick={handleSubmit}
>
  Submit
</LoadingButton>

// With progress indicator
<LoadingButton 
  isLoading={true}
  progress={uploadProgress}
  loadingText="Uploading..."
>
  Upload File
</LoadingButton>
```

#### LoadingButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isLoading` | `boolean` | `false` | Whether the button is in a loading state |
| `loadingText` | `string` | - | Text to display when in loading state |
| `showSpinner` | `boolean` | `true` | Whether to show a spinner when in loading state |
| `progress` | `number` | - | Progress value for controlled loading (0-100) |
| `autoLoading` | `boolean` | `false` | Whether the button should automatically enter loading state when clicked |
| `loadingDuration` | `number` | `2000` | Duration in milliseconds for the loading state when autoLoading is true |
| `onLoadingChange` | `(isLoading: boolean) => void` | - | Callback when loading state changes |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'link'` | `'primary'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the button |
| `color` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'primary'` | Color scheme |

### ConfirmButton

For actions that require confirmation before execution, with built-in timeout and visual feedback.

```tsx
import { ConfirmButton } from '@/components/ui/button';

<ConfirmButton
  onConfirm={() => deleteItem(id)}
  confirmText="Are you sure?"
  color="primary"
  confirmColor="danger"
>
  Delete Item
</ConfirmButton>
```

#### ConfirmButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `confirmText` | `string` | `"Confirm?"` | Text to show when in confirmation state |
| `onConfirm` | `() => void` | **Required** | Function to call when the action is confirmed |
| `onCancel` | `() => void` | - | Function to call when the action is canceled |
| `confirmColor` | `ButtonColor` | `"danger"` | The color to use for the confirmation state |
| `confirmVariant` | `ButtonVariant` | - | The variant to use for the confirmation state |
| `timeout` | `number` | `3000` | Time in milliseconds before reverting to initial state if not confirmed |
| `showCountdown` | `boolean` | `true` | Whether to show a countdown indicator |
| `autoRevert` | `boolean` | `true` | Whether to automatically revert to initial state after timeout |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'link'` | `'primary'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the button |
| `color` | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'primary'` | Color scheme |

## Button vs Toggle Component

The Button system includes a `ToggleButton` component, while the UI library also has a separate `Toggle` component. Here's how they differ:

### ToggleButton
- Looks like a standard button that can be toggled on/off
- Follows button styling conventions
- Used for toggling features or options within forms or interfaces
- Better for options that need to be prominently displayed
- Example use cases: Bold/Italic formatting buttons, view mode toggles

### Toggle (Switch)
- Looks like a switch with a sliding knob
- Has a distinct on/off visual appearance
- Used primarily for boolean settings
- Better for settings pages or preference panels
- Example use cases: Dark mode switch, notification settings

## Accessibility Features

All button components include comprehensive accessibility features:

- Proper ARIA attributes (`aria-pressed`, `aria-busy`, `aria-disabled`)
- Keyboard navigation support
- Focus management
- Screen reader announcements
- Reduced motion support
- High contrast support

## Animation Features

The Button system supports several animations that enhance the user experience:

- **Scale Animation**: Button scales slightly when hovered
- **Lift Animation**: Button lifts up and shows a shadow when hovered
- **Pulse Animation**: Button shows a pulsing effect
- **Ripple Effect**: Shows a ripple emanating from the click point
- **Loading Animation**: Shows a spinner or progress indicator

All animations respect the user's reduced motion preferences.

## Best Practices

### When to Use Each Button Type

- **Button**: For standard actions that trigger immediately
- **IconButton**: For compact UI where space is limited
- **LinkButton**: For navigation to other pages or resources
- **ToggleButton**: For toggling features or modes
- **LoadingButton**: For actions that take time to complete
- **ConfirmButton**: For potentially destructive actions that need confirmation

### Button Hierarchy

Create a clear visual hierarchy with button variants:

1. **Primary**: Main action on the page/form
2. **Secondary**: Alternative actions
3. **Outline/Ghost**: Less important actions
4. **Link**: Tertiary actions or navigation

### Color Usage

- **Primary**: Default for most actions
- **Success**: Completion, creation, or positive actions
- **Warning**: Actions that need attention
- **Danger**: Destructive or irreversible actions
- **Info**: Informational actions

## Examples

### Form Submission

```tsx
<LoadingButton
  autoLoading
  loadingText="Saving..."
  onClick={handleSubmit}
  fullWidth
>
  Save Changes
</LoadingButton>
```

### Destructive Action

```tsx
<ConfirmButton
  onConfirm={handleDelete}
  confirmText="Delete permanently?"
  color="danger"
  variant="outline"
>
  Delete Account
</ConfirmButton>
```

### Feature Toggle

```tsx
<ToggleButton
  isPressed={darkMode}
  onPressedChange={setDarkMode}
  variant="ghost"
  icons={{ left: darkMode ? <MoonIcon /> : <SunIcon /> }}
>
  {darkMode ? "Dark Mode" : "Light Mode"}
</ToggleButton>
```

### Navigation

```tsx
<LinkButton
  href="/profile"
  icons={{ right: <ArrowRightIcon /> }}
  buttonStyle
>
  View Profile
</LinkButton>
```

### Compact Action

```tsx
<IconButton
  icon={<EditIcon />}
  aria-label="Edit profile"
  variant="ghost"
  size="sm"
/>
```