import { triggerRecenterRoadmap } from '@store/roadmap-refactor/misc/misc-params-store';
import React from 'react';

const RecenterButton = () => {
  return (
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
    </div>
  );
};

export default RecenterButton;
