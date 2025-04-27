# QuoteDisplay Component

The QuoteDisplay component is used for displaying quotes, testimonials, or pull quotes with attribution and styling options.

## Features

- Display quotes with author, source, and date attribution
- Multiple color variants and size options
- Different layout styles (default, centered, bordered, minimal)
- Optional quote icon with customization (string identifiers or custom icons)
- Loading state with skeleton animation
- Interactive quotes with onClick handler
- Accessibility features
- Multiple animation options
- Internationalization support with lang attribute
- Tooltip support
- Citation URL support
- Semantic HTML structure

## Usage

### Basic Usage

```tsx
import { QuoteDisplay } from '@/components/data-display/quote-display';

<QuoteDisplay 
  quote="The best way to predict the future is to invent it." 
  author="Alan Kay"
  source="1971 meeting"
/>
```

### With Color Variant

```tsx
<QuoteDisplay 
  quote="Design is not just what it looks like and feels like. Design is how it works." 
  author="Steve Jobs"
  variant="primary"
/>
```

### Different Sizes

```tsx
// Small size
<QuoteDisplay
  quote="Small quote size example."
  author="Small Author"
  size="sm"
/>

// Medium size (default)
<QuoteDisplay
  quote="Medium quote size example."
  author="Medium Author"
  size="md"
/>

// Large size
<QuoteDisplay
  quote="Large quote size example with more emphasis."
  author="Large Author"
  size="lg"
/>
```

### Different Layouts

```tsx
// Default layout
<QuoteDisplay
  quote="Default layout with left alignment and border."
  author="Default Layout"
  layout="default"
/>

// Centered layout
<QuoteDisplay
  quote="Centered layout with top border instead of left border."
  author="Centered Layout"
  layout="centered"
/>

// Bordered layout
<QuoteDisplay
  quote="Bordered layout with border on all sides."
  author="Bordered Layout"
  layout="bordered"
/>

// Minimal layout
<QuoteDisplay
  quote="Minimal layout without background or padding."
  author="Minimal Layout"
  layout="minimal"
/>
```

### With Icon Identifiers

```tsx
// Default quote icon
<QuoteDisplay
  quote="Default quote icon."
  author="Default Icon"
  icon="quote"
/>

// Alternative quote icon
<QuoteDisplay
  quote="Alternative quote style."
  author="Alt Icon"
  icon="quote-alt"
/>

// Testimonial icon
<QuoteDisplay
  quote="This is a testimonial with a star icon."
  author="Happy Customer"
  icon="testimonial"
  variant="success"
/>

// Message icon
<QuoteDisplay
  quote="This quote uses a message icon."
  author="Message Icon"
  icon="message"
/>

// Chat icon
<QuoteDisplay
  quote="This quote uses a chat icon."
  author="Chat Icon"
  icon="chat"
/>

// Speech icon
<QuoteDisplay
  quote="This quote uses a speech icon."
  author="Speech Icon"
  icon="speech"
/>
```

### With Custom Icon

```tsx
import { Star } from 'lucide-react';

<QuoteDisplay
  quote="This is a testimonial with a star icon instead of a quote icon."
  author="Happy Customer"
  source="Product Review"
  icon={<Star className="text-yellow-500" />}
  variant="success"
/>
```

### Full Attribution

```tsx
<QuoteDisplay
  quote="The greatest glory in living lies not in never falling, but in rising every time we fall."
  author="Nelson Mandela"
  source="Long Walk to Freedom"
  date="1995"
/>
```

### With Citation URL

```tsx
<QuoteDisplay
  quote="The only way to do great work is to love what you do."
  author="Steve Jobs"
  citationUrl="https://www.example.com/steve-jobs-quotes"
/>
```

### Loading State

```tsx
<QuoteDisplay
  quote="This content is loading..."
  author="Loading Author"
  loading={true}
/>
```

### Interactive Quote

```tsx
<QuoteDisplay
  quote="Click me to see more details about this quote."
  author="Interactive Quote"
  onClick={() => alert('Quote clicked!')}
/>
```

### With Tooltip

```tsx
<QuoteDisplay
  quote="Hover over me to see more information."
  author="Tooltip Example"
  tooltipContent={<div>Additional context about this quote</div>}
/>
```

### With Animation

```tsx
// Fade in animation
<QuoteDisplay
  quote="This quote fades in when rendered."
  author="Animated Quote"
  animation="fadeIn"
/>

// Scale in animation
<QuoteDisplay
  quote="This quote scales in when rendered."
  author="Animated Quote"
  animation="scaleIn"
/>

// Bounce in animation
<QuoteDisplay
  quote="This quote bounces in when rendered."
  author="Animated Quote"
  animation="bounceIn"
/>

// Pulse animation
<QuoteDisplay
  quote="This quote pulses to draw attention."
  author="Animated Quote"
  animation="pulse"
/>

// Slide in from left
<QuoteDisplay
  quote="This quote slides in from the left."
  author="Animated Quote"
  animation="slideInLeft"
/>

// Slide in from right
<QuoteDisplay
  quote="This quote slides in from the right."
  author="Animated Quote"
  animation="slideInRight"
/>

// Slide in from bottom
<QuoteDisplay
  quote="This quote slides in from the bottom."
  author="Animated Quote"
  animation="slideInBottom"
/>

// Typewriter effect
<QuoteDisplay
  quote="This quote appears with a typewriter effect."
  author="Animated Quote"
  animation="typewriter"
/>
```

### With Language Attribution

```tsx
<QuoteDisplay
  quote="La vie est belle quand on sait l'apprécier."
  author="French Philosopher"
  lang="fr"
/>
```

