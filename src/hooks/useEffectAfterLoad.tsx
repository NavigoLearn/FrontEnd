import { useEffect } from 'react';
import { useIsLoaded } from '@hooks/useIsLoaded';

export function useEffectAfterLoad(func: () => void, dependencies: any[]) {
  const isLoaded = useIsLoaded();
  useEffect(() => {
    isLoaded && func();
  }, [isLoaded, ...dependencies]);
}
