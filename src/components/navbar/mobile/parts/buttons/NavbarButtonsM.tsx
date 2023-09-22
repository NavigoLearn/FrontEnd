import React from 'react';
import BackArrow from '@src/components/roadmap/navbar-roadmap/parts/BackArrow';
import { setBasePopup } from '@src/components/shared/stores/store-base-popups';
import dropdown from '@assets/dropdown.svg';
import dropclose from '@assets/cross.svg';
import { useClickOutside } from '@src/hooks/useClickOutside';
import SlideMenu from '../navmenu/SlideMenu';
import SearchRoadmapM from '../searchM/SearchRoadmapM';
import { useNavbarMenu, handleAuthClick } from './menu-logic';

const NavbarButtonsM = ({ navmenu }: { navmenu }) => {
  const {
    searchClick,
    handleSearchClick,
    menuOpen,
    handleMenuClick,
    setMenuOpen,
    menuOpenRef,
    currentPath,
    isLogged,
  } = useNavbarMenu();

  useClickOutside(navmenu, () => {
    if (menuOpenRef.current === false) {
      return;
    }
    setMenuOpen(false);
  });

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
            <SlideMenu isOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarButtonsM;
