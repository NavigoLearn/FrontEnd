import React from 'react';
import { motion } from 'framer-motion';

const AnimLoupe = ({ handleLoupeClick }: { handleLoupeClick: (e) => void }) => {
  return (
    <motion.svg
      whileTap={{ scale: 0.9 }}
      onClick={handleLoupeClick}
      width='24'
      height='24'
      viewBox='0 0 19 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='outline-none'
    >
      <g clipPath='url(#clip0_1899_4834)'>
        <path
          d='M1.67578 8.66108C1.67578 10.5137 2.41173 12.2904 3.72172 13.6004C5.03173 14.9104 6.80846 15.6464 8.66108 15.6464C10.5137 15.6464 12.2904 14.9104 13.6004 13.6004C14.9104 12.2904 15.6464 10.5137 15.6464 8.66108C15.6464 6.80846 14.9104 5.03173 13.6004 3.72172C12.2904 2.41173 10.5137 1.67578 8.66108 1.67578C6.80846 1.67578 5.03173 2.41173 3.72172 3.72172C2.41173 5.03173 1.67578 6.80846 1.67578 8.66108Z'
          stroke='#1A1B50'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M14.3223 14.3203L17.3243 17.3231'
          stroke='#1A1B50'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_1899_4834'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </motion.svg>
  );
};

export default AnimLoupe;
