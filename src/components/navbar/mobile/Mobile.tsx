import React, { useEffect, useRef, useState } from 'react';
import useProfileData from '@src/components/profile/hooks/useProfileData';
import NavbarButtonsM from './parts/buttons/NavbarButtonsM';

type Props = {
  id: string;
};

const MobileNavbar = ({ id }: Props) => {
  useProfileData(id);
  console.log(id);
  const [hydrated, setHydrated] = useState(false);
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
    setHydrated(true);
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
      {hydrated && <NavbarButtonsM navmenu={navmenu} />}
    </nav>
  );
};

export default MobileNavbar;
