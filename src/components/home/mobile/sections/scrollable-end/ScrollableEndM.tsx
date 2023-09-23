import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ScrollableEndM = () => {
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
      <div className='h-[200vh] w-screen' ref={trigger} />
      <div className='w-screen fixed top-[35vh] -translate-y-1/2 justify-center flex mb-12'>
        <motion.h2
          className='text-secondary font-roboto-text font-normal text-md'
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
        <div className='absolute top-12 left-1/2 -translate-x-1/2'>
          <div className='flex flex-col gap-2 justify-center items-center w-screen px-3'>
            <motion.h1
              className='text-darkBlue font-roboto-text text-lg font-semibold w-full text-center'
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
              className='text-md text-secondary font-roboto-text font-normal'
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
              href='/explore'
              className=' px-3 py-1 text-white bg-primary rounded-md shadow-md text-md font-roboto-text font-medium'
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

export default ScrollableEndM;
