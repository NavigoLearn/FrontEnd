import React from 'react';
import viewportCoord from '@store/roadmap-refactor/misc/viewport-coords-store';
import { useStore } from '@nanostores/react';
import { triggerRecenterRoadmap } from '@store/roadmap-refactor/misc/misc-params-store';
import { setRenderingEngineType } from '@components/roadmap/rendering-engines/store-rendering-engine';

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
      <div className='flex flex-col gap-2'>
        <button
          type='button'
          className='mt-6 font-roboto-text text-md text-secondary pointer-events-auto hover:text-primary'
          onClick={() => {
            triggerRecenterRoadmap();
          }}
        >
          Recenter
        </button>
        <button
          type='button'
          className='mt-6 font-roboto-text text-md text-secondary pointer-events-auto hover:text-primary'
          onClick={() => {
            setRenderingEngineType('native-elements');
          }}
        >
          Optimized
        </button>
        <button
          type='button'
          className='mt-6 font-roboto-text text-md text-secondary pointer-events-auto hover:text-primary'
          onClick={() => {
            setRenderingEngineType('foreign-object');
          }}
        >
          Classic
        </button>
      </div>
    </div>
  );
};

export default CoordsRoadmapElement;
