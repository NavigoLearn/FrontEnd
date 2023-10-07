import React from 'react';
import viewportCoord from '@store/roadmap-refactor/misc/viewport-coords-store';
import { useStore } from '@nanostores/react';
import RecenterButton from '@components/roadmap/elements-display/static/parts/RecenterButton';
import { triggerRecenterRoadmap } from '@store/roadmap-refactor/misc/misc-params-store';
import {
  setRenderingEngineOptimized,
  storeRenderingEngine,
} from '@components/roadmap/rendering-engines/store-rendering-engine';
import { useNodeExternalData } from '@src/to-be-organized/node-rendering-stuff/node-renderer-hooks';
import TooltipToggle from './TooltipTogle';

const LeftSideSettings = () => {
  const { startX, startY, scale } = useStore(viewportCoord);
  const { editing } = useNodeExternalData();
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
      <div>
        <div className='hidden md:block'>
          <RecenterButton />
        </div>
        <button
          type='button'
          className={`w-24 mt-1 text-start font-roboto-text text-md pointer-events-auto hover:text-primary ${
            optimized ? 'text-green-700' : 'text-secondary'
          }`}
          onClick={() => {
            setRenderingEngineOptimized(!optimized);
          }}
        >
          optimize {optimized ? 'on' : 'off'}
        </button>
        <div>{!editing && <TooltipToggle />}</div>
      </div>
    </div>
  );
};

export default LeftSideSettings;
