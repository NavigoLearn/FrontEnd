import React, { useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { getUserStatus } from '@src/store/user/user-status';
import { useClickOutside } from '@src/hooks/useClickOutside';
import ButtonsManagerM from '../buttons/ButtonsManagerM';

const slideMenuVariants: Variants = {
  open: {
    translateX: 0,
    transition: {
      duration: 0.2,
      type: 'tween',
    },
  },
  closed: {
    translateX: '100%',
    transition: {
      duration: 0.2,
      type: 'tween',
    },
  },
};

const overlayVariants: Variants = {
  open: {
    opacity: 1,
    display: 'block',
  },
  closed: {
    opacity: 0,
    transitionEnd: {
      display: 'none',
    },
  },
};

const SlideMenu = ({
  isOpen,
  setMenuOpen,
}: {
  isOpen: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
}) => {
  const { isLogged } = getUserStatus();

  const handleInnerDivClick = (e) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      onClick={() => setMenuOpen(false)}
      className='fixed top-0 right-0 h-full w-full bg-[#1A1B504D]'
      initial={false}
      variants={overlayVariants}
      animate={isOpen ? 'open' : 'closed'}
    >
      <motion.div
        onClick={handleInnerDivClick} // Add an onClick handler to the inner div
        className='fixed top-0 right-0 h-full w-7/12 bg-navbarBlue'
        initial={false}
        variants={slideMenuVariants}
        animate={isOpen ? 'open' : 'closed'}
      >
        {isOpen && <ButtonsManagerM isLogged={isLogged} />}
      </motion.div>
    </motion.div>
  );
};

export default SlideMenu;
