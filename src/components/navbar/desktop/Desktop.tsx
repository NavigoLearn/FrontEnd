import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import storeLoggedUser from '@store/user/store-logged-user';
import userStatus from '@store/user/user-status';
import SearchRoadmap from '@components/navbar/desktop/parts/search/SearchRoadmap';
import ButtonsManager from '@components/navbar/desktop/parts/buttons/ButtonsManager';
import Logo from '@components/navbar/desktop/parts/logo/Logo';

const DesktopNavbar = () => {
  const [hydrated, setHydrated] = useState(false);
  const { loaded, isLogged } = useStore(userStatus);

  useEffect(() => {
    setHydrated(true);
    // add event listener for scroll
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        if (window.scrollY > 0) {
          navbar.classList.add('shadow-standard');
        } else {
          navbar.classList.remove('shadow-standard');
        }
      }
    });
  }, []);

  return (
    <nav className='bg-white relative flex w-full h-16 z-10 items-center transition-all justify-center duration-300 select-none'>
      <Logo />
      <div className='justify-center'>
        <SearchRoadmap />
      </div>
      <ul className='flex text-center items-center gap-4 h-full absolute right-4'>
        {hydrated && loaded && <ButtonsManager isLogged={isLogged} />}
      </ul>
    </nav>
  );
};

export default DesktopNavbar;
