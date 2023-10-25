import React from 'react';
import { useStore } from '@nanostores/react';
import storeRoadmapAbout from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about.ts';

const Title = () => {
  const { name } = useStore(storeRoadmapAbout);
  return (
    <div className='text-base md:text-lg font-semibold text-darkBlue truncate text-ellipsis'>
      {name}
    </div>
  );
};

export default Title;
