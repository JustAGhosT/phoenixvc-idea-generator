# useReducedMotion Hook

A React hook that detects if the user has requested reduced motion through their operating system preferences.

## Purpose

This hook helps build accessible applications by respecting the user's motion preferences. When users enable the "Reduce motion" setting in their operating system, animations can cause discomfort or even physical symptoms for people with vestibular disorders or motion sensitivity.

## Usage

```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion';

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className={prefersReducedMotion ? 'no-animation' : 'with-animation'}>
      {/* Component content */}
    </div>
  );
}
```

## Examples

### Conditionally applying animations

```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motion } from 'framer-motion';

function AnimatedCard() {
  const prefersReducedMotion = useReducedMotion();
  
  const animations = prefersReducedMotion 
    ? {} // No animations
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
      };
  
  return (
    <motion.div {...animations} className="card">
      <h2>Card Title</h2>
      <p>Card content</p>
    </motion.div>
  );
}
```

### With CSS classes

```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './Button.module.css';
import { cn } from '@/utils/classnames';

function Button({ children }) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <button
      className={cn(
        styles.button,
        !prefersReducedMotion && styles.buttonAnimation
      )}
    >
      {children}
    </button>
  );
}
```

### With CSS variables

```tsx
import { useReducedMotion } from '@/hooks/useReducedMotion';

function TransitionComponent() {
  const prefersReducedMotion = useReducedMotion();
  
  const style = {
    '--transition-duration': prefersReducedMotion ? '0s' : '0.3s',
  } as React.CSSProperties;
  
  return (
    <div style={style} className="transition-element">
      Hover me
    </div>
  );
}
```

## Best Practices

1. **Provide alternatives**: When disabling animations, consider providing alternative ways to convey the same information.

2. **Don't completely remove transitions**: Sometimes, abrupt changes can be more jarring than subtle transitions. Consider using very short durations instead of removing transitions entirely.

3. **Test with reduced motion enabled**: Always test your application with the "Reduce motion" setting enabled to ensure it remains usable.

4. **Combine with CSS**: For simple cases, you can also use the CSS media query directly:

```css
.animated-element {
  transition: transform 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  .animated-element {
    transition: none;
  }
}
```

5. **SSR compatibility**: This hook is designed to work with server-side rendering (SSR) by defaulting to `false` during server rendering and updating after mounting on the client.

## Browser Support

The hook uses the `prefers-reduced-motion` media query, which is supported in all modern browsers:

- Chrome 74+
- Firefox 63+
- Safari 10.1+
- Edge 79+

For older browsers, the hook will default to `false` (animations enabled).

## Implementation Details

- Uses `window.matchMedia` to detect the user's preference
- Supports both modern (`addEventListener`) and legacy (`addListener`) event listener APIs
- Properly cleans up event listeners on component unmount
- Handles server-side rendering gracefully
- Updates in real-time if the user changes their preference

## Related Resources

- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [WCAG: Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [A List Apart: Designing Safer Web Animation For Motion Sensitivity](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity/)