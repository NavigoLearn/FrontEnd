import React from 'react';
import { useStore } from '@nanostores/react';
import {
  storeRenderingEngine,
  setRenderingEngineOptimized,
} from '@components/roadmap/rendering-engines/store-rendering-engine.ts';

const OptimizeToggle = () => {
  const { optimized } = useStore(storeRenderingEngine);

  return (
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
  );
};

export default OptimizeToggle;
