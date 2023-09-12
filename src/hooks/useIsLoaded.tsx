import { useEffect, useState } from 'react';

export function useIsLoaded() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return isLoaded;
}
