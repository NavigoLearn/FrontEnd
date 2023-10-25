import React from 'react';
import { useStore } from '@nanostores/react';
import storeRoadmapAbout, {
  getRoadmapId,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about.ts';
import { InfoIcon } from 'lucide-react';
import { requestButton } from '@components/roadmap/navbar-roadmap/buttons/buttons-arrays/buttons-requester.ts';
import StatisticsRoadmapNavbar from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/StatisticsRoadmapNavbar.tsx';

const TitleAndStatsRoadmap = () => {
  const { name } = useStore(storeRoadmapAbout);
  const aboutButton = requestButton('about');
  return (
    <div className='relative pointer-events-auto'>
      <div className='flex items-center gap-2'>
        <div className=' text-lg font-semibold text-darkBlue font-roboto-text'>
          {name} {name}
        </div>
        <div className='p-1 hover:bg-gray-200'>
          <InfoIcon
            size={25}
            onClick={() => {
              aboutButton.callback();
            }}
          />
        </div>
      </div>
      <div className='absolute left-1/2 -translate-x-1/2 -bottom-9 '>
        <StatisticsRoadmapNavbar />
      </div>
    </div>
  );
};

export default TitleAndStatsRoadmap;
