import React from 'react';

const PlayButtonM = ({
  fillPlay,
  fillCircle,
  size,
}: {
  fillPlay: string;
  fillCircle: string;
  size: number;
}) => {
  return (
    <svg
      className='mr-4'
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='Frame' clipPath='url(#clip0_1899_3236)'>
        <path
          id='Vector'
          d='M10 0.3125C4.64844 0.3125 0.3125 4.64844 0.3125 10C0.3125 15.3516 4.64844 19.6875 10 19.6875C15.3516 19.6875 19.6875 15.3516 19.6875 10C19.6875 4.64844 15.3516 0.3125 10 0.3125ZM14.5195 10.9375L7.64453 14.8828C7.02734 15.2266 6.25 14.7852 6.25 14.0625V5.9375C6.25 5.21875 7.02344 4.77344 7.64453 5.11719L14.5195 9.29688C15.1602 9.65625 15.1602 10.582 14.5195 10.9375Z'
          fill={fillCircle}
        />
      </g>
      <defs>
        <clipPath id='clip0_1899_3236'>
          <rect width='20' height='20' fill={fillPlay} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PlayButtonM;
