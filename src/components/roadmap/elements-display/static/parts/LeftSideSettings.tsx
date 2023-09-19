import React from 'react';
import viewportCoord from '@store/roadmap-refactor/misc/viewport-coords-store';
import { useStore } from '@nanostores/react';
import { triggerRecenterRoadmap } from '@store/roadmap-refactor/misc/misc-params-store';
import {
  setRenderingEngineOptimized,
  storeRenderingEngine,
} from '@components/roadmap/rendering-engines/store-rendering-engine';

const LeftSideSettings = () => {
  const { startX, startY, scale } = useStore(viewportCoord);
  const { optimized } = useStore(storeRenderingEngine);

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
      <div className=''>
        <button
          type='button'
          className='mt-6 font-roboto-text text-md text-secondary pointer-events-auto hover:text-primary'
          onClick={() => {
            triggerRecenterRoadmap();
          }}
        >
          Recenter
        </button>
      </div>

      <div className=''>
        <button
          type='button'
          className={`mt-6 font-roboto-text text-md text-secondary pointer-events-auto hover:text-primary ${
            optimized ? 'text-green-700' : ''
          }`}
          onClick={() => {
            setRenderingEngineOptimized(!optimized);
          }}
        >
          optimize {optimized ? 'on' : 'off'}
        </button>
      </div>
    </div>
  );
};

export default LeftSideSettings;
