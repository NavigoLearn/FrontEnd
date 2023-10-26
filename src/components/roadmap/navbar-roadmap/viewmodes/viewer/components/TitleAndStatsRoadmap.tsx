import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import storeRoadmapAbout from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about.ts';
import { InfoIcon } from 'lucide-react';
import { requestButton } from '@components/roadmap/navbar-roadmap/viewmodes/owner/components/buttons-arrays/buttons-requester.ts';
import StatisticsRoadmapNavbar from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/StatisticsRoadmapNavbar.tsx';
import { storeRoadmapNavbarProperties } from '@components/roadmap/navbar-roadmap/stores/store-roadmap-navbar-properties.ts';

const TitleAndStatsRoadmap = () => {
  const { under2Xl } = useStore(storeRoadmapNavbarProperties);
  const { name } = useStore(storeRoadmapAbout);
  const aboutButton = requestButton('about');

  return (
    <div className='relative pointer-events-auto'>
      <div className='flex items-center gap-2'>
        <div className='text-base 2xl:text-lg font-semibold text-darkBlue font-roboto-text'>
          {name}
        </div>
        <button
          type='button'
          onClick={() => {
            aboutButton.callback();
          }}
          className='p-1 hover:bg-gray-200'
        >
          <InfoIcon size={under2Xl ? 20 : 24} />
        </button>
      </div>
      <div className='absolute left-1/2 -translate-x-1/2 -bottom-9 '>
        <StatisticsRoadmapNavbar />
      </div>
    </div>
  );
};

export default TitleAndStatsRoadmap;
