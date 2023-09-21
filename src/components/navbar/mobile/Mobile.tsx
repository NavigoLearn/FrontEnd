import React, { useEffect, useRef, useState } from 'react';
import logoSrc from '@assets/logo.svg';
import { useStore } from '@nanostores/react';
import storeLoggedUser from '@store/user/store-logged-user';
import userStatus from '@store/user/user-status';
import { handleLogout } from '@components/auth/old/socialAuth';
import BackArrow from '@src/components/roadmap/navbar-roadmap/parts/BackArrow';
import { mobileLogged, mobileGuest } from '../link';
import SearchRoadmapM from './parts/searchM/SearchRoadmapM';
import NavMenu from './parts/navmenu/NavMenu';

const MobileNavbar = () => {
  const [searchClick, setSearchClick] = useState(false);
  const [menuClick, setMenuClick] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const { loaded, isLogged } = useStore(userStatus);
  const [currentPath, setCurrentPath] = useState('');
  const [defaultBodyOverflow, setDefaultBodyOverflow] = useState('auto');
  const navbar = useRef<HTMLDivElement>(null);
  const [locked, setLocked] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  function preventDefault(e: Event) {
    if (locked) e.preventDefault();
  }

  useEffect(() => {
    setHydrated(true);
    setCurrentPath(window.location.pathname);

    const html = document.querySelector('html');
    html.addEventListener('touchmove', preventDefault, { passive: false });

    window.addEventListener('resize', () => {
      html.style.setProperty('--height', `${window.innerHeight}px`);
    });

    // add event listener for scroll
    window.addEventListener('scroll', () => {
      if (navbar) {
        if (window.scrollY > 0) {
          navbar.current?.classList.add('bg-white');
          navbar.current?.classList.add('shadow-standard');
        } else {
          navbar.current?.classList.remove('bg-white');
          navbar.current?.classList.remove('shadow-standard');
        }
      }
    });
  }, []);

  const handleSearchClick = () => {
    setSearchClick((prev) => !prev);
    // body overflow hidden
    const html = document.querySelector('html');
    if (html) {
      setDefaultBodyOverflow(html.style.overflow);
      html.style.overflow = 'hidden'; // hide scroll clip
      html.style.height = 'calc(var(--height) - 1px)';
      setScrollY(window.scrollY);
      setLocked(true);
    }
  };

  const handleMenuClick = () => {
    setMenuClick((prev) => !prev);
  };

  return (
    <nav className='bg-red-500 relative overflow-x-hidden w-full justify-between select-none flex h-12 z-[20]'>
      <div className='flex my-auto'>
        {hydrated && currentPath !== '/' && !searchClick && <BackArrow />}
      </div>
      <div
        className={`flex flex-row items-center gap-2 ${
          searchClick ? 'mr-14' : ''
        }`}
      >
        <div onClick={handleSearchClick}>
          <SearchRoadmapM clicked={searchClick} />
        </div>
        {!searchClick && (
          <div onClick={handleMenuClick}>
            <NavMenu click={menuClick} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default MobileNavbar;
