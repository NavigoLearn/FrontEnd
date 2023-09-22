import { useState } from 'react';

export const useTimer = (callback: () => void, delay: number) => {
  const [resetTimeout, setResetTimeout] = useState<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    clearTimeout(resetTimeout);
    const timer = setTimeout(() => callback(), delay);
    setResetTimeout(timer);
  };

  return [startTimer];
};
