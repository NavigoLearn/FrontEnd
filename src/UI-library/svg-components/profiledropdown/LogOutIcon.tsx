import React from 'react';
import { motion } from 'framer-motion';

type ILogOutIconProps = {
  handleAnimation: () => void;
  isOpen: boolean;
  size: number;
  isHovered: boolean;
};

export const LogOutIcon = ({
  handleAnimation,
  isOpen,
  size,
  isHovered,
}: ILogOutIconProps) => {
  const variants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2, // Delay for the entire group
      },
    },
    closed: { opacity: 0 },
    door: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1,
      },
    },
    arrow: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.15,
      },
    },
    arrowClosed: {
      opacity: 0,
      x: 20,
      transition: {
        delay: 0.2,
      },
    },
  };
  return (
    <svg
      onClick={handleAnimation}
      className={` flex`}
      viewBox='0 0 24 24'
      width={size}
      height={size}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0' />
      <g
        id='SVGRepo_tracerCarrier'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <g id='SVGRepo_iconCarrier'>
        <motion.path
          animate={isOpen ? 'door' : 'closed'}
          variants={variants}
          id='door'
          d='M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17'
          stroke={isHovered ? '#ffffff' : '#1A1B50'}
          strokeWidth='1.5'
          strokeLinecap='round'
        />
        <motion.path
          animate={isOpen ? 'arrow' : 'arrowClosed'}
          variants={variants}
          id='arrow'
          d='M15 12L2 12M2 12L5.5 9M2 12L5.5 15'
          stroke={isHovered ? '#ffffff' : '#1A1B50'}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  );
};

export default LogOutIcon;
