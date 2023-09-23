import React from 'react';
import Stats from '@components/roadmap/navbar-roadmap/parts/roadmap-stats/Stats';
import CreatorsProfile from '@components/roadmap/navbar-roadmap/parts/roadmap-stats/CreatorsProfile';

const RoadmapStats = () => {
  return (
    <div className=' h-full flex justify-end pr-4 items-center gap-4 '>
      <Stats />
      <CreatorsProfile />
    </div>
  );
};

export default RoadmapStats;
