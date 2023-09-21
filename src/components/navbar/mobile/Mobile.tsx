import React, { useEffect, useRef, useState } from 'react';
import dropdown from '@assets/menu.svg';
import dropclose from '@assets/cross.svg';
import logoSrc from '@assets/logo.svg';
import { useStore } from '@nanostores/react';
import userStatus from '@store/user/user-status';
import { handleLogout } from '@components/auth/old/socialAuth';
import logout from '@assets/logout.svg';
import { mobileLogged, mobileGuest } from '../link';

const MobileLogoutButton = () => {
  return (
    <button
      className='flex justify-center items-center space-x-2 mb-4'
      type='button'
      onClick={() => {
        handleLogout();
      }}
    >
      <img
        draggable='false'
        src={logout.src}
        alt='icon'
        className='w-8 h-6 flex justify-center'
      />
      <div className='flex items-center text-center text-xl py-8 m-auto hover:underline w-10/12 h-12 justify-center font-normal -translate-x-1'>
        Logout
      </div>
    </button>
  );
};

const MobileNavbar = () => {
  const [click, setClick] = useState(false);
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

  const handleClick = () => {
    setClick((prev) => !prev);
    // body overflow hidden
    const html = document.querySelector('html');
    if (html) {
      if (click) {
        html.style.overflow = defaultBodyOverflow;
        html.style.height = '';
        window.scrollTo(0, scrollY);
        setLocked(false);
      } else {
        setDefaultBodyOverflow(html.style.overflow);
        html.style.overflow = 'hidden'; // hide scroll clip
        html.style.height = 'calc(var(--height) - 1px)';
        setScrollY(window.scrollY);
        setLocked(true);
      }
    }
  };

  return (
    <nav
      ref={navbar}
      className={`bg-background relative overflow-visible h-12 flex w-full justify-center select-none transition-all  duration-300 select-none ${
        click ? 'items-center ' : ' '
      }`}
    >
      <div
        className='block absolute top-0 right-0 mr-5 w-8 cursor-pointer'
        onClick={handleClick}
        onKeyDown={handleClick}
        role='presentation'
      >
        <img
          draggable='false'
          className={`relative z-[100] ${
            click ? 'h-12' : 'h-12 w-7 object-contain'
          }`}
          src={click ? dropclose.src : dropdown.src}
          alt='dropdown'
        />
      </div>
      <div className='w-full h-full'>
        <div
          className={`top-0 bg-background h-20 transition-all w-full  z-50 absolute ease-linear duration-150 ${
            click
              ? 'left-0  opacity-100'
              : 'w-full pointer-events-none -left-full opacity-0'
          }`}
        />

        <ul
          className={` bg-background  transition-all flex-col absolute items-center  top-12  z-50 ease-linear duration-150 ${
            click
              ? ' left-0  opacity-100 h-screen w-full'
              : ' w-full   -left-full opacity-0  justify-center'
          }`}
        >
          <a href='/home' className='justify-start cursor-pointer flex'>
            <img
              draggable='false'
              className='w-full h-20 object-contain items-center'
              src={logoSrc.src}
              alt='navbar-logo'
            />
          </a>
          {hydrated && isLogged
            ? mobileLogged.map((link) => {
                return (
                  <li
                    key={link.id}
                    className='flex items-center text-center justify-center relative'
                  >
                    {link.path !== 'logout' ? (
                      <a className={link.cName} href={link.path}>
                        {link.cIcon && (
                          <img
                            draggable='false'
                            src={
                              typeof link.cIcon !== 'string'
                                ? link.cIcon.src
                                : link.cIcon
                            }
                            alt='icon'
                            className='w-8 flex justify-center'
                          />
                        )}
                        {link.title}
                      </a>
                    ) : (
                      <MobileLogoutButton />
                    )}
                  </li>
                );
              })
            : mobileGuest.map((link) => {
                return (
                  <li
                    key={link.id}
                    className='items-center text-center justify-center relative'
                  >
                    {currentPath === '/roadmap/create' &&
                    link.path === '/roadmap/create' ? null : (
                      <a className={link.cName} href={link.path}>
                        <div className='flex items-center justify-center '>
                          {link.cIcon && (
                            <img
                              draggable='false'
                              src={link.cIcon.src}
                              alt='icon'
                              className='w-8 flex -translate-x-2'
                            />
                          )}
                          <div>{link.title}</div>
                        </div>
                      </a>
                    )}
                  </li>
                );
              })}
        </ul>
      </div>
    </nav>
  );
};

export default MobileNavbar;
