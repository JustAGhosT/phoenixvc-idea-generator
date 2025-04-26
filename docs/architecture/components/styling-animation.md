# Animation and Motion

This document covers our approach to animation and motion as part of our styling strategy.

## Animation Principles

We follow these core animation principles:

1. **Purpose-driven** - Animations should serve a purpose, not just be decorative
2. **Subtle and natural** - Animations should feel natural and not distract users
3. **Performance-focused** - Animations should be optimized for performance
4. **Accessible** - Animations should respect user preferences for reduced motion
5. **Consistent** - Animations should be consistent across the application

## CSS Module Animations

We implement animations in CSS Modules for component-specific animations:

```css
/* Component.module.css */
.button {
  background-color: var(--color-primary);
  color: white;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.button:hover {
  background-color: var(--color-primary-dark);
}

.button:active {
  transform: translateY(1px);
}
```

For more complex animations, we separate them into dedicated CSS Module files:

```css
/* ComponentAnimations.module.css */
.fadeIn {
  animation: fadeIn 0.3s ease forwards;
}

.slideIn {
  animation: slideIn 0.3s ease forwards;
}

.zoomIn {
  animation: zoomIn 0.3s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes zoomIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

```tsx
// Component.tsx
import styles from './Component.module.css';
import animations from './ComponentAnimations.module.css';
import { cn } from '@/utils/classnames';

export function Component({ animate = true, className, children, ...props }) {
  return (
    <div
      className={cn(
        styles.component,
        animate && animations.fadeIn,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
```

## Animation Best Practices

1. **Separate animations from core styles** - Keep animations in dedicated CSS Module files
2. **Use hardware-accelerated properties** - Prefer `transform` and `opacity` for animations
3. **Keep animations short** - Animations should typically be 300ms or less
4. **Use appropriate easing** - Use appropriate easing functions for different types of animations
5. **Make animations optional** - Allow animations to be disabled via props

## Reduced Motion Support

We support users who prefer reduced motion by respecting the `prefers-reduced-motion` media query:

```css
/* ComponentAnimations.module.css */
@media (prefers-reduced-motion: reduce) {
  .fadeIn,
  .slideIn,
  .zoomIn {
    animation: none;
    transition: none;
  }
}
```

We also provide a custom hook to detect reduced motion preferences:

```tsx
// hooks/useReducedMotion.ts
import { useState, useEffect } from 'react';

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
}
```

```tsx
// Component with reduced motion support
import { useReducedMotion } from '@/hooks/useReducedMotion';

function Component() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className={prefersReducedMotion ? styles.static : styles.animated}>
      {/* Component content */}
    </div>
  );
}
```

## Animation Types

We use different animation types for different purposes:

1. **Micro-interactions** - Small animations that provide feedback (button presses, hover states)
2. **Transitions** - Animations between states (opening/closing modals, expanding/collapsing sections)
3. **Loading states** - Animations that indicate loading or processing
4. **Attention-grabbing** - Animations that draw attention to important elements

### Micro-interactions

```css
/* Button.module.css */
.button {
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.button:hover {
  background-color: var(--color-primary-dark);
}

.button:active {
  transform: translateY(1px);
}
```

### Transitions

```css
/* Modal.module.css */
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.overlay--open {
  opacity: 1;
}

.content {
  transform: translateY(10px);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.content--open {
  transform: translateY(0);
  opacity: 1;
}
```

### Loading States

```css
/* Spinner.module.css */
.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### Attention-grabbing

```css
/* Notification.module.css */
.notification {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .notification {
    animation: none;
  }
}
```

## Animation with Tailwind

We can also use Tailwind's animation utilities for simple animations:

```tsx
<div className="animate-fade-in duration-300 ease-in-out">
  {/* Content */}
</div>
```

For more complex animations, we extend Tailwind's animation configuration:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out forwards',
        'slide-in': 'slideIn 0.3s ease-in-out forwards',
        'zoom-in': 'zoomIn 0.3s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
```

## Conclusion

Our animation approach focuses on purposeful, subtle, and accessible animations that enhance the user experience without being distracting. By separating animations from core styles and respecting user preferences, we create a more inclusive and performant application.