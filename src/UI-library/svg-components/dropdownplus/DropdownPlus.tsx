import React from 'react';
import { motion } from 'framer-motion';

type IDropdownPlusProps = {
  isHovered?: boolean;
};

const defaultProps: IDropdownPlusProps = {
  isHovered: false,
};

const DropdownPlus = ({ isHovered }: IDropdownPlusProps) => {
  return (
    <svg width='27' height='27' viewBox='0 0 23 23' fill='none'>
      <circle cx='11.5' cy='11.5' r='10' fill='#1A1B50' />
      <motion.line
        x1='7'
        y1='11.5'
        x2='16'
        y2='11.5'
        stroke={`${isHovered ? '#1A1B50' : 'white'}`}
        strokeWidth='2.5'
        strokeLinecap='round'
        variants={{
          closed: { rotate: 0, opacity: 1 },
          open: { rotate: 45, opacity: 0 },
        }}
      />
      <motion.line
        x1='11.5'
        y1='7'
        x2='11.5'
        y2='16'
        stroke={`${isHovered ? '#1A1B50' : 'white'}`}
        strokeWidth='2.5'
        strokeLinecap='round'
        variants={{
          closed: { rotate: 0 },
          open: { rotate: 90 },
        }}
      />
    </svg>
  );
};

DropdownPlus.defaultProps = defaultProps;

export default DropdownPlus;
