import React from 'react';

const SizingButton = ({
  onClick,
  isSelected,
}: {
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <div>
      <button type='button' onClick={onClick} aria-label='Sizing'>
        <svg
          width='60'
          height='60'
          viewBox='0 0 48 48'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M29 5H9C6.79086 5 5 6.79086 5 9V29C5 31.2091 6.79086 33 9 33H29C31.2091 33 33 31.2091 33 29V9C33 6.79086 31.2091 5 29 5Z'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity='0.3'
            strokeWidth='2'
          />
          <path
            d='M5 41H33M33 39V43M5 39V43M39 5H43M39 33H43M41 33V5'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity='0.3'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      <h2 className='text-secondary font-semibold text-lg font-roboto-text'>
        Sizing
      </h2>
    </div>
  );
};

const ColoursButton = ({
  onClick,
  isSelected,
}: {
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <div>
      <button type='button' onClick={onClick} aria-label='Colours'>
        <svg
          width='60'
          height='60'
          viewBox='0 0 48 48'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M17.6865 42.22L40.5695 29.219C41.4759 28.7042 42.1454 27.8559 42.4357 26.8548C42.7259 25.8537 42.6139 24.7788 42.1235 23.859L38.9995 18'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity='0.3'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path
            d='M27.4769 7.12109C27.3614 7.05844 27.2348 7.01915 27.1042 7.00545C26.9736 6.99176 26.8415 7.00392 26.7156 7.04125C26.5897 7.07858 26.4724 7.14034 26.3703 7.22302C26.2683 7.30569 26.1835 7.40765 26.1209 7.52309C26.0582 7.63852 26.0189 7.76516 26.0052 7.89577C25.9915 8.02639 26.0037 8.15843 26.041 8.28434C26.0784 8.41026 26.1401 8.52759 26.2228 8.62964C26.3055 8.73168 26.4074 8.81644 26.5229 8.87908L27.4769 7.12109ZM32.6859 11.0871L33.1629 10.2081L32.6859 11.0881V11.0871ZM34.2409 16.6021L33.3749 16.1021L33.3719 16.1081L34.2409 16.6021ZM26.5229 8.88009L32.2089 11.9671L33.1629 10.2081L27.4769 7.12209L26.5229 8.88009ZM33.3719 16.1101L20.7559 38.3201L22.4939 39.3071L35.1109 17.0971L33.3709 16.1091L33.3719 16.1101ZM32.2089 11.9671C32.5608 12.1583 32.8709 12.418 33.1208 12.7309C33.3708 13.0439 33.5555 13.4037 33.6642 13.7892C33.7729 14.1746 33.8032 14.578 33.7535 14.9754C33.7039 15.3728 33.5751 15.7562 33.3749 16.1031L35.1069 17.1031C35.4407 16.5249 35.6553 15.8858 35.7381 15.2233C35.821 14.5609 35.7703 13.8886 35.5891 13.246C35.4079 12.6035 35.0999 12.0037 34.6832 11.4821C34.2665 10.9605 33.7495 10.5267 33.1629 10.2081L32.2089 11.9671Z'
            fill={isSelected ? '#2557D6' : 'black'}
            fillOpacity='0.3'
          />
          <path
            d='M5 9C5 7.93913 5.42143 6.92172 6.17157 6.17157C6.92172 5.42143 7.93913 5 9 5H19C20.0609 5 21.0783 5.42143 21.8284 6.17157C22.5786 6.92172 23 7.93913 23 9V34C23 35.1819 22.7672 36.3522 22.3149 37.4442C21.8626 38.5361 21.1997 39.5282 20.364 40.364C19.5282 41.1997 18.5361 41.8626 17.4442 42.3149C16.3522 42.7672 15.1819 43 14 43C12.8181 43 11.6478 42.7672 10.5558 42.3149C9.46392 41.8626 8.47177 41.1997 7.63604 40.364C6.80031 39.5282 6.13738 38.5361 5.68508 37.4442C5.23279 36.3522 5 35.1819 5 34V9Z'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity='0.3'
            strokeWidth='2'
          />
          <path
            d='M14 37C15.6569 37 17 35.6569 17 34C17 32.3431 15.6569 31 14 31C12.3431 31 11 32.3431 11 34C11 35.6569 12.3431 37 14 37Z'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity='0.3'
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
      </button>

      <h2 className='text-secondary font-semibold text-lg font-roboto-text'>
        Colours
      </h2>
    </div>
  );
};

