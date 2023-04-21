import React, { useEffect, useState } from 'react';
import dropdown from '@assets/menu.svg';
import dropclose from '@assets/cross.svg';
import logoSrc from '@assets/logo.svg';
import { mobileLogged, mobileGuest } from './Links';

const MobileNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (document.cookie.includes('token')) {
      setIsLoggedIn(true);
    }
  }, []);

  const [click, setClick] = useState(false);

  const handleClick = () => {
    console.log('clicked');
    setClick((prev) => !prev);

    // body overflow hidden
    const body = document.querySelector('body');
    if (body) {
      if (click) {
        body.style.overflow = 'auto';
      } else {
        body.style.overflow = 'hidden';
      }
    }
  };

  return (
    <nav
      className={`bg-background relative  overflow-visible h-12 flex w-full justify-center  ${
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
          className={click ? 'h-12' : 'h-12 object-contain'}
          src={click ? dropclose : dropdown}
          alt='dropdown'
        />
      </div>
      <div className='w-full h-full'>
        <ul
          className={`  bg-background flex-col absolute items-center  ease-linear duration-150 ${
            click
              ? ' left-0  opacity-100 transition-all h-screen w-full top-12  z-50'
              : ' w-full  top-12 -left-full opacity-0 transition-all justify-center z-50'
          }`}
        >
          <a href='/home' className='justify-start cursor-pointer flex'>
            <img
              className='w-full h-20 object-contain items-center'
              src={logoSrc}
              alt='navbar-logo'
            />
          </a>
          {isLoggedIn
            ? mobileLogged.map((link) => {
                return (
                  <li
                    key={link.id}
                    className='flex items-center text-center justify-center relative'
                  >
                    <a className={link.cName} href={link.path}>
                      {link.cIcon && (
                        <img
                          src={link.cIcon}
                          alt='icon'
                          className='w-8 flex justify-center'
                        />
                      )}
                      {link.title}
                    </a>
                  </li>
                );
              })
            : mobileGuest.map((link) => {
                return (
                  <li
                    key={link.id}
                    className='items-center text-center justify-center relative'
                  >
                    <a className={link.cName} href={link.path}>
                      <div className='flex items-center justify-center '>
                        {link.cIcon && (
                          <img
                            src={link.cIcon}
                            alt='icon'
                            className='w-8 flex -translate-x-2'
                          />
                        )}
                        <div>{link.title}</div>
                      </div>
                    </a>
                  </li>
                );
              })}
        </ul>
      </div>
    </nav>
  );
};

export default MobileNavbar;
