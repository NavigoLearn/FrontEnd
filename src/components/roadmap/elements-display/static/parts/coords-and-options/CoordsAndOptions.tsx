import React from 'react';
import viewportCoord from '@store/roadmap-refactor/misc/viewport-coords-store.ts';
import { useStore } from '@nanostores/react';
import RecenterButton from '@components/roadmap/elements-display/static/parts/coords-and-options/RecenterButton.tsx';
import { triggerRecenterRoadmap } from '@store/roadmap-refactor/misc/misc-params-store.ts';
import {
  setRenderingEngineOptimized,
  storeRenderingEngine,
} from '@components/roadmap/rendering-engines/store-rendering-engine.ts';
import { useNodeExternalData } from '@src/to-be-organized/node-rendering-stuff/node-renderer-hooks.ts';
import OptimizeToggle from '@components/roadmap/elements-display/static/parts/coords-and-options/OptimizeToggle.tsx';
import TooltipToggle from './TooltipTogle.tsx';

const CoordsAndOptions = () => {
  const { startX, startY, scale } = useStore(viewportCoord);
  const { editing } = useNodeExternalData();

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
        <OptimizeToggle />
        <div>{!editing && <TooltipToggle />}</div>
      </div>
    </div>
  );
};

export default CoordsAndOptions;
