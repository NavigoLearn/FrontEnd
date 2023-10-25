import React from 'react';
import BackToAllRoadmaps from '@components/roadmap/navbar-roadmap/commonUI/BackToAllRoadmaps.tsx';
import { useStore } from '@nanostores/react';
import storeVisitorStatus from '@store/user/user-status.ts';
import Statistic from '@components/profile/UI/parts-desktop/profile-display-pages/pages/activity/components/Statistic.tsx';
import StatisticsRoadmapNavbar from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/StatisticsRoadmapNavbar.tsx';
import LoginButton from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/LoginButton.tsx';
import TitleAndStatsRoadmap from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/TitleAndStatsRoadmap.tsx';

const NavbarRoadmapViewer = () => {
  // stores are loaded with all the data when this is rendered
  const { userId } = useStore(storeVisitorStatus);
  const isLogged = !!userId;
  console.log('NavbarRoadmapViewer isLogged', isLogged, userId);

  return (
    <div className='relative w-full h-full'>
      <div className='h-full flex items-center '>
        <BackToAllRoadmaps />
        <hr className='h-1/2 bg-gray-200 w-[1.5px] ml-3' />
        {!!isLogged && <StatisticsRoadmapNavbar />}
        {!isLogged && <LoginButton />}
      </div>
      <section className='absolute top-0 left-0 w-full h-full'>
        <div className='w-full h-full flex justify-center items-center'>
          <TitleAndStatsRoadmap />
        </div>
      </section>
      <section className='absolute top-0 left-0 w-full h-full'>
        <div className='w-full h-full flex justify-end items-center'>dvedd</div>
      </section>
    </div>
  );
};

export default NavbarRoadmapViewer;
