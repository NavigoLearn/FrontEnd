import React from 'react';
import { motion } from 'framer-motion';
import ButtonsManagerM from '../buttons/ButtonsManagerM';

const SlideMenu = ({ isOpen }: { isOpen: boolean }) => {
  const isLogged = false;

  return (
    <motion.div
      className='fixed top-0 right-0 h-full w-48 bg-[#182852] z-[200]'
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
