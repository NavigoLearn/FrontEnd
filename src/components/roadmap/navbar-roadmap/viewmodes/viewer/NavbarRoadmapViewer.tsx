import React from 'react';
import BackToAllRoadmaps from '@components/roadmap/navbar-roadmap/commonUI/BackToAllRoadmaps.tsx';
import { useStore } from '@nanostores/react';
import storeVisitorStatus from '@store/user/user-status.ts';
import LoginButton from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/LoginButton.tsx';
import TitleAndStatsRoadmap from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/TitleAndStatsRoadmap.tsx';
import CommunitySection from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/community-section/CommunitySection.tsx';
import StatisticsRoadmapUser from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/statistics-user/StatisticsRoadmapUser.tsx';
import { useUnder2Xl } from '@hooks/useUnder2Xl.tsx';
import { setUnder2Xl } from '@components/roadmap/navbar-roadmap/stores/store-roadmap-navbar-properties.ts';

const NavbarRoadmapViewer = () => {
  // stores are loaded with all the data when this is rendered
  const { userId } = useStore(storeVisitorStatus);
  const isLogged = !!userId;

  const [under2Xl] = useUnder2Xl();
  setUnder2Xl(under2Xl);

  return (
    <div className='relative w-full h-full'>
      <div className='h-full flex items-center '>
        <BackToAllRoadmaps />
        <hr className='h-1/2 bg-gray-200 w-[1.5px] ml-3' />
        {!!isLogged && <StatisticsRoadmapUser />}
        {!isLogged && <LoginButton />}
      </div>
      <section className='absolute top-0 left-0 w-full h-full pointer-events-none'>
        <div className='w-full h-full flex justify-center items-center'>
          <TitleAndStatsRoadmap />
        </div>
      </section>
      <section className='absolute top-0 left-0 w-full h-full pointer-events-none'>
        <div className='w-full h-full flex justify-end items-center'>
          <CommunitySection />
        </div>
      </section>
    </div>
  );
};

export default NavbarRoadmapViewer;
