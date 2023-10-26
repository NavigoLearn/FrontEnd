import React from 'react';
import { BACK_ARROW_SRC } from '@src/to-be-organized/svg-params.ts';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils.ts';

const BackToAllRoadmaps = () => {
  return (
    <button
      type='button'
      onClick={() => {
        window.onbeforeunload = null;

        window.history.back();

        setTimeout(() => {
          window.location.href = '/explore';
        }, 100);
      }}
      className={`justify-start items-center cursor-pointer flex ml-4  p-1 flex-shrink-0 bg-white hover:bg-gray-200 ${tailwindTransitionClass}`}
    >
      <div className='w-6 h-6'>
        <img
          draggable='false'
          className='select-none w-full h-full'
          src={BACK_ARROW_SRC.src}
          alt='navbar back arrow to explore'
        />
      </div>
      <span className='font-medium font-roboto-text text-md ml-3'>
        All roadmaps
      </span>
    </button>
  );
};

export default BackToAllRoadmaps;
