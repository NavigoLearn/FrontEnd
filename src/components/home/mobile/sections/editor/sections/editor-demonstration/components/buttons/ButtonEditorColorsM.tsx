import React from 'react';
import { setHomeEditorSelection } from '@components/home/mobile/sections/editor/sections/editor-demonstration/logic/store-home-nodes-mobile';

type IProps = {
  size: number;
  text: string;
  isSelected: boolean;
};

const ButtonEditorColorsM = ({ size, text, isSelected }: IProps) => {
  const stokeOpacity = isSelected ? '1' : '0.3';
  const textColor = isSelected ? 'text-primary' : 'text-secondary';

  return (
    <div className='flex flex-col items-center justify-center'>
      <button
        type='button'
        onClick={() => {
          setHomeEditorSelection('basic');
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
            d='M17.6865 42.22L40.5695 29.219C41.4759 28.7042 42.1454 27.8559 42.4357 26.8548C42.7259 25.8537 42.6139 24.7788 42.1235 23.859L38.9995 18'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity={stokeOpacity}
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path
            d='M27.4769 7.12109C27.3614 7.05844 27.2348 7.01915 27.1042 7.00545C26.9736 6.99176 26.8415 7.00392 26.7156 7.04125C26.5897 7.07858 26.4724 7.14034 26.3703 7.22302C26.2683 7.30569 26.1835 7.40765 26.1209 7.52309C26.0582 7.63852 26.0189 7.76516 26.0052 7.89577C25.9915 8.02639 26.0037 8.15843 26.041 8.28434C26.0784 8.41026 26.1401 8.52759 26.2228 8.62964C26.3055 8.73168 26.4074 8.81644 26.5229 8.87908L27.4769 7.12109ZM32.6859 11.0871L33.1629 10.2081L32.6859 11.0881V11.0871ZM34.2409 16.6021L33.3749 16.1021L33.3719 16.1081L34.2409 16.6021ZM26.5229 8.88009L32.2089 11.9671L33.1629 10.2081L27.4769 7.12209L26.5229 8.88009ZM33.3719 16.1101L20.7559 38.3201L22.4939 39.3071L35.1109 17.0971L33.3709 16.1091L33.3719 16.1101ZM32.2089 11.9671C32.5608 12.1583 32.8709 12.418 33.1208 12.7309C33.3708 13.0439 33.5555 13.4037 33.6642 13.7892C33.7729 14.1746 33.8032 14.578 33.7535 14.9754C33.7039 15.3728 33.5751 15.7562 33.3749 16.1031L35.1069 17.1031C35.4407 16.5249 35.6553 15.8858 35.7381 15.2233C35.821 14.5609 35.7703 13.8886 35.5891 13.246C35.4079 12.6035 35.0999 12.0037 34.6832 11.4821C34.2665 10.9605 33.7495 10.5267 33.1629 10.2081L32.2089 11.9671Z'
            fill={isSelected ? '#2557D6' : 'black'}
            fillOpacity={stokeOpacity}
          />
          <path
            d='M5 9C5 7.93913 5.42143 6.92172 6.17157 6.17157C6.92172 5.42143 7.93913 5 9 5H19C20.0609 5 21.0783 5.42143 21.8284 6.17157C22.5786 6.92172 23 7.93913 23 9V34C23 35.1819 22.7672 36.3522 22.3149 37.4442C21.8626 38.5361 21.1997 39.5282 20.364 40.364C19.5282 41.1997 18.5361 41.8626 17.4442 42.3149C16.3522 42.7672 15.1819 43 14 43C12.8181 43 11.6478 42.7672 10.5558 42.3149C9.46392 41.8626 8.47177 41.1997 7.63604 40.364C6.80031 39.5282 6.13738 38.5361 5.68508 37.4442C5.23279 36.3522 5 35.1819 5 34V9Z'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity={stokeOpacity}
            strokeWidth='2'
          />
          <path
            d='M14 37C15.6569 37 17 35.6569 17 34C17 32.3431 15.6569 31 14 31C12.3431 31 11 32.3431 11 34C11 35.6569 12.3431 37 14 37Z'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity={stokeOpacity}
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
      </button>
      <h1 className={`${textColor} font-medium text-md font-roboto-text`}>
        {text}
      </h1>
    </div>
  );
};

export default ButtonEditorColorsM;
