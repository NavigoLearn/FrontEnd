import React from 'react';
import Done from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/statistics-user/Done.tsx';
import MoreStatistics from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/statistics-user/MoreStatistics.tsx';
import HideShowProgress from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/statistics-user/HideShowProgress.tsx';

const StatisticsRoadmapUser = () => {
  return (
    <div className='flex items-center gap-5 ml-4'>
      <Done />
      <MoreStatistics />
      <HideShowProgress />
    </div>
  );
};

export default StatisticsRoadmapUser;
