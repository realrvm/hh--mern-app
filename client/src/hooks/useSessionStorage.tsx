import { useCallback, useEffect, useState } from 'react';

type InitialValue<T> = T | null | (() => T | null);

export function useSessionStorage<T>(
  key: string,
  initialValue?: InitialValue<T>
) {
  const sessionStorage = window.sessionStorage;

  const getSessionStorageValue = useCallback(() => {
    const value = sessionStorage.getItem(key);

    if (value) return JSON.parse(value);

    if (typeof initialValue === 'function') {
      return (initialValue as () => T | null)();
    }

    return initialValue;
  }, [key, initialValue]);

  const [value, setValue] = useState(getSessionStorageValue());

  useEffect(() => {
    if (!value) {
      sessionStorage.removeItem(key);
      return;
    }
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T | null, typeof setValue];
}
