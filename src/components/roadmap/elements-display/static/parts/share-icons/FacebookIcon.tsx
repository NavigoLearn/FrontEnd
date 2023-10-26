import React, { useState } from 'react';

type Props = {
  size: number;
};
const FacebookIcon = ({ size }: Props) => {
  const [hover, setHover] = useState(false);
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={(size * 20) / 20}
      height={(size * 23) / 20}
      viewBox='0 0 20 23'
      fill='none'
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <g clipPath='url(#clip0_2397_2872)'>
        <path
          d='M17.8571 1.4375H2.14286C1.57454 1.4375 1.02949 1.66468 0.627628 2.06905C0.225765 2.47343 0 3.02188 0 3.59375L0 19.4062C0 19.9781 0.225765 20.5266 0.627628 20.931C1.02949 21.3353 1.57454 21.5625 2.14286 21.5625H8.27009V14.7204H5.45759V11.5H8.27009V9.04547C8.27009 6.25357 9.92188 4.71141 12.4518 4.71141C13.6634 4.71141 14.9304 4.92883 14.9304 4.92883V7.66906H13.5344C12.1589 7.66906 11.7299 8.52797 11.7299 9.40889V11.5H14.8004L14.3094 14.7204H11.7299V21.5625H17.8571C18.4255 21.5625 18.9705 21.3353 19.3724 20.931C19.7742 20.5266 20 19.9781 20 19.4062V3.59375C20 3.02188 19.7742 2.47343 19.3724 2.06905C18.9705 1.66468 18.4255 1.4375 17.8571 1.4375Z'
          fill='black'
          className={` ${hover ? 'opacity-60' : 'opacity-30'}`}
        />
      </g>
      <defs>
        <clipPath id='clip0_2397_2872'>
          <rect width='20' height='23' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FacebookIcon;
