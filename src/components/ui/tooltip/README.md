# Tooltip Component

A flexible tooltip component for displaying additional information when users hover over an element.

## Features

- Simple API with compound component pattern
- Customizable positioning (top, right, bottom, left)
- Adjustable offset
- Animated appearance/disappearance
- Dark theme support
- Accessible by default

## Directory Structure

```
src/components/ui/tooltip/
├── index.ts                  # Main exports
├── Tooltip.tsx               # Main component
├── Tooltip.module.css        # CSS Module styles
├── README.md                 # Documentation
├── parts/                    # Subcomponents
│   ├── TooltipContent.tsx
│   ├── TooltipProvider.tsx
│   └── TooltipTrigger.tsx
└── __tests__/                # Test and story files
    ├── Tooltip.test.tsx
    └── Tooltip.stories.tsx
```

## Usage

```tsx
import { Tooltip } from '@/components/ui/tooltip';

// Basic usage
<Tooltip.Provider>
  <Tooltip>
    <Tooltip.Trigger>Hover me</Tooltip.Trigger>
    <Tooltip.Content>
      This is a tooltip
    </Tooltip.Content>
  </Tooltip>
</Tooltip.Provider>

// With a button as trigger
<Tooltip.Provider>
  <Tooltip>
    <Tooltip.Trigger asChild>
      <button>Button with Tooltip</button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      This tooltip appears when hovering the button
    </Tooltip.Content>
  </Tooltip>
</Tooltip.Provider>

// Custom positioning
<Tooltip.Provider>
  <Tooltip>
    <Tooltip.Trigger>Custom Position</Tooltip.Trigger>
    <Tooltip.Content side="right" sideOffset={10}>
      This tooltip appears on the right with a custom offset
    </Tooltip.Content>
  </Tooltip>
</Tooltip.Provider>

// Rich content
<Tooltip.Provider>
  <Tooltip>
    <Tooltip.Trigger>Rich Content</Tooltip.Trigger>
    <Tooltip.Content className="max-w-xs">
      <div className="flex flex-col gap-2">
        <h4 className="font-bold">Rich Tooltip</h4>
        <p>Tooltips can contain rich content including headings, paragraphs, and other elements.</p>
      </div>
    </Tooltip.Content>
  </Tooltip>
</Tooltip.Provider>
```

## Props

### Tooltip

The main `Tooltip` component accepts all properties from Radix UI's Tooltip.Root component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| defaultOpen | boolean | false | Whether the tooltip is open by default |
| open | boolean | - | Controlled open state |
| onOpenChange | (open: boolean) => void | - | Callback when open state changes |
| delayDuration | number | 700 | Delay in ms before showing the tooltip |
| skipDelayDuration | number | 300 | Delay to skip when quickly moving between tooltip triggers |
| disableHoverableContent | boolean | false | Disable hovering content to keep it open |
| children | ReactNode | - | Tooltip trigger and content components |

### Tooltip.Provider

The `Tooltip.Provider` component should wrap all tooltips in your application.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| delayDuration | number | 700 | Default delay for all tooltips |
| skipDelayDuration | number | 300 | Default skip delay for all tooltips |
| disableHoverableContent | boolean | false | Disable hoverable content for all tooltips |
| children | ReactNode | - | Application content with tooltips |

### Tooltip.Trigger

The `Tooltip.Trigger` component is the element that triggers the tooltip.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| asChild | boolean | false | Use the child as the trigger element |
| className | string | - | Additional CSS class names |
| children | ReactNode | - | Trigger content |

### Tooltip.Content

The `Tooltip.Content` component is the content displayed in the tooltip.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| side | 'top' \| 'right' \| 'bottom' \| 'left' | 'top' | Preferred side of the trigger to render |
| sideOffset | number | 4 | Distance from the trigger |
| align | 'start' \| 'center' \| 'end' | 'center' | Alignment along the trigger |
| alignOffset | number | 0 | Offset from alignment |
| avoidCollisions | boolean | true | Whether to avoid collisions with viewport edges |
| className | string | - | Additional CSS class names |
| children | ReactNode | - | Tooltip content |

## Styling

The Tooltip component uses CSS Modules with Tailwind CSS:

- Light theme styling with appropriate shadows and borders
- Dark theme support via data-theme="dark" on the :root element
- Smooth animations for appearance/disappearance
- Directional animations based on tooltip position

### CSS Variables

The component uses the following Tailwind CSS variables:

```css
--popover-foreground: #111827 (dark text color)
--popover: #ffffff (background color)
```

## Accessibility

- The Tooltip component follows WAI-ARIA guidelines for tooltips
- Tooltips are announced by screen readers
- Tooltips can be triggered via keyboard focus
- Tooltips have appropriate ARIA roles and attributes
- Animations respect user preferences for reduced motion

## Testing

The Tooltip component is tested for:
- Correct rendering of trigger and content
- Proper showing/hiding on hover
- Proper application of custom classes and props
- Accessibility compliance
- Correct animation behavior