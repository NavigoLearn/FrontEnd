import { triggerRecenterRoadmap } from '@store/roadmap-refactor/misc/misc-params-store.ts';
import React from 'react';

const RecenterButton = () => {
  return (
    <div className='flex flex-col gap-2 w-16'>
      <button
        type='button'
        className='mt-3 font-roboto-text text-md text-secondary pointer-events-auto hover:text-primary'
        onClick={() => {
          triggerRecenterRoadmap();
        }}
      >
        Recenter
      </button>
    </div>
  );
};

export default RecenterButton;
