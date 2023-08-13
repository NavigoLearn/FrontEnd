import { useEffect } from 'react';

type ICallback = () => void;

export function usePressEsc(callback: ICallback) {
  useEffect(() => {
    function handlePressEsc(event) {
      if (event.key === 'Escape') {
        callback();
      }
    }
    document.addEventListener('keydown', handlePressEsc);
    return () => {
      document.removeEventListener('keydown', handlePressEsc);
    };
  }, []);
}
