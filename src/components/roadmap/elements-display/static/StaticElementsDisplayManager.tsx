import React from 'react';
import LeftSideSettings from '@components/roadmap/elements-display/static/parts/LeftSideSettings';
import { getIsEditable } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';

const StaticElementsDisplayManager = () => {
  const editable = getIsEditable();

  return (
    <div className='absolute w-full h-full'>
      <div className='absolute top-4 left-4 '>
        <LeftSideSettings />
      </div>
    </div>
  );
};

export default StaticElementsDisplayManager;
