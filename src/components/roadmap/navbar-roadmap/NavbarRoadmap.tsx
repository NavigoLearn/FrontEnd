import React from 'react';
import BackArrow from '@components/roadmap/navbar-roadmap/parts/BackArrow';
import Title from '@components/roadmap/navbar-roadmap/parts/Title';
import ButtonsManager from '@components/roadmap/navbar-roadmap/parts/ButtonsManager';
import { useIsLoaded } from '@hooks/useIsLoaded';
import RoadmapStats from '@components/roadmap/navbar-roadmap/parts/RoadmapStats';
import { useStore } from '@nanostores/react';
import roadmapAbout, {
  getRoadmapType,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';
import storeRoadmapAbout from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';

const NavbarRoadmap = () => {
  const loaded = useIsLoaded();
  const { roadmapType } = useStore(storeRoadmapAbout);

  return (
    <div className='hidden md:block sticky top-0 z-[20]'>
      <nav className='bg-transparent border-b-2 border-b-gray-200 relative flex w-full h-16 z-10  items-center transition-all  duration-300 select-none'>
        {loaded && (
          <>
            <BackArrow />
            <hr className='h-1/2 bg-gray-200 w-[1.5px] ml-3' />
            <div className='w-full h-full absolute flex justify-center items-center pointer-events-none'>
              <Title />
            </div>
            <div className='ml-5'>
              <ButtonsManager />
            </div>
            <div className='w-full h-full absolute flex justify-end pointer-events-none items-center'>
              <div className='pointer-events-auto h-full'>
                {roadmapType === 'public' && <RoadmapStats />}
              </div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default NavbarRoadmap;
