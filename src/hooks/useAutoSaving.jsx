import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';


export function useAutoSaving(key, initialValue, delay = 1000) {
  const [value, setValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading sessionStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  const debouncedValue = useDebounce(value, delay);

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(debouncedValue));
    } catch (error) {
      console.error(`Error saving sessionStorage key “${key}”:`, error);
    }
  }, [key, debouncedValue]); 

  return [value, setValue];
}