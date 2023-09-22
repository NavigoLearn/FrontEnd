import React, { useEffect, useRef, useState } from 'react';
import BackArrow from '@src/components/roadmap/navbar-roadmap/parts/BackArrow';
import dropdown from '@assets/dropdown.svg';
import dropclose from '@assets/cross.svg';
import { useClickOutside } from '@src/hooks/useClickOutside';
import useStateAndRef from '@src/hooks/useStateAndRef';
import SearchRoadmapM from './parts/searchM/SearchRoadmapM';
import SlideMenu from './parts/navmenu/SlideMenu';
import AuthPopupM from './parts/authPopupM/AuthPopupM';

const MobileNavbar = () => {
  const [searchClick, setSearchClick] = useState(false);
  const [menuOpen, setMenuOpen, menuOpenRef] = useStateAndRef(false); // Track menu open state
  const [hydrated, setHydrated] = useState(false);
  const [authPopup, setAuthPopup] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [defaultBodyOverflow, setDefaultBodyOverflow] = useState('auto');
  const [locked, setLocked] = useState(false);
  const navmenu = useRef(null);
  const isLogged = false;
  const prevScrollY = useRef(0);

  function preventDefault(e: Event) {
    if (locked) e.preventDefault();
  }

  const handleScroll = () => {
    requestAnimationFrame(() => {
      const threshold = 30;
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current + threshold) {
        if (!menuOpenRef.current) {
          navmenu.current.classList.add('hidden');
          navmenu.current.classList.remove('sticky-navbar');
        }
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
    setCurrentPath(window.location.pathname);

    const html = document.querySelector('html');
    html.addEventListener('touchmove', preventDefault, { passive: false });

    window.addEventListener('resize', () => {
      html.style.setProperty('--height', `${window.innerHeight}px`);
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearchClick = () => {
    setSearchClick((prev) => !prev);
    // body overflow hidden
    const html = document.querySelector('html');
    if (html) {
      setDefaultBodyOverflow(html.style.overflow);
      html.style.overflow = 'hidden'; // hide scroll clip
      html.style.height = 'calc(var(--height) - 1px)';
      prevScrollY.current = window.scrollY; // Reset the previous scroll position
      setLocked(true);
    }
  };

  // useScreenLock didn't work with the animation
  useEffect(() => {
    if (menuOpen) {
      // Function to handle the scroll event and prevent default behavior

      document.body.classList.add('h-screen');
      document.body.classList.add('overflow-y-clip');

      // Remove the event listener when the component unmounts
      return () => {
        document.body.classList.remove('h-screen');
        document.body.classList.add('overflow-y-clip');
      };
    }
    return () => {};
  }, [menuOpen]);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  useClickOutside(navmenu, () => {
    if (menuOpenRef.current === false) {
      return;
    }

    setMenuOpen(false);
  });

  const handleAuthClick = () => {
    setAuthPopup((prev) => !prev);
  };

  return (
    <nav
      ref={navmenu}
      className='bg-white relative w-full justify-between select-none flex h-12 z-[100] 
    transition-transform duration-300 ease-in-out
  '
    >
      {hydrated && currentPath !== '/' && !searchClick && (
        <div className='flex my-auto'>
          <BackArrow />
        </div>
      )}
      <div className='flex ml-6 items-center'>
        {!searchClick && !isLogged && !menuOpen && (
          <button
            type='button'
            onClick={handleAuthClick}
            className='flex font-roboto-text text-darkBlue text-lg font-medium'
          >
            Get Started
          </button>
        )}
        {authPopup && <AuthPopupM toggleAuth={handleAuthClick} />}
      </div>
      <div
        className={`flex flex-row items-center gap-2 ${
          searchClick ? 'mr-14' : ''
        }`}
      >
        <SearchRoadmapM handleSearchClick={handleSearchClick} />
        {!searchClick && (
          <div>
            <div className='flex mr-6 w-fit h-fit' onClick={handleMenuClick}>
              <img
                src={menuOpen ? dropclose.src : dropdown.src}
                alt='dropdown'
                className='w-8 h-8'
              />
            </div>
            <SlideMenu isOpen={menuOpen} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default MobileNavbar;
