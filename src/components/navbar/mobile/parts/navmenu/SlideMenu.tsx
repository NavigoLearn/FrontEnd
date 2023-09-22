import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { getUserStatus } from '@src/store/user/user-status';
import ButtonsManagerM from '../buttons/ButtonsManagerM';

const SlideMenu = ({ isOpen }: { isOpen: boolean }) => {
  const { isLogged } = getUserStatus();

  return (
    <motion.div
      className='fixed top-0 right-0 h-full w-7/12 bg-navbarBlue z-[200]'
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={{
        open: { translateX: 0 },
        closed: { translateX: '100%' },
      }}
      transition={{ duration: 0.2, type: 'tween' }}
    >
      {isOpen && <ButtonsManagerM isLogged={isLogged} />}
    </motion.div>
  );
};

export default SlideMenu;
