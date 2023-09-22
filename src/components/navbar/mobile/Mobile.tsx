import React, { useEffect, useRef } from 'react';
import NavbarButtonsM from './parts/buttons/NavbarButtonsM';

const MobileNavbar = () => {
  const prevScrollY = useRef(0);
  const navmenu = useRef(null);

  const handleScroll = () => {
    requestAnimationFrame(() => {
      const threshold = 30;
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current + threshold) {
        navmenu.current.classList.add('hidden');
        navmenu.current.classList.remove('sticky-navbar');
      } else if (
        currentScrollY < prevScrollY.current - threshold ||
        currentScrollY === 0
      ) {
        navmenu.current.classList.remove('hidden');
        navmenu.current.classList.add('sticky-navbar');
      }

      prevScrollY.current = currentScrollY;
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <nav
      ref={navmenu}
      className='bg-white relative w-full justify-between select-none flex h-12 z-[100] 
    transition-transform duration-300 ease-in-out
  '
    >
      <NavbarButtonsM navmenu={navmenu} />
    </nav>
  );
};

export default MobileNavbar;
