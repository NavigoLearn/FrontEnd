import { useState, useRef, useEffect } from 'react';

export const useMobileNavbar = () => {
  const [hydrated, setHydrated] = useState(false);
  const [navClassUpdated, setNavClassUpdated] = useState(false);
  const prevScrollY = useRef(0);

  const handleScroll = () => {
    requestAnimationFrame(() => {
      const threshold = 30;
      const currentScrollY = window.scrollY;

      if (
        !navClassUpdated &&
        currentScrollY > prevScrollY.current + threshold
      ) {
        navmenu.current.classList.add('hidden');
        navmenu.current.classList.remove('sticky-navbar');
        setNavClassUpdated(true);
      } else if (navClassUpdated && currentScrollY < prevScrollY.current) {
        navmenu.current.classList.remove('hidden');
        navmenu.current.classList.add('sticky-navbar');
        setNavClassUpdated(false);
      }

      prevScrollY.current = currentScrollY;
    });
  };

  useEffect(() => {
    setHydrated(true);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { hydrated, navClassUpdated, prevScrollY, handleScroll };
};
