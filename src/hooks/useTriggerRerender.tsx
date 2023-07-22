import { useState } from 'react';

export function useTriggerRerender() {
  const [, setCount] = useState(0);
  return () => setCount((count) => 1 - count);
}
