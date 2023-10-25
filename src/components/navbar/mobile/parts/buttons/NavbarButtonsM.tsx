import React from 'react';
import BackArrow from '@components/roadmap/navbar-roadmap/deprecated/parts/BackArrow';
import { setBasePopup } from '@src/components/shared/stores/store-base-popups';
import dropdown from '@assets/dropdown.svg';
import { useClickOutside } from '@src/hooks/useClickOutside';
import { useStore } from '@nanostores/react';
import SlideMenu from '../navmenu/SlideMenu';
import SearchRoadmapM from '../searchM/SearchRoadmapM';
import { useNavbarMenu, handleAuthClick } from './menu-logic';
import { searchLogicStore } from '../searchM/searchHooks/search-logic-store';

const NavbarButtonsM = ({ navmenu }: { navmenu }) => {
  const {
    menuOpen,
    handleMenuClick,
    setMenuOpen,
    menuOpenRef,
    currentPath,
    isLogged,
  } = useNavbarMenu();
  const { inputExpanded } = useStore(searchLogicStore);

  useClickOutside(navmenu, () => {
    if (menuOpenRef.current === false) {
      return;
    }
    setMenuOpen(false);
  });

  return (
    <div className='w-full flex justify-between select-none'>
      {currentPath !== '/' && !inputExpanded && (
        <div className='flex my-auto'>
          <BackArrow />
        </div>
      )}
      <div className='flex ml-3 items-center'>
        {!inputExpanded && !isLogged && !menuOpen && (
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
          inputExpanded ? 'mr-[3rem]' : ''
        }`}
      >
        <SearchRoadmapM />
        {!inputExpanded && (
          <div>
            <div className='flex mr-2 w-fit h-fit' onClick={handleMenuClick}>
              <img src={dropdown.src} alt='dropdown' className='w-8 h-8' />
            </div>
            <SlideMenu isOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarButtonsM;
