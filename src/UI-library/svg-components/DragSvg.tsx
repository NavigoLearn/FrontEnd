import React from 'react';

type IProps = {
  size: number;
};
const DragSvg = ({ size }: IProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 37 37'
      fill='none'
    >
      <g filter='url(#filter0_d_2125_2852)'>
        <path
          d='M19.5825 9.11399V13.4663H23.9124V11.2902L29 14.5544L23.9124 17.7098V15.5337H23.8041H19.5825V19.886H21.7474L18.5 25L15.2526 19.886H17.4175V15.5337H13.0876V17.7098L8 14.5544L13.0876 11.2902V13.4663H13.1959H17.4175V9.11399H15.2526L18.5 4L21.6392 9.11399H19.5825Z'
          fill='#2557D6'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_2125_2852'
          x='0'
          y='0'
          width='37'
          height='37'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='4' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_2125_2852'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_2125_2852'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  );
};

export default DragSvg;
