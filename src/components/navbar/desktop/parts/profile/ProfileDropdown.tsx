import React, { useRef } from 'react';
import { handleLogout } from '@components/auth/old/socialAuth';
import { motion, type Variants } from 'framer-motion';
import { useClickOutside } from '@hooks/useClickOutside';
import useStateAndRef from '@hooks/useStateAndRef';
import ButtonProfileDropdown from './ButtonProfileDropdown';

const ProfileDropdown = ({
  profilePictureUrl,
}: {
  profilePictureUrl: string;
}) => {
  const [isOpen, setIsOpen, isOpenRef] = useStateAndRef(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => {
    if (isOpenRef.current === false) {
      return;
    }
    setIsOpen(false);
  });

  const itemVariants: Variants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
        duration: 0.2,
      },
    },
    closed: {
      x: 10,
      opacity: 0,
      transition: {
        duration: 0,
      },
    },
  };

  const handleAnimation = () => {
    setIsOpen(!isOpenRef.current);
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className='flex relative flex-col items-center justify-center'
    >
      <motion.button
        whileTap={{
          scale: 0.9,
        }}
        onClick={(e) => {
          handleAnimation();
          e.stopPropagation();
        }}
      >
        <img
          draggable='false'
          src={profilePictureUrl}
          alt='icon'
          className='w-10 h-10 rounded-full flex m-1'
        />
      </motion.button>
      <motion.div
        ref={dropdownRef}
        className='w-32 h-[88px] bg-white rounded-md  absolute top-16 right-0 z-10'
        initial={{
          x: 0,
          y: 20,
          opacity: 0,
        }}
        variants={{
          open: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            y: 20,
            x: 0,
            opacity: 0,
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <ul className=' flex flex-col gap-1 items-center justify-center absolute top-0 left-0 bg-white w-full h-full z-20 border-2 border-gray-200  rounded-md'>
          <ButtonProfileDropdown
            variants={itemVariants}
            text='Profile'
            handleAnimation={handleAnimation}
            isOpen={isOpen}
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              location.href = '/profile';
            }}
          />
          <ButtonProfileDropdown
            variants={itemVariants}
            text='Log Out'
            handleAnimation={handleAnimation}
            isOpen={isOpen}
            onClick={handleLogout}
          />
        </ul>
        <div className='absolute w-4 h-4  top-[-7px] right-4  rotate-45 bg-white z-20 border-0 border-l-2 border-t-2  border-gray-200 pointer-events-none ' />
      </motion.div>
    </motion.nav>
  );
};

export default ProfileDropdown;
