import React, { forwardRef, useState, useCallback, useMemo } from 'react';
import { cn } from '@/utils/classnames';
import { Button } from '../button/Button';
import { ButtonGroup } from '../button-group/ButtonGroup';
import styles from './SegmentedControl.module.css';

export type SegmentOption<T = string> = {
  /**
   * The value of the segment option
   */
  value: T;
  
  /**
   * The label to display for the segment option
   */
  label: React.ReactNode;
  
  /**
   * Optional icon to display with the label
   */
  icon?: React.ReactNode;
  
  /**
   * Whether this segment is disabled
   */
  disabled?: boolean;
};

export interface SegmentedControlProps<T = string> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * The options to display in the segmented control
   */
  options: SegmentOption<T>[];
  
  /**
   * The currently selected value
   */
  value?: T;
  
  /**
   * Default value for uncontrolled usage
   */
  defaultValue?: T;
  
  /**
   * Callback when the selected value changes
   */
  onChange?: (value: T) => void;
  
  /**
   * The size of the segmented control
   * @default "md"
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * The color scheme of the segmented control
   * @default "primary"
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
  
  /**
   * Whether the control should take the full width of its container
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Whether to show icons only (no labels)
   * @default false
   */
  iconsOnly?: boolean;
  
  /**
   * Whether the segmented control is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * The visual style variant
   * @default "outline"
   */
  variant?: 'outline' | 'ghost';
}

/**
 * SegmentedControl component for selecting one option from a small set of options.
 * 
 * @example
 * ```tsx
 * const options = [
 *   { value: 'day', label: 'Day' },
 *   { value: 'week', label: 'Week' },
 *   { value: 'month', label: 'Month' },
 * ];
 * 
 * const [view, setView] = useState('week');
 * 
 * <SegmentedControl 
 *   options={options} 
 *   value={view} 
 *   onChange={setView} 
 * />
 * ```
 */
export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({
    options,
    value,
    defaultValue,
    onChange,
    size = 'md',
    color = 'primary',
    fullWidth = false,
    iconsOnly = false,
    disabled = false,
    variant = 'outline',
    className,
    ...props
  }, ref) => {
    // For uncontrolled usage
    const [selectedValue, setSelectedValue] = useState<any>(defaultValue || (options[0]?.value ?? null));
    
    // Determine if component is controlled or uncontrolled
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : selectedValue;
    
    // Memoize handler to prevent unnecessary re-renders
    const handleSelect = useCallback((optionValue: any) => {
      if (disabled) return;
      
      if (!isControlled) {
        setSelectedValue(optionValue);
      }
      
      onChange?.(optionValue);
    }, [isControlled, onChange, disabled]);
    
    // Memoize buttons to prevent unnecessary re-renders
    const buttons = useMemo(() => {
      return options.map((option) => (
        <Button
          key={String(option.value)}
          variant={currentValue === option.value ? 'primary' : variant}
          color={color}
          size={size}
          disabled={disabled || option.disabled}
          onClick={() => handleSelect(option.value)}
          icons={option.icon ? { 
            left: !iconsOnly ? option.icon : undefined,
            only: iconsOnly ? option.icon : undefined
          } : undefined}
          aria-pressed={currentValue === option.value}
          aria-label={iconsOnly && typeof option.label === 'string' ? option.label : undefined}
        >
          {!iconsOnly && option.label}
        </Button>
      ));
    }, [options, currentValue, variant, color, size, disabled, iconsOnly, handleSelect]);
    
    return (
      <div
        ref={ref}
        className={cn(
          styles.segmentedControl,
          className
        )}
        role="group"
        aria-label="Segmented Control"
        {...props}
      >
        <ButtonGroup
          attached
          fullWidth={fullWidth}
          className={styles.buttonGroup}
        >
          {buttons}
        </ButtonGroup>
      </div>
    );
  }
) as any; // Type cast to fix generic typing issues

SegmentedControl.displayName = 'SegmentedControl';

export default SegmentedControl;