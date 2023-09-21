import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

const LoadingCard = () => {
  return (
    <motion.div
      key='motion1'
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{ opacity: 0 }}
      className='w-80 h-48 border-2 border-black border-opacity-10 rounded-md relative px-4'
    >
      <AnimatePresence>
        <motion.div
          key='motion2'
          initial={{ width: '0%' }}
          animate={{
            width: '100%',
            transition: {
              repeat: Infinity,
              repeatDelay: 1,
              duration: 1.5,
              delay: 0.2,
            },
          }}
          className='h-5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded mt-4'
        />
        <motion.h2
          key='motion3'
          initial={{ x: -30, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              repeat: Infinity,
              repeatDelay: 1,
              duration: 1.5,
              delay: 0.4,
            },
          }}
          className='h-7 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100 rounded mt-5'
        />
        <motion.button
          key='motion4'
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            transition: {
              repeat: Infinity,
              repeatDelay: 1,
              duration: 1.5,
              delay: 0.6,
            },
          }}
          className='w-1/2 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded mt-2'
        />
        <motion.div
          key='motion5'
          initial={{ width: '0%' }}
          animate={{
            width: '100%',
            transition: {
              repeat: Infinity,
              repeatDelay: 1,
              duration: 1.5,
              delay: 0.8,
            },
          }}
          className='h-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded mt-6'
        />
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingCard;
