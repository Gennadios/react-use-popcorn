import { useState, useEffect } from 'react';

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(localStorage.getItem(key)) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
