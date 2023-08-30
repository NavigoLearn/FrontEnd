import { useEffect, useState } from 'react';

export function useInvisibleSearch(
  initialValue: string,
  resetDependencies: any[] = []
) {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key.length === 1 && !e.ctrlKey) {
        setValue((prev) => prev + e.key);
      }
      if (e.key === 'Backspace') {
        setValue((prev) => prev.slice(0, prev.length - 1));
      }
    });
    return () => {
      document.removeEventListener('keydown', () => {});
    };
  }, []);

  useEffect(() => {
    setValue(initialValue);
  }, [...resetDependencies]);

  return value;
}
