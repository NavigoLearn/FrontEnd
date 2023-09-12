import { useEffect, useState } from 'react';
import { useIsLoaded } from '@hooks/useIsLoaded';

export function useEffectDelayedCycle(func: () => void, dependencies: any[]) {
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    setCycle(cycle + 1);
  }, [...dependencies]);
  useEffect(() => {
    func();
  }, [cycle]);
}
