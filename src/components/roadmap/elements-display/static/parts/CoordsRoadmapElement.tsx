import React from 'react';
import viewportCoord from '@store/roadmap-refactor/misc/viewport-coords-store';
import { useStore } from '@nanostores/react';
import RecenterButton from '@components/roadmap/elements-display/static/parts/RecenterButton';

const CoordsRoadmapElement = () => {
  const { startX, startY, scale } = useStore(viewportCoord);

  return (
    <div className=''>
      <div className='flex flex-col gap-1'>
        <p className='font-roboto-text text-placeholder text-sm'>
          x: {-startX}
        </p>
        <p className='font-roboto-text text-placeholder text-sm'>y: {startY}</p>
        <p className='font-roboto-text text-placeholder text-sm'>
          scale: {scale}
        </p>
      </div>
      <div className='hidden md:block'>
        <RecenterButton />
      </div>
    </div>
  );
};

export default CoordsRoadmapElement;
