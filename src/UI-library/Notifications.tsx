import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import blueInfo from 'src/assets/blue-info.svg';

const Path = (props) => (
  <motion.path
    fill='transparent'
    strokeWidth='3'
    stroke='hsl(0, 0%, 18%)'
    strokeLinecap='round'
    {...props}
  />
);

const Notifications = ({ isVisible, onCloseClick }) => {
  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className=' bg-white w-56 flex h-fit absolute bottom-20 right-[45vw] p-3'
        >
          <img
            src={blueInfo.src}
            alt='tip'
            className='w-8 h-8 justify-center flex'
          />
          Tip: You can hold shift + click to snap multiple nodes
          <button type='button' onClick={onCloseClick} className='close flex'>
            <svg width='23' height='23' viewBox='0 0 23 23'>
              <Path d='M 3 16.5 L 17 2.5' />
              <Path d='M 3 2.5 L 17 16.346' />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notifications;
