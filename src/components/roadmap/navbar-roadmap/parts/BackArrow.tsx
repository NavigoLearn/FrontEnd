import React from 'react';
import { BACK_ARROW_SRC } from '@src/to-be-organized/svg-params';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';

const BackArrow = () => {
  return (
    <button
      onClick={() => {
        window.onbeforeunload = null;

        window.history.back();

        setTimeout(() => {
          window.location.href = '/explore';
        }, 100);
      }}
      className={`justify-start cursor-pointer flex ml-4 w-8 h-8 p-1 bg-white hover:bg-gray-200${tailwindTransitionClass}`}
    >
      <img
        draggable='false'
        className='select-none w-full h-full'
        src={BACK_ARROW_SRC}
        alt='navbar back arrow to explore'
      />
    </button>
  );
};

export default BackArrow;
