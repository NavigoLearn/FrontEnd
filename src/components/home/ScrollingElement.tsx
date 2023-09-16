import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ScrollingElement = () => {
  const [isFirstSectionVisible, setIsFirstSectionVisible] = useState(false);
  const [isSecondSectionVisible, setIsSecondSectionVisible] = useState(false);
  const controls = useAnimation();

  const handleScroll = () => {
    const yOffset = window.pageYOffset;

    if (!isFirstSectionVisible && yOffset >= 1200) {
      setIsFirstSectionVisible(true);
    }

    if (isFirstSectionVisible && !isSecondSectionVisible && yOffset >= 1500) {
      setIsSecondSectionVisible(true);
      controls.start({ opacity: 1, y: 0 });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFirstSectionVisible, isSecondSectionVisible]);

  return (
    <div className='mt-56 justify-center text-center flex flex-col gap-36 mb-12'>
      <motion.h2
        className='text-secondary font-roboto-text font-semibold text-3xl'
        initial={{ opacity: 0, y: 20 }}
        animate={isFirstSectionVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        And remember...
      </motion.h2>
      <div className='flex flex-col gap-2'>
        <motion.h1
          className='text-darkBlue font-roboto-text text-5xl font-semibold'
          initial={{ opacity: 0, y: 20 }}
          animate={isSecondSectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          The journey of 1000 miles starts with one roadmap
        </motion.h1>
        <motion.h2
          className='text-4xl text-secondary font-roboto-text font-medium'
          initial={{ opacity: 0, y: 20 }}
          animate={isSecondSectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Start yours today
        </motion.h2>
      </div>
      <motion.div
        className='mt-2 w-[500px] mx-auto gap-2 flex flex-row'
        initial={{ opacity: 0, y: 20 }}
        animate={isSecondSectionVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <a
          type='button'
          href='/roadmaps/create'
          className='mx-auto mt-8 px-6 py-3 text-darkBlue bg-transparent rounded-lg shadow-md text-xl font-roboto-text font-semibold border-2 border-darkBlue'
        >
          Create a roadmap
        </a>
        <a
          type='button'
          href='/explore'
          className='mx-auto mt-8 px-6 py-3 text-white bg-primary rounded-lg shadow-md text-xl font-roboto-text font-medium'
        >
          Explore roadmaps
        </a>
      </motion.div>
    </div>
  );
};

export default ScrollingElement;
