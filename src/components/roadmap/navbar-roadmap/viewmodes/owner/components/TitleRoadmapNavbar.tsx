import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import storeRoadmapAbout, {
  getRoadmapId,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about.ts';
import { InfoIcon } from 'lucide-react';
import { requestButton } from '@components/roadmap/navbar-roadmap/viewmodes/owner/components/buttons-arrays/buttons-requester.ts';
import { storeRoadmapNavbarProperties } from '@components/roadmap/navbar-roadmap/stores/store-roadmap-navbar-properties.ts';

const TitleRoadmapNavbar = () => {
  const { under2Xl } = useStore(storeRoadmapNavbarProperties);
  const { name } = useStore(storeRoadmapAbout);
  const aboutButton = requestButton('about');

  return (
    <div className='relative pointer-events-auto'>
      <div className='flex items-center gap-2'>
        <div className='text-base 2xl:text-lg font-semibold text-darkBlue font-roboto-text'>
          {name}
        </div>
        <div className='p-1 hover:bg-gray-200'>
          <InfoIcon
            size={under2Xl ? 20 : 24}
            onClick={() => {
              aboutButton.callback();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TitleRoadmapNavbar;
