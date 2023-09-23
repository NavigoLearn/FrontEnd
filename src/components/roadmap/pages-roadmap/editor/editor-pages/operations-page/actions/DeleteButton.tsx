import React, { useState } from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import TrashIconCustomizable from '@src/UI-library/svg-components/trash/TrashIconCustomizable';
import rectangleSmall from '@assets/editor/rectangleSmall.svg';

type IDeleteButtonProps = {
  callback: () => void;
  text: string;
  src?: string;
  space?: boolean;
};

const DeleteButton = ({ callback, text, src, space }: IDeleteButtonProps) => {
  const [mouseOver, setMouseOver] = useState(false);

  return (
    <div className='flex gap-1 items-center'>
      {src && (
        <img
          className='h-10 w-12 pt-4 flex items-center'
          alt='delete one node'
          src={src}
        />
      )}
      <button
        type='button'
        onClick={() => {
          callback();
        }}
        className='flex justify-center items-center group h-10'
        onMouseOver={() => {
          setMouseOver(true);
        }}
        onMouseOut={() => {
          setMouseOver(false);
        }}
      >
        <span
          className={` font-semibold text-darkBlue group-hover:text-red-500 ${tailwindTransitionClass}`}
        >
          {text}
        </span>
        <TrashIconCustomizable
          sizeContainer={40}
          sizeIcon={40}
          hovered={mouseOver}
        />
      </button>
    </div>
  );
};

DeleteButton.defaultProps = {
  src: rectangleSmall.src,
  space: false,
};

export default DeleteButton;
