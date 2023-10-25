import React from 'react';
import { useStore } from '@nanostores/react';
import {
  setNavbarViewMode,
  storeRoadmapNavbarState,
  toggleNavbarViewMode,
} from '@components/roadmap/navbar-roadmap/stores/store-roadmap-navbar-state.ts';

const SwitchNavbarViewMode = () => {
  const { navbarViewMode } = useStore(storeRoadmapNavbarState);

  return (
    <button
      type='button'
      onClick={() => {
        toggleNavbarViewMode();
      }}
      className='bg-white border-2 border-gray-300 px-4 py-2 pointer-events-auto'
    >
      <span className='font-roboto-text font-medium'>
        Switch to {navbarViewMode === 'viewer' ? 'owner' : 'viewer'}
      </span>
    </button>
  );
};

export default SwitchNavbarViewMode;
