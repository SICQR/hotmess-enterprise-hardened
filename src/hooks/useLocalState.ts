import { useState, useEffect } from 'react';

/**
 * useLocalState is a small custom React hook that synchronizes a piece of state
 * with localStorage. This is useful for storing persistent values (like
 * loyalty points) without relying on external libraries. It accepts a
 * `key` for localStorage and a default value. Whenever the state changes
 * the new value is serialized and saved. On initial load it attempts to
 * restore any previously saved value.
 */
export function useLocalState<T>(key: string, defaultValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Silent fail – storage may be disabled or quota exceeded
    }
  }, [key, value]);

  return [value, setValue];
}