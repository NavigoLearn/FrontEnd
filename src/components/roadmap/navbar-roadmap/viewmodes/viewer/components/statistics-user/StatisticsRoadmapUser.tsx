import React from 'react';
import Done from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/statistics-user/Done.tsx';
import MoreStatistics from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/statistics-user/MoreStatistics.tsx';
import HideShowProgress from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/statistics-user/HideShowProgress.tsx';
import { useStore } from '@nanostores/react';
import { storeRoadmapNavbarProperties } from '@components/roadmap/navbar-roadmap/stores/store-roadmap-navbar-properties.ts';

const StatisticsRoadmapUser = () => {
  const { under2Xl } = useStore(storeRoadmapNavbarProperties);
  return (
    <div className={`flex items-center ${under2Xl ? 'gap-2' : 'gap-4'} ml-4`}>
      <Done />
      <MoreStatistics />
      <HideShowProgress />
    </div>
  );
};

export default StatisticsRoadmapUser;
