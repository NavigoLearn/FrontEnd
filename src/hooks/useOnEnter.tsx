import { useEffect } from 'react';

export function useOnEnter(callback: () => void): void {
  useEffect(() => {
    const runCallback = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        callback();
      }
    };
    document.addEventListener('keydown', runCallback);
  }, []);
}
