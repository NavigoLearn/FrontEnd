import React from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';

type IProps = {
  width: number;
  height: number;
  x: number;
  y: number;
  selected: boolean;
  defaultState: boolean;
};

const MainNodeM = ({ x, y, width, height, selected, defaultState }: IProps) => {
  const transitionProps = selected
    ? 'scale-y-[150%] scale-x-[200%]'
    : 'scale-y-[100%] scale-x-[100%]';

  let opacityProps = selected ? 'opacity-100' : 'opacity-50';
  if (defaultState) opacityProps = 'opacity-100';

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${x}px`,
        top: `${y}px`,
        position: 'absolute',
      }}
      className=''
    >
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        className={`bg-darkBlue relative z-10 shadow-md font-roboto-text rounded-sm  ${opacityProps} ${transitionProps} ${tailwindTransitionClass} `}
      />
      <span className='absolute top-1/2 z-20 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white text-sm w-32 text-center '>
        primary node
      </span>
      <div
        className={`w-full h-full bg-[#F4F4F5] absolute z-0 left-0 top-0 ${opacityProps}`}
      />
    </div>
  );
};

export default MainNodeM;
