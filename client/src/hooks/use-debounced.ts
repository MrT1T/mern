import { useRef } from 'react';
import { UseDebouncedType } from '../types/hooks.type';

export const useDebounced: UseDebouncedType = (func, delay) => {
  const timeoutRef: { current: ReturnType<typeof setTimeout> | undefined } =
    useRef();

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  };

  return (...args) => {
    clearTimer();
    timeoutRef.current = setTimeout(() => func(...args), delay);
  };
};
