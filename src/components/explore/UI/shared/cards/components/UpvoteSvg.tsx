import React, { useState } from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';

type IUpvoteProps = {
  size: number;
  upvote: boolean;
  voted: boolean;
  callback: (upvote: boolean) => void;
};

const UpvoteSvg = ({ size, voted, upvote, callback }: IUpvoteProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 18 18'
      onClick={() => {
        callback(upvote);
      }}
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className={`cursor-pointer ${
        !upvote && 'rotate-180'
      } ${tailwindTransitionClass} ${hovered && 'bg-gray-200 '}`}
    >
      <path
        d='M3.375 9.375L8.625 3H9.375L14.625 9.375L11.625 9.75L10.875 15.75H7.125L6.375 9.75L3.375 9.375Z'
        className={`fill-none ${voted && 'fill-primary'}`}
      />
      <path
        d='M9.58522 1.78086C9.29947 1.42461 8.69947 1.42461 8.41372 1.78086L2.41372 9.28086C2.3257 9.39127 2.2706 9.52426 2.25475 9.66457C2.23889 9.80487 2.26293 9.94681 2.32409 10.0741C2.38526 10.2013 2.48108 10.3088 2.60054 10.384C2.72 10.4593 2.85827 10.4994 2.99947 10.4996H5.99947V15.7496C5.99947 15.9485 6.07849 16.1393 6.21914 16.2799C6.3598 16.4206 6.55056 16.4996 6.74947 16.4996H11.2495C11.4484 16.4996 11.6392 16.4206 11.7798 16.2799C11.9205 16.1393 11.9995 15.9485 11.9995 15.7496V10.4996H14.9995C15.1407 10.4994 15.2789 10.4593 15.3984 10.384C15.5179 10.3088 15.6137 10.2013 15.6749 10.0741C15.736 9.94681 15.7601 9.80487 15.7442 9.66457C15.7283 9.52426 15.6732 9.39127 15.5852 9.28086L9.58522 1.78086ZM11.2495 8.99961H10.4995V14.9996H7.49947V8.99961H4.56022L8.99947 3.45036L13.4387 8.99961H11.2495Z'
        className={`fill-primary ${
          !voted && !hovered && 'opacity-50'
        } ${tailwindTransitionClass}`}
      />
    </svg>
  );
};

export default UpvoteSvg;
