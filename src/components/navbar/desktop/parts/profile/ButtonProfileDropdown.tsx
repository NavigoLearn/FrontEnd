import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ProfileIcons } from '@src/UI-library/svg-components/profiledropdown/ProfileIcons';
import { LogOutIcon } from '@src/UI-library/svg-components/profiledropdown/LogOutIcon';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';

const ButtonProfileDropdown = ({
  variants,
  text,
  isOpen,
  handleAnimation,
  onClick,
}: {
  variants: Variants;
  text: string;
  isOpen: boolean;
  handleAnimation: () => void;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isProfile = text === 'Profile';
  return (
    <motion.li variants={variants} className='w-full pl-10 '>
      <button
        type='button'
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-center h-full relative px-2 bg-white text-darkBlue text-md font-roboto-text opacity-70 hover:opacity-100 2 rounded-md ${tailwindTransitionClass} duration-100`}
      >
        <div
          className={`absolute  ${
            isProfile ? ' top-1 -left-6' : 'top-2 -left-6'
          }`}
        >
          {isProfile && (
            <ProfileIcons
              handleAnimation={handleAnimation}
              isOpen={isOpen}
              size={21}
              isHovered={false}
            />
          )}
          {!isProfile && (
            <LogOutIcon
              handleAnimation={handleAnimation}
              isOpen={isOpen}
              size={18}
              isHovered={false}
            />
          )}
        </div>
        <span className='mt-1'>{text}</span>
      </button>
    </motion.li>
  );
};

export default ButtonProfileDropdown;
