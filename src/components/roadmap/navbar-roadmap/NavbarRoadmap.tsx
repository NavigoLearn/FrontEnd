import React from 'react';
import BackArrow from '@components/roadmap/navbar-roadmap/deprecated/parts/BackArrow.tsx';
import Title from '@components/roadmap/navbar-roadmap/deprecated/parts/Title.tsx';
import ButtonsManager from '@components/roadmap/navbar-roadmap/deprecated/parts/ButtonsManager.tsx';
import { useIsLoaded } from '@hooks/useIsLoaded.tsx';
import RoadmapStats from '@components/roadmap/navbar-roadmap/deprecated/parts/RoadmapStats.tsx';
import { useStore } from '@nanostores/react';
import storeRoadmapAbout from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about.ts';
import BackToAllRoadmaps from '@components/roadmap/navbar-roadmap/commonUI/BackToAllRoadmaps.tsx';
import { storeRoadmapNavbarState } from '@components/roadmap/navbar-roadmap/stores/store-roadmap-navbar-state.ts';
import NavbarRoadmapViewer from '@components/roadmap/navbar-roadmap/viewmodes/viewer/NavbarRoadmapViewer.tsx';
import NavbarRoadmapOwner from '@components/roadmap/navbar-roadmap/viewmodes/owner/NavbarRoadmapOwner.tsx';

const NavbarRoadmap = () => {
  const loaded = useIsLoaded();
  const { navbarViewMode } = useStore(storeRoadmapNavbarState);

  function mapNavbarViewModeToComponent() {
    if (navbarViewMode === 'viewer') {
      return <NavbarRoadmapViewer />;
    }
    if (navbarViewMode === 'owner') {
      return <NavbarRoadmapOwner />;
    }

    console.warn('navbarViewMode is not supported');
    return <div>Something went very wrong in navbar, contact devs</div>;
  }

  return (
    <div className='hidden md:block sticky top-0 z-[20]'>
      <nav className='bg-white border-b-2 border-b-gray-200 relative w-full h-16 z-10 select-none'>
        {loaded && mapNavbarViewModeToComponent()}
      </nav>
    </div>
  );
};

export default NavbarRoadmap;
