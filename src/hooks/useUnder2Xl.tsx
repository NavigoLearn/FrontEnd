import { useEffect, useState } from 'react';

export function useUnder2Xl() {
  const [under2Xl, setUnder2Xl] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1536) {
        setUnder2Xl(true);
      } else {
        setUnder2Xl(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return [under2Xl];
}
