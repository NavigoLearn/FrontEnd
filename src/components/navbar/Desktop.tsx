import React, { useState, useEffect } from 'react';
import logoSrc from '@assets/logo.svg';
import { useStore } from '@nanostores/react';
import ProfileDropdown from '@components/navbar/ProfileDropdown';
import loggedUser from '@store/user/logged-user';
import userStatus from '@store/user/user-status';
import DesktopButton from '@components/navbar/DesktopButton';
import SearchRoadmap from '@components/navbar/SearchRoadmap';
import { loggedLinks, guestLinks } from './Links';

const DesktopNavbar = () => {
  const [hydrated, setHydrated] = useState(false);
  const { profilePictureUrl } = useStore(loggedUser);
  const { loaded, isLogged } = useStore(userStatus);

  useEffect(() => {
    setHydrated(true);
    // add event listener for scroll
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        if (window.scrollY > 0) {
          navbar.classList.add('bg-white');
          navbar.classList.add('shadow-standard');
        } else {
          navbar.classList.remove('bg-white');
          navbar.classList.remove('shadow-standard');
        }
      }
    });
  }, []);

  return (
    <nav className='bg-white relative flex w-full h-16 z-10 items-center transition-all justify-center duration-300 select-none'>
      <a
        href='/explore'
        className='justify-start cursor-pointer flex left-0 absolute'
      >
        <img
          draggable='false'
          className='w-20 ml-8 select-none '
          src={logoSrc}
          alt='navbar-logo'
        />
      </a>
      <div className='justify-center'>
        <SearchRoadmap />
      </div>
      <ul className='flex text-center items-center gap-4 h-full absolute right-4'>
        {hydrated &&
          loaded &&
          isLogged &&
          loggedLinks.map((link) => {
            return (
              <DesktopButton
                key={link.id}
                id={link.id}
                hasUnder={link.hasUnder}
                title={link.title}
                path={link.path}
                cName={link.cName}
                cIcon={link.cIcon}
              />
            );
          })}
        {hydrated && loaded && isLogged && (
          <ProfileDropdown
            profilePictureUrl={
              profilePictureUrl ||
              'https://media.istockphoto.com/id/470100848/ro/vector/pictograma-profilului-masculin-alb%C4%83-pe-fundal-albastru.jpg?s=612x612&w=0&k=20&c=-We-8zY-Oj7MMSuKwpOEkm7QUX8Gnc4Bk0KcBIO8lYY='
            }
          />
        )}

        {hydrated &&
          loaded &&
          !isLogged &&
          guestLinks.map((link) => {
            return (
              <DesktopButton
                key={link.id}
                id={link.id}
                hasUnder={link.hasUnder}
                title={link.title}
                path={link.path}
                cName={link.cName}
                cIcon={link.cIcon}
              />
            );
          })}
      </ul>
    </nav>
  );
};

export default DesktopNavbar;
