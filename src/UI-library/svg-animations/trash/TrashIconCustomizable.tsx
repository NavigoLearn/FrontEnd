import React from 'react';

type ITrashIconCustomizable = {
  hovered: boolean;
  size: number;
};
const TrashIconCustomizable = ({ size, hovered }: ITrashIconCustomizable) => {
  return (
    <svg
      className='trash-icon fill-darkBlue duration-200'
      style={{ width: size, height: size }}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 28 40'
    >
      <path
        className={`trash-icon fill-darkBlue duration-200 hover:ease-in ${
          hovered ? 'translate-y-[-10px] translate-x-[12px] rotate-[30deg]' : ''
        }`}
        fillRule='evenodd'
        d='M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z'
      />
      <path d='M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z' />
    </svg>
  );
};

export default TrashIconCustomizable;
