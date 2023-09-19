import React from 'react';
import LeftSideSettings from '@components/roadmap/elements-display/static/parts/LeftSideSettings';
import { getIsEditable } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import RecenterButton from '@components/roadmap/elements-display/static/parts/RecenterButton';

const StaticElementsDisplayManager = () => {
  const editable = getIsEditable();

  return (
    <div className='absolute w-full h-full'>
      <div className='absolute bottom-4 md:bottom-auto md:top-4 left-4 '>
        <LeftSideSettings />
      </div>
      <div className='absolute md:hidden top-0 left-0 right-0 flex justify-center'>
        <RecenterButton />
      </div>
    </div>
  );
};

export default StaticElementsDisplayManager;
