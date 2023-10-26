import React from 'react';
import { BACK_ARROW_SRC } from '@src/to-be-organized/svg-params.ts';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils.ts';

const BackArrow = () => {
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
      className={`justify-start cursor-pointer flex ml-4 w-8 h-8 p-1 flex-shrink-0 bg-white hover:bg-gray-200 ${tailwindTransitionClass}`}
    >
      <img
        draggable='false'
        className='select-none w-full h-full'
        src={BACK_ARROW_SRC.src}
        alt='navbar back arrow to explore'
      />
    </button>
  );
};

export default BackArrow;
