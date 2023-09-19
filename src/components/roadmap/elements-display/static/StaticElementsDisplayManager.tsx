import React from 'react';
import CoordsRoadmapElement from '@components/roadmap/elements-display/static/parts/CoordsRoadmapElement';
import { getIsEditable } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';

const StaticElementsDisplayManager = () => {
  const editable = getIsEditable();

  return (
    <div className='absolute w-full h-full'>
      <div className='absolute top-4 left-4 '>
        <CoordsRoadmapElement />
      </div>
    </div>
  );
};

export default StaticElementsDisplayManager;
