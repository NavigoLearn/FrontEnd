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
const BasicNodeM = ({
  x,
  y,
  width,
  height,
  selected,
  defaultState,
}: IProps) => {
  const transitionProps = selected
    ? 'bg-darkBlue text-white'
    : 'bg-white text-secondary';

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
        className={`relative z-10  text-sm shadow-md font-roboto-text rounded-sm  flex justify-center items-center ${opacityProps} ${transitionProps} ${tailwindTransitionClass}`}
      >
        basic node
      </div>
      <div className='w-full h-full bg-[#F4F4F5] absolute z-0 left-0 top-0' />
    </div>
  );
};

export default BasicNodeM;