const InteriorButton = ({
  onClick,
  isSelected,
}: {
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <div>
      <button type='button' onClick={onClick} aria-label='Interior'>
        <svg
          width='60'
          height='60'
          viewBox='0 0 48 48'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M42 29V11C42 9.93913 41.5786 8.92172 40.8284 8.17157C40.0783 7.42143 39.0609 7 38 7H8C6.93913 7 5.92172 7.42143 5.17157 8.17157C4.42143 8.92172 4 9.93913 4 11V37C4 38.0609 4.42143 39.0783 5.17157 39.8284C5.92172 40.5786 6.93913 41 8 41H27'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity='0.3'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path
            d='M33.6615 41.7379C33.4902 41.7652 33.3147 41.7475 33.1523 41.6865C32.9899 41.6255 32.8462 41.5233 32.7352 41.39C32.6242 41.2566 32.5499 41.0967 32.5194 40.9259C32.489 40.7551 32.5035 40.5793 32.5615 40.4159L35.6415 31.7359C35.7017 31.5663 35.8065 31.4161 35.945 31.3011C36.0834 31.1861 36.2503 31.1106 36.428 31.0825C36.6058 31.0545 36.7878 31.0749 36.9549 31.1417C37.122 31.2084 37.268 31.319 37.3775 31.4619L42.9775 38.7609C43.0829 38.8984 43.1508 39.0609 43.1745 39.2325C43.1981 39.4041 43.1768 39.579 43.1126 39.7399C43.0484 39.9008 42.9434 40.0423 42.8081 40.1504C42.6728 40.2586 42.5116 40.3297 42.3405 40.3569L33.6615 41.7379Z'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity='0.3'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M14 7V41'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity='0.3'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path
            d='M22.7997 19.9499C22.8587 19.6938 22.9675 19.4517 23.1201 19.2377C23.2727 19.0236 23.4659 18.8418 23.6888 18.7024C23.9117 18.5631 24.1599 18.4691 24.4191 18.4258C24.6784 18.3825 24.9437 18.3907 25.1997 18.4499L31.0507 19.8019C31.3068 19.8609 31.5487 19.9697 31.7627 20.1222C31.9767 20.2747 32.1585 20.4678 32.2978 20.6906C32.4371 20.9134 32.5312 21.1615 32.5746 21.4206C32.6179 21.6798 32.6099 21.9449 32.5507 22.2009L31.1987 28.0519C31.1398 28.308 31.031 28.5499 30.8785 28.7639C30.726 28.9779 30.5328 29.1597 30.31 29.299C30.0873 29.4383 29.8392 29.5324 29.5801 29.5757C29.3209 29.6191 29.0558 29.6111 28.7997 29.5519L22.9487 28.1999C22.6927 28.141 22.4508 28.0322 22.2368 27.8797C22.0228 27.7272 21.841 27.534 21.7017 27.3112C21.5624 27.0885 21.4683 26.8404 21.4249 26.5813C21.3815 26.3221 21.3896 26.057 21.4487 25.8009L22.8007 19.9499H22.7997Z'
            stroke={isSelected ? '#2557D6' : 'black'}
            strokeOpacity='0.3'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      <h2 className='text-secondary font-semibold text-lg font-roboto-text'>
        Interior
      </h2>
    </div>
  );
};

export { SizingButton, ColoursButton, InteriorButton };
