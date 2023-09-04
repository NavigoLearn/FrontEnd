import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ProfileIcons } from '@src/UI-library/svg-components/profiledropdown/ProfileIcons';
import { LogOutIcon } from '@src/UI-library/svg-components/profiledropdown/LogOutIcon';

const ButtonItem = ({
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
  return (
    <motion.li variants={variants}>
      <button
        type='button'
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className='flex w-full h-full px-2 bg-white text-darkBlue text-md font-roboto-text font-semibold hover:bg-darkBlue hover:text-white 2 rounded-md'
      >
        {text}
        {text === 'Profile' && (
          <ProfileIcons
            handleAnimation={handleAnimation}
            isOpen={isOpen}
            width={6}
            height={6}
            isHovered={isHovered}
          />
        )}
        {text === 'Log Out' && (
          <LogOutIcon
            handleAnimation={handleAnimation}
            isOpen={isOpen}
            width={6}
            height={6}
            isHovered={isHovered}
          />
        )}
      </button>
    </motion.li>
  );
};

export default ButtonItem;
