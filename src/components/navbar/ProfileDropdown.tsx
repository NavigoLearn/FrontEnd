import React, { useState } from 'react';
import { handleLogout } from '@components/auth/socialAuth';
import { motion, Variants } from 'framer-motion';
import ButtonItem from './ButtonItem';

const ProfileDropdown = ({
  profilePictureUrl,
}: {
  profilePictureUrl: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        restDelta: 0.5,
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
    closed: {
      opacity: 0,
      y: 20,
      transition: {
        restDelta: 0.5,
        duration: 0.2,
      },
    },
  };

  const handleAnimation = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className='flex flex-col items-center justify-center'
    >
      <motion.button
        whileTap={{
          scale: 0.9,
        }}
        onClick={handleAnimation}
      >
        <img
          draggable='false'
          src={profilePictureUrl}
          alt='icon'
          className='w-10 h-10 rounded-full flex m-1'
        />
      </motion.button>
      <motion.ul
        className='flex flex-col gap-2 items-center justify-center w-32 h-24 bg-white rounded-md shadow-2xl absolute top-5 left-90%'
        variants={{
          open: {
            clipPath: 'inset(0% 0% 0% 0% round 10px)',
            translateY: 50,
            translateX: -40,
            opacity: 1,
            transition: {
              type: 'spring',
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: 'inset(10% 50% 90% 50% round 10px)',
            translateY: 0,
            translateX: 0,
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
        <ButtonItem
          variants={itemVariants}
          text='Profile'
          handleAnimation={handleAnimation}
          isOpen={isOpen}
          onClick={() => console.log('profile')}
        />
        <ButtonItem
          variants={itemVariants}
          text='Log Out'
          handleAnimation={handleAnimation}
          isOpen={isOpen}
          onClick={handleLogout}
        />
      </motion.ul>
    </motion.nav>
  );
};

export default ProfileDropdown;
