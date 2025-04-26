/**
 * Hook for persisting state in localStorage
 * 
 * This hook works like useState but persists the value in localStorage,
 * so it survives page refreshes and browser restarts.
 */

import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';

/**
 * Options for the useLocalStorage hook
 */
interface UseLocalStorageOptions<T> {
  /** Initial value to use if no value is found in localStorage */
  initialValue?: T;
  /** Whether to use session storage instead of local storage */
  useSessionStorage?: boolean;
  /** Custom serializer function */
  serialize?: (value: T) => string;
  /** Custom deserializer function */
  deserialize?: (value: string) => T;
}

/**
 * Hook to persist state in localStorage or sessionStorage
 * 
 * @param key - Storage key
 * @param options - Hook options
 * @returns A stateful value and a function to update it, like useState
 * 
 * @example
 * // Basic usage
 * const [count, setCount] = useLocalStorage('count', { initialValue: 0 });
 * 
 * // Increment count
 * const increment = () => setCount(prev => prev + 1);
 * 
 * @example
 * // With session storage
 * const [user, setUser] = useLocalStorage('user', { 
 *   initialValue: null,
 *   useSessionStorage: true
 * });
 * 
 * @example
 * // With custom serialization
 * const [filters, setFilters] = useLocalStorage('filters', {
 *   initialValue: { category: 'all', sort: 'newest' },
 *   serialize: value => btoa(JSON.stringify(value)),
 *   deserialize: value => JSON.parse(atob(value))
 * });
 */
export function useLocalStorage<T>(
  key: string,
  options: UseLocalStorageOptions<T> = {}
): [T, Dispatch<SetStateAction<T>>] {
  const {
    initialValue,
    useSessionStorage = false,
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  } = options;

  // Get the storage object (localStorage or sessionStorage)
  const getStorage = () => {
    if (typeof window === 'undefined') return null;
    return useSessionStorage ? window.sessionStorage : window.localStorage;
  };

  // Function to get value from storage
  const readValueFromStorage = useCallback((): T => {
    const storage = getStorage();
    if (!storage) return initialValue as T;

    try {
      const storedValue = storage.getItem(key);
      if (storedValue === null) {
        return initialValue as T;
      }

      return deserialize(storedValue);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue as T;
    }
  }, [key, initialValue, deserialize, useSessionStorage]);

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(readValueFromStorage);

  // Function to update stored value and localStorage
  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      const storage = getStorage();
      if (!storage) return;

      try {
        // Allow value to be a function like useState
        const newValue = value instanceof Function ? value(storedValue) : value;

        // Save to state
        setStoredValue(newValue);

        // Save to storage
        storage.setItem(key, serialize(newValue));

        // Dispatch storage event for cross-tab synchronization
        // (only for localStorage, not sessionStorage)
        if (!useSessionStorage) {
          window.dispatchEvent(new StorageEvent('storage', {
            key,
            newValue: serialize(newValue),
            storageArea: storage,
          }));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, serialize, storedValue, useSessionStorage]
  );

  // Listen for changes to this localStorage key in other tabs/windows
  useEffect(() => {
    if (useSessionStorage) return; // sessionStorage doesn't work across tabs

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(deserialize(e.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage change for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, deserialize, useSessionStorage]);

  // Update stored value if the key or initialValue changes
  useEffect(() => {
    setStoredValue(readValueFromStorage());
  }, [key, readValueFromStorage]);

  return [storedValue, setValue];
}

/**
 * Hook to persist state in sessionStorage
 * 
 * This is a convenience wrapper around useLocalStorage with useSessionStorage set to true.
 * 
 * @param key - Storage key
 * @param options - Hook options
 * @returns A stateful value and a function to update it
 */
export function useSessionStorage<T>(
  key: string,
  options: Omit<UseLocalStorageOptions<T>, 'useSessionStorage'> = {}
): [T, Dispatch<SetStateAction<T>>] {
  return useLocalStorage(key, { ...options, useSessionStorage: true });
}

export default useLocalStorage;