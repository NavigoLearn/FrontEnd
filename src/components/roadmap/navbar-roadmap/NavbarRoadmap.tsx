import React from 'react';
import BackArrow from '@components/roadmap/navbar-roadmap/parts/BackArrow';
import Title from '@components/roadmap/navbar-roadmap/parts/Title';
import ButtonsManager from '@components/roadmap/navbar-roadmap/parts/ButtonsManager';
import { useIsLoaded } from '@hooks/useIsLoaded';
import RoadmapStats from '@components/roadmap/navbar-roadmap/parts/RoadmapStats';
import { useStore } from '@nanostores/react';
import storeRoadmapAbout from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';

const NavbarRoadmap = () => {
  const loaded = useIsLoaded();
  const { roadmapType } = useStore(storeRoadmapAbout);

  return (
    <>
      <div className='hidden md:block sticky top-0 z-[20]'>
        <nav className='bg-white border-b-2 border-b-gray-200 relative flex w-full h-16 z-10 items-center transition-all duration-300 select-none'>
          {loaded && (
            <>
              <div className='flex-shrink-0 h-full flex items-center'>
                <BackArrow />
                <hr className='h-1/2 bg-gray-200 w-[1.5px] ml-3' />
                <div className='ml-5'>
                  <ButtonsManager />
                </div>
              </div>
              <div className='min-w-fit mx-4 flex-grow flex pointer-events-none justify-center'>
                <div className='truncate text-ellipsis align-middle justify-self-start'>
                  <Title />
                </div>
              </div>
              <div className='h-full flex justify-self-end pointer-events-none items-center'>
                <div className='pointer-events-auto h-full'>
                  {roadmapType === 'public' && <RoadmapStats />}
                </div>
              </div>
            </>
          )}
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
