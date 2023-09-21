import React from 'react';
import { setHomeEditorSelection } from '@components/home/mobile/sections/editor/sections/editor-demonstration/logic/store-home-nodes-mobile';

type IProps = {
  size: number;
  text: string;
  isSelected: boolean;
};

const ButtonEditorSizingM = ({ size, text, isSelected }: IProps) => {
  const stokeOpacity = isSelected ? '1' : '0.3';

  const textColor = isSelected ? 'text-primary' : 'text-secondary';
  return (
    <div className='flex flex-col items-center justify-center'>
      <button
        type='button'
        onClick={() => {
          setHomeEditorSelection('main');
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox='0 0 48 48'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M29 5H9C6.79086 5 5 6.79086 5 9V29C5 31.2091 6.79086 33 9 33H29C31.2091 33 33 31.2091 33 29V9C33 6.79086 31.2091 5 29 5Z'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity={stokeOpacity}
            strokeWidth='2'
          />
          <path
            d='M5 41H33M33 39V43M5 39V43M39 5H43M39 33H43M41 33V5'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity={stokeOpacity}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      <h1 className={`${textColor} font-medium text-md font-roboto-text`}>
        {text}
      </h1>
    </div>
  );
};

export default ButtonEditorSizingM;
