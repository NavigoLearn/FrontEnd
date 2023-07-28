import { useEffect } from 'react';

export function useScrollHidden() {
  useEffect(() => {
    // sets overflow hidden on body
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = 'hidden';
      window.scrollTo({
        top: 0,
      });
    }
    return () => {
      // sets overflow auto on body
      if (body) {
        body.style.overflow = 'auto';
      }
    };
  }, []);
}
