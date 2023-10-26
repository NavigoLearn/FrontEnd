import React from 'react';
import { useStore } from '@nanostores/react';
import { storeRoadmapNavbarState } from '@components/roadmap/navbar-roadmap/stores/store-roadmap-navbar-state.ts';
import NavbarRoadmapViewer from '@components/roadmap/navbar-roadmap/viewmodes/viewer/NavbarRoadmapViewer.tsx';
import NavbarRoadmapOwner from '@components/roadmap/navbar-roadmap/viewmodes/owner/NavbarRoadmapOwner.tsx';
import storeRoadmapAbout, {
  getRoadmapType,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about.ts';
import roadmapStateStore from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state.ts';
import BackArrow from '@components/roadmap/navbar-roadmap/deprecated/parts/BackArrow.tsx';
import Title from '@components/roadmap/navbar-roadmap/deprecated/parts/Title.tsx';
import RoadmapStats from '@components/roadmap/navbar-roadmap/deprecated/parts/RoadmapStats.tsx';

const NavbarRoadmap = () => {
  const { navbarViewMode } = useStore(storeRoadmapNavbarState);
  const { loaded } = useStore(roadmapStateStore);
  const { roadmapType } = useStore(storeRoadmapAbout);

  function mapNavbarViewModeToComponent() {
    if (!loaded) return null;

    if (navbarViewMode === 'viewer' && roadmapType !== 'create') {
      return <NavbarRoadmapViewer />;
    }

    if (navbarViewMode === 'owner' || roadmapType === 'create') {
      return <NavbarRoadmapOwner />;
    }

    console.warn('navbarViewMode is not supported');
    return <div>Something went very wrong in navbar, contact devs</div>;
  }

  return (
    <>
      <div className='hidden md:block sticky top-0 z-[20]'>
        <nav className='bg-white border-b-2 border-b-gray-200 relative w-full h-16 z-10 select-none'>
          {loaded && mapNavbarViewModeToComponent()}
        </nav>
      </div>
      <div className='md:hidden sticky top-0 z-[20]'>
        <nav className='bg-white justify-between border-b-2 border-b-gray-200 relative flex w-full h-16 z-10 items-center transition-all  duration-300 select-none'>
          {loaded && (
            <>
              <div className='flex-shrink-0'>
                <BackArrow />
              </div>
              <div className='mx-4 flex-grow truncate text-ellipsis'>
                <Title />
              </div>
              <div className='flex-shrink-0'>
                {roadmapType === 'public' && <RoadmapStats />}
              </div>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavbarRoadmap;