### With Custom ARIA Label

```tsx
<QuoteDisplay
  quote="This quote has a custom screen reader label."
  author="Accessibility Example"
  ariaLabel="Quote by Accessibility Example about screen readers"
/>
```

### Variants Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <QuoteDisplay
    quote="Default variant example."
    author="Default Author"
    variant="default"
  />
  <QuoteDisplay
    quote="Primary variant example."
    author="Primary Author"
    variant="primary"
  />
  <QuoteDisplay
    quote="Secondary variant example."
    author="Secondary Author"
    variant="secondary"
  />
  <QuoteDisplay
    quote="Success variant example."
    author="Success Author"
    variant="success"
  />
  <QuoteDisplay
    quote="Warning variant example."
    author="Warning Author"
    variant="warning"
  />
  <QuoteDisplay
    quote="Danger variant example."
    author="Danger Author"
    variant="danger"
  />
  <QuoteDisplay
    quote="Info variant example."
    author="Info Author"
    variant="info"
  />
</div>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `quote` | `string` | (required) | The quote text to display |
| `author` | `string` | `undefined` | The person or entity who said or wrote the quote |
| `source` | `string` | `undefined` | The source of the quote (book, speech, etc.) |
| `date` | `string` | `undefined` | Optional date of the quote |
| `variant` | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "info"` | `"default"` | Color variant for the quote |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant for the quote |
| `layout` | `"default" \| "centered" \| "bordered" \| "minimal"` | `"default"` | Layout style for the quote |
| `showIcon` | `boolean` | `true` | Whether to show the quote icon |
| `className` | `string` | `undefined` | Additional CSS class names |
| `icon` | `QuoteIconIdentifier \| React.ReactNode` | `undefined` | Icon to display (string identifier or React node) |
| `loading` | `boolean` | `false` | Whether the quote is in a loading state |
| `onClick` | `() => void` | `undefined` | Optional click handler for interactive quotes |
| `tooltipContent` | `React.ReactNode` | `undefined` | Optional tooltip content |
| `animation` | `"none" \| "fadeIn" \| "scaleIn" \| "bounceIn" \| "pulse" \| "slideInLeft" \| "slideInRight" \| "slideInBottom" \| "typewriter"` | `"none"` | Optional animation effect |
| `lang` | `string` | `undefined` | Optional language of the quote (for proper typography) |
| `ariaLabel` | `string` | `undefined` | Optional accessible label for screen readers |
| `citationUrl` | `string` | `undefined` | Optional citation URL for the blockquote |

### QuoteIconIdentifier Type

The following string identifiers can be used for the `icon` prop:

- `"quote"` - Default quote icon
- `"quote-alt"` - Alternative quote symbol
- `"testimonial"` - Star icon for testimonials
- `"message"` - Message bubble icon
- `"chat"` - Chat bubble icon
- `"speech"` - Speech bubble icon

## Accessibility

The QuoteDisplay component implements the following accessibility features:

- Uses semantic HTML elements (`<figure>`, `<blockquote>`, `<figcaption>`, `<cite>`)
- Provides proper ARIA attributes for interactive quotes
- Ensures keyboard navigation for interactive quotes (Enter and Space keys)
- Respects user preferences for reduced motion
- Includes proper language attribution with the `lang` prop
- Indicates loading state with `aria-busy` attribute
- Supports citation URLs with the `cite` attribute on blockquote
- Uses proper ARIA labelling with aria-labelledby and aria-label
- Ensures sufficient color contrast for all variants

## Styling

The QuoteDisplay component uses CSS Modules for styling with the following files:

- `QuoteDisplay.module.css` - Main styles for the component
- `QuoteDisplayAnimations.module.css` - Animation-specific styles

### Customizing Styles

You can customize the appearance of the QuoteDisplay by passing a `className` prop:

```tsx
<QuoteDisplay 
  quote="Custom styled quote." 
  author="Custom Author"
  className="my-custom-class" 
/>
```

## Component Structure

The QuoteDisplay component is composed of several parts:

- `QuoteContent` - Displays the quote text
- `QuoteAttribution` - Shows the author, source, and date information

## Best Practices

- Use the appropriate variant to match your UI's color scheme
- Include attribution whenever possible for credibility
- Consider using the `layout="centered"` for featured quotes
- Use the `loading` state when fetching quotes from an API
- Add the `lang` attribute when displaying quotes in languages other than your site's default
- Make quotes interactive with `onClick` when they lead to more detailed information
- Use the `citationUrl` prop to provide source links for academic or research contexts
- Add tooltips for additional context or explanations
- Choose appropriate icon identifiers based on the content type
- Use animations sparingly and respect user preferences for reduced motion

## Future Expansion

Potential future enhancements for the QuoteDisplay component:

- Rating display for testimonials
- Social media sharing functionality
- Copy-to-clipboard feature
- "Read more" expandable quotes
- Carousel for multiple quotes
- Audio playback for spoken quotes
- Image support for author avatars
- Citation formatting options (MLA, APA, Chicago)
- Quote collections/categories
- Favoriting/saving functionality
- Advanced typography options
- Print-optimized view
- Animated transitions between quotes
- Theme-specific variants
- Custom border and background options

## Related Components

- `StatCard` - For displaying statistics and metrics
- `Testimonial` - A specialized version of QuoteDisplay for customer testimonials
- `CalloutBox` - For displaying important information or warnings
- `Card` - Base card component that can be used with QuoteDisplay
- `Tooltip` - Used for displaying additional information
  