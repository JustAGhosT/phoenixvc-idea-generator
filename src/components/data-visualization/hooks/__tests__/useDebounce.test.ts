import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounce } from '../useDebounce';

// Mock timer functions
jest.useFakeTimers();

describe('useDebounce Hook', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial value', 500));
    expect(result.current).toBe('initial value');
  });

  it('should not update the value before the delay has elapsed', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );

    // Change the value
    rerender({ value: 'updated value', delay: 500 });
    
    // Value should not have changed yet
    expect(result.current).toBe('initial value');
    
    // Advance time by 300ms (less than the delay)
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // Value should still not have changed
    expect(result.current).toBe('initial value');
  });

  it('should update the value after the delay has elapsed', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );

    // Change the value
    rerender({ value: 'updated value', delay: 500 });
    
    // Advance time by the full delay
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // Value should have updated
    expect(result.current).toBe('updated value');
  });

  it('should handle multiple rapid value changes correctly', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );

    // Simulate multiple rapid changes
    rerender({ value: 'change 1', delay: 500 });
    
    // Advance time by 200ms
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // Make another change before the first delay completes
    rerender({ value: 'change 2', delay: 500 });
    
    // Advance time by 200ms (400ms total, still less than delay)
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // Make a third change
    rerender({ value: 'change 3', delay: 500 });
    
    // Value should still be the initial value
    expect(result.current).toBe('initial value');
    
    // Advance time to complete the delay for the last change
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // Value should be the latest change
    expect(result.current).toBe('change 3');
  });

  it('should reset the timer when the delay changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );

    // Change the value
    rerender({ value: 'updated value', delay: 500 });
    
    // Advance time by 300ms
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // Change the delay
    rerender({ value: 'updated value', delay: 1000 });
    
    // Advance time by 500ms more (800ms total, less than new delay)
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // Value should still not have changed
    expect(result.current).toBe('initial value');
    
    // Advance time to complete the new delay
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // Value should have updated
    expect(result.current).toBe('updated value');
  });

  it('should work with different types of values', () => {
    // Test with a number
    const { result: numberResult, rerender: rerenderNumber } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 0, delay: 500 } }
    );
    
    rerenderNumber({ value: 42, delay: 500 });
    
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(numberResult.current).toBe(42);
    
    // Test with an object
    const { result: objectResult, rerender: rerenderObject } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: { test: 'initial' }, delay: 500 } }
    );
    
    const newObject = { test: 'updated' };
    rerenderObject({ value: newObject, delay: 500 });
    
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(objectResult.current).toEqual(newObject);
    
    // Test with a boolean
    const { result: boolResult, rerender: rerenderBool } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: false, delay: 500 } }
    );
    
    rerenderBool({ value: true, delay: 500 });
    
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(boolResult.current).toBe(true);
  });

  it('should use the default delay if none is provided', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'initial value' } }
    );

    // Change the value
    rerender({ value: 'updated value' });
    
    // Advance time by 200ms (less than default delay of 300ms)
    act(() => {
      jest.advanceTimersByTime(200);
    });
    
    // Value should not have changed yet
    expect(result.current).toBe('initial value');
    
    // Advance time to complete the default delay
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // Value should have updated
    expect(result.current).toBe('updated value');
  });

  it('should clean up timers when unmounted', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    
    const { result, rerender, unmount } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial value', delay: 500 } }
    );
    
    // Change the value to trigger the timer
    rerender({ value: 'updated value', delay: 500 });
    
    // Unmount the component
    unmount();
    
    // Verify that clearTimeout was called
    expect(clearTimeoutSpy).toHaveBeenCalled();
    
    // Restore the original implementation
    clearTimeoutSpy.mockRestore();
  });
});