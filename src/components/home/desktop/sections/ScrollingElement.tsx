import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ScrollingElement = () => {
  const [isFirstSectionVisible, setIsFirstSectionVisible] = useState(false);
  const [isSecondSectionVisible, setIsSecondSectionVisible] = useState(false);
  const trigger = useRef(null);
  const controls = useAnimation();

  const handleScroll = () => {
    if (!trigger.current) return;
    const beginH = trigger.current.getBoundingClientRect().top;
    const endH =
      trigger.current.getBoundingClientRect().top + window.innerHeight / 2;

    setIsFirstSectionVisible(beginH <= 0);

    setIsSecondSectionVisible(endH <= 0);

    if (isSecondSectionVisible) controls.start({ opacity: 1, y: 0 });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFirstSectionVisible, isSecondSectionVisible]);

  return (
    <>
      <div className='h-[175vh] w-screen' ref={trigger} />
      <div className='w-screen fixed top-[35vh] -translate-y-1/2 mx-auto justify-center flex mb-12'>
        <motion.h2
          className='text-secondary font-roboto-text font-normal text-xl'
          initial={{ opacity: 0, y: 20, display: 'none' }}
          animate={isFirstSectionVisible ? 'visible' : 'hidden'}
          variants={{
            hidden: { opacity: 0, y: 20, transitionEnd: { display: 'none' } },
            visible: { opacity: 1, y: 0, display: 'block' },
          }}
          transition={{ duration: 0.5 }}
        >
          And remember...
        </motion.h2>
        <div className='absolute top-20 left-1/2 -translate-x-1/2'>
          <div className='flex flex-col gap-2 justify-center items-center'>
            <motion.h1
              className='text-darkBlue font-roboto-text text-3xl font-semibold'
              initial={{ opacity: 0, y: 20, display: 'none' }}
              animate={isSecondSectionVisible ? 'visible' : 'hidden'}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                  transitionEnd: { display: 'none' },
                },
                visible: { opacity: 1, y: 0, display: 'block' },
              }}
              transition={{ duration: 0.5 }}
            >
              The journey of 1000 miles starts with one roadmap
            </motion.h1>
            <motion.h2
              className='text-xl text-secondary font-roboto-text font-normal'
              initial={{ opacity: 0, y: 20, display: 'none' }}
              animate={isSecondSectionVisible ? 'visible' : 'hidden'}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 20,
                  transitionEnd: { display: 'none' },
                },
                visible: { opacity: 1, y: 0, display: 'block' },
              }}
              transition={{ duration: 0.5 }}
            >
              Start yours today
            </motion.h2>
          </div>

          <motion.div
            className=' mx-auto gap-6 flex justify-center pt-10'
            initial={{ opacity: 0, y: 20, display: 'none' }}
            animate={isSecondSectionVisible ? 'visible' : 'hidden'}
            variants={{
              hidden: { opacity: 0, y: 20, transitionEnd: { display: 'none' } },
              visible: { opacity: 1, y: 0, display: 'flex' },
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.a
              type='button'
              href='/roadmap/create'
              className=' px-5 py-2 text-darkBlue bg-transparent rounded-md shadow-md text-md font-roboto-text font-semibold border-2 border-darkBlue'
              whileHover={{
                backgroundColor: '#1A1B50',
                color: '#fff',
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              Create a roadmap
            </motion.a>
            <motion.a
              type='button'
              href='/explore'
              className=' px-5 py-2 text-white bg-primary rounded-md shadow-md text-md font-roboto-text font-medium'
              whileHover={{
                backgroundColor: '#1A1B50',
                color: '#fff',
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              Explore roadmaps
            </motion.a>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ScrollingElement;
