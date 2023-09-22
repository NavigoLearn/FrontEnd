import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import BackArrow from '@src/components/roadmap/navbar-roadmap/parts/BackArrow';
import { setBasePopup } from '@src/components/shared/stores/store-base-popups';
import { useClickOutside } from '@src/hooks/useClickOutside';
import useStateAndRef from '@src/hooks/useStateAndRef';
import userStatus from '@src/store/user/user-status';
import dropdown from '@assets/dropdown.svg';
import dropclose from '@assets/cross.svg';
import SearchRoadmapM from '../searchM/SearchRoadmapM';
import SlideMenu from '../navmenu/SlideMenu';

const NavbarButtonsM = ({ navmenu }: { navmenu }) => {
  const [searchClick, setSearchClick] = useState(false);
  const [menuOpen, setMenuOpen, menuOpenRef] = useStateAndRef(false);
  const [currentPath, setCurrentPath] = useState('');

  const { isLogged } = useStore(userStatus);

  const handleSearchClick = () => {
    setSearchClick((prev) => !prev);
  };

  // useScreenLock didn't work with the animation
  useEffect(() => {
    setCurrentPath(window.location.pathname);
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
    setBasePopup('get-started');
  };
  return (
    <div className='w-full flex justify-between select-none'>
      {currentPath !== '/' && !searchClick && (
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
    </div>
  );
};

export default NavbarButtonsM;
