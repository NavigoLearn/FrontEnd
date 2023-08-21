import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ThemeSelectorProps {
  onNext: () => void;
}

const TitleSelector = ({ onNext }: ThemeSelectorProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col items-center'
      >
        <div className='text-3xl font-kanit-text text-darkBlue'>
          Give it a title
        </div>
        <input
          className='border-2 border-[#D9D9D9] rounded-lg w-80 placeholder:text-[#D9D9D9] placeholder:font-roboto-text px-3 py-2 mt-5 text-darkBlue outline-none'
          placeholder='Write here an awesome title'
        />
      </motion.div>
      <div className='flex flex-col items-center mt-24 text-base font-roboto-text'>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          type='button'
          className='bg-[#3361D8] text-white px-4 py-1 rounded-md w-72'
        >
          Finish
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          type='button'
          className='mt-1'
        >
          I&rsquo;ll do it later
        </motion.button>
      </div>
    </AnimatePresence>
  );
};

export default TitleSelector;
