import { useEffect } from 'react';

export function useOnEsc(callback: () => void): void {
  useEffect(() => {
    const runCallback = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback();
      }
    };
    document.addEventListener('keydown', runCallback);
  }, []);
}
