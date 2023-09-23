import React, { useEffect, useRef, useState } from 'react';
import NavbarButtonsM from './parts/buttons/NavbarButtonsM';
import { handleScroll } from './logic/navScroll-logic';

const MobileNavbar = () => {
  const [hydrated, setHydrated] = useState(false);
  const prevScrollY = useRef(0);
  const navmenu = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setHydrated(true);
    window.addEventListener('scroll', handleScroll(navmenu, prevScrollY));

    return () => {
      window.removeEventListener('scroll', handleScroll(navmenu, prevScrollY));
    };
  }, []);

  return (
    <nav
      ref={navmenu}
      className='bg-white relative w-full justify-between select-none flex h-12 z-[100] 
    transition-transform duration-300 ease-in-out'
    >
      {hydrated && <NavbarButtonsM navmenu={navmenu} />}
    </nav>
  );
};

export default MobileNavbar;
