import React, { useRef, useEffect } from 'react';

export default function UseDebounce(func, delay, cleanUp = false) {
  const timeoutRef = useRef(null);
  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }

  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);
  return (query) => {
    clearTimer();
    timeoutRef.current = setTimeout(() => {
      func(query);
    }, delay);
  };
}
