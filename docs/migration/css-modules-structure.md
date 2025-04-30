# CSS Modules Structure Guidelines

This document provides detailed guidelines for CSS Module placement and organization in our component library, with special attention to complex component structures.

## General Rules

1. **Place CSS Module files at the component root level**
   - Each component should have a single CSS Module file at its root
   - All subcomponents should import styles from this root CSS Module file

2. **Use separate animation files when needed**
   - For complex animations, use a separate `ComponentNameAnimations.module.css` file
   - Keep this file at the component root level alongside the main CSS Module

## Standard Component Structure

```
button/
├── Button.tsx               # Main component
├── Button.module.css        # All button styles in one file
├── ButtonAnimations.module.css  # Optional animations file
├── index.ts                 # Exports
└── parts/
    ├── ButtonIcon.tsx       # Imports styles from ../Button.module.css
    └── ButtonLabel.tsx      # Imports styles from ../Button.module.css
```

## Special Cases

### Core Visualization Components

The core visualization library is an exception to our standard structure due to its modular nature. Each core component can have its own CSS Module file:

```
data-visualization/
├── core/                    # Core visualization components
│   ├── axes/                # Axes components
│   │   ├── Axis.tsx
│   │   ├── Axis.module.css  # Axis-specific styles
│   │   └── parts/
│   │       └── AxisTick.tsx # Imports from ../Axis.module.css
│   ├── tooltip/             # Tooltip components
│   │   ├── Tooltip.tsx
│   │   ├── Tooltip.module.css  # Tooltip-specific styles
│   │   └── ...
│   └── ...
└── bar-chart/               # Chart implementation
    ├── BarChart.tsx
    ├── BarChart.module.css  # All bar chart styles in one file
    └── parts/
        └── BarChartAxis.tsx # Imports from ../BarChart.module.css
```

The core visualization components are designed to be used independently, so they maintain their own CSS Module files. However, chart implementations (like `bar-chart`) should follow the standard structure with a single CSS Module at the root.

## Incorrect Structures to Avoid

### ❌ CSS Modules in Subcomponent Directories

```
# INCORRECT
button/
├── Button.tsx
├── Button.module.css
└── parts/
    ├── ButtonIcon.tsx
    └── ButtonIcon.module.css  # ❌ Should not have its own CSS Module
```

### ❌ Multiple CSS Modules at Component Root

```
# INCORRECT
button/
├── Button.tsx
├── Button.module.css
├── ButtonIcon.module.css    # ❌ Should be consolidated into Button.module.css
└── parts/
    └── ButtonIcon.tsx
```

### ❌ Absolute Imports for CSS Modules

```tsx
// INCORRECT
import styles from '@/components/ui/button/Button.module.css';

// CORRECT
import styles from './Button.module.css';  // In Button.tsx
import styles from '../Button.module.css'; // In parts/ButtonIcon.tsx
```

## Migration Steps

When standardizing CSS Module placement:

1. Identify components with incorrectly placed CSS Module files
2. Move CSS Module files to the component root level
3. Update all import paths to use relative paths
4. Consolidate multiple CSS Module files if needed
5. Ensure all class names follow the component-prefixed naming convention

You can use the `scripts/standardize-css-modules.js` script to help identify and move misplaced CSS Module files.