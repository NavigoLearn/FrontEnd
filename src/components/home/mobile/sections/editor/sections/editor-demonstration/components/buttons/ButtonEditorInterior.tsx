import React from 'react';
import { setHomeEditorSelection } from '@components/home/mobile/sections/editor/sections/editor-demonstration/logic/store-home-nodes-mobile';

type IProps = {
  size: number;
  text: string;
  isSelected: boolean;
};

const ButtonEditorInterior = ({ text, isSelected, size }: IProps) => {
  const stokeOpacity = isSelected ? '1' : '0.3';

  const textColor = isSelected ? 'text-primary' : 'text-secondary';
  return (
    <div className='flex flex-col items-center justify-center'>
      <button
        type='button'
        onClick={() => {
          setHomeEditorSelection('resource');
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
            d='M42 29V11C42 9.93913 41.5786 8.92172 40.8284 8.17157C40.0783 7.42143 39.0609 7 38 7H8C6.93913 7 5.92172 7.42143 5.17157 8.17157C4.42143 8.92172 4 9.93913 4 11V37C4 38.0609 4.42143 39.0783 5.17157 39.8284C5.92172 40.5786 6.93913 41 8 41H27'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity={stokeOpacity}
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path
            d='M33.6615 41.7379C33.4902 41.7652 33.3147 41.7475 33.1523 41.6865C32.9899 41.6255 32.8462 41.5233 32.7352 41.39C32.6242 41.2566 32.5499 41.0967 32.5194 40.9259C32.489 40.7551 32.5035 40.5793 32.5615 40.4159L35.6415 31.7359C35.7017 31.5663 35.8065 31.4161 35.945 31.3011C36.0834 31.1861 36.2503 31.1106 36.428 31.0825C36.6058 31.0545 36.7878 31.0749 36.9549 31.1417C37.122 31.2084 37.268 31.319 37.3775 31.4619L42.9775 38.7609C43.0829 38.8984 43.1508 39.0609 43.1745 39.2325C43.1981 39.4041 43.1768 39.579 43.1126 39.7399C43.0484 39.9008 42.9434 40.0423 42.8081 40.1504C42.6728 40.2586 42.5116 40.3297 42.3405 40.3569L33.6615 41.7379Z'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity={stokeOpacity}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M14 7V41'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity={stokeOpacity}
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path
            d='M22.7997 19.9499C22.8587 19.6938 22.9675 19.4517 23.1201 19.2377C23.2727 19.0236 23.4659 18.8418 23.6888 18.7024C23.9117 18.5631 24.1599 18.4691 24.4191 18.4258C24.6784 18.3825 24.9437 18.3907 25.1997 18.4499L31.0507 19.8019C31.3068 19.8609 31.5487 19.9697 31.7627 20.1222C31.9767 20.2747 32.1585 20.4678 32.2978 20.6906C32.4371 20.9134 32.5312 21.1615 32.5746 21.4206C32.6179 21.6798 32.6099 21.9449 32.5507 22.2009L31.1987 28.0519C31.1398 28.308 31.031 28.5499 30.8785 28.7639C30.726 28.9779 30.5328 29.1597 30.31 29.299C30.0873 29.4383 29.8392 29.5324 29.5801 29.5757C29.3209 29.6191 29.0558 29.6111 28.7997 29.5519L22.9487 28.1999C22.6927 28.141 22.4508 28.0322 22.2368 27.8797C22.0228 27.7272 21.841 27.534 21.7017 27.3112C21.5624 27.0885 21.4683 26.8404 21.4249 26.5813C21.3815 26.3221 21.3896 26.057 21.4487 25.8009L22.8007 19.9499H22.7997Z'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity={stokeOpacity}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <h1 className={`${textColor} font-medium text-md font-roboto-text`}>
          {text}
        </h1>
      </button>
    </div>
  );
};

export default ButtonEditorInterior;
