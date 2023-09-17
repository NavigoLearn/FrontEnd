import React, { useEffect, useRef } from 'react';
import { Play } from '@src/components/home/icons/HomeIcons';
import versatile from '@assets/versatile.svg';
import infinite from '@assets/infinite.svg';
import intuitive from '@assets/intuitive.svg';
import NodesAnimation from '@src/components/home/animated/NodesAnimation';
import { motion } from 'framer-motion';

const MiddleSection = () => {
  const fadeInUpAnim = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const root = useRef(null);
  const [fadeInUp, setFadeInUp] = React.useState('hidden');

  const [fillPlay, setFillPlay] = React.useState('#fff');
  const [fillCircle, setFillCircle] = React.useState('#1A1B50');

  const handleButtonHover = () => {
    setFillPlay(fillPlay === '#fff' ? '#1A1B50' : '#fff');
    setFillCircle(fillCircle === '#1A1B50' ? '#fff' : '#1A1B50');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (root.current) {
        const { top } = root.current.getBoundingClientRect();
        setFadeInUp(
          top - window.innerHeight * (3 / 7) <= 0 ? 'visible' : 'hidden'
        );
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={fadeInUp}
      transition={{ duration: 0.5 }}
      variants={fadeInUpAnim}
      ref={root}
    >
      <div
        className='flex flex-col mx-auto justify-center items-center bg-white mt-56 pt-12 pb-16 w-1/2 rounded-full mb-[-60px]'
        style={{
          boxShadow: '0px 0px 128px 64px rgba(255, 255, 255, 1)',
        }}
      >
        <h1 className='mx-auto z-20 text-center items-center w-[600px] xl:w-[600px] font-roboto-text text-5xl font-semibold justify-center text-darkBlue'>
          Why roadmaps?
        </h1>
        <motion.button
          type='button'
          className='flex mx-auto mt-8 px-8 py-1 text-darkBlue bg-transparent rounded-lg shadow-md text-xl font-roboto-text font-semibold border-2 border-darkBlue text-center items-center'
          whileHover={{
            scale: 1.05,
            backgroundColor: '#1A1B50',
            color: '#fff',
            transition: { duration: 0.2 },
          }}
          onHoverStart={handleButtonHover}
          onHoverEnd={handleButtonHover}
        >
          <Play fillCircle={fillCircle} fillPlay={fillPlay} />
          Watch video
        </motion.button>
      </div>
      <motion.div
        className='flex flex-row gap-20 justify-center -translate-y-32 z-10'
        initial='hidden'
        animate={fadeInUp}
        variants={fadeInUpAnim}
      >
        <div className='absolute -translate-x-[100%] 2xl:-translate-x-[130%]'>
          <NodesAnimation
            width={300}
            height={200}
            y1={0}
            y2={150}
            x1={150}
            x2={0}
            strokeOpacity={1}
          />
        </div>
        <div className='absolute'>
          <NodesAnimation
            width={200}
            height={200}
            y1={0}
            y2={150}
            x1={0}
            x2={0}
            strokeOpacity={1}
          />
        </div>
        <div className='absolute translate-x-[100%] 2xl:translate-x-[130%]'>
          <NodesAnimation
            width={300}
            height={200}
            x1={0}
            x2={150}
            y1={0}
            y2={150}
            strokeOpacity={1}
          />
        </div>
      </motion.div>
      <div className='w-full mt-56 flex flex-row justify-center items-center'>
        <div className='flex flex-row gap-32'>
          <motion.div
            className='border-primary border-t-4 w-72 h-80 2xl:w-96 py-3 px-6 bg-white drop-shadow-md items-center'
            initial='hidden'
            animate={fadeInUp}
            variants={fadeInUpAnim}
          >
            <div className='bg-white border border-primary rounded-full justify-center mx-auto -translate-y-16 items-center flex w-20 h-20'>
              <img
                src={versatile}
                alt='versatile'
                className='w-14 justify-center items-center'
              />
            </div>
            <h1 className='text-3xl font-roboto-text font-semibold bg-gradient-to-b bg-clip-text text-transparent from-[#1A1B50] to-[#3134A5] text-center justify-center -translate-y-8'>
              Versatile
            </h1>
            <p className='text-secondary text-base justify-center text-center font-medium font-roboto-text -translate-y-2'>
              In a form of a tree, roadmaps can represent any kind of
              information hierarchical structure. They can draw logic
              connections between ideas and allow you to follow a sequence of
              steps that lead you towards your goals
            </p>
          </motion.div>
          <motion.div
            className='border-primary border-t-4 w-72 h-80 2xl:w-96 py-3 px-6 bg-white drop-shadow-md items-center'
            initial='hidden'
            animate={fadeInUp}
            variants={fadeInUpAnim}
          >
            <div className='bg-white border border-primary rounded-full justify-center mx-auto -translate-y-16 items-center flex w-20 h-20'>
              <img
                src={infinite}
                alt='infinite'
                className='w-14 justify-center items-center'
              />
            </div>
            <h1 className='text-3xl font-roboto-text font-semibold bg-gradient-to-b bg-clip-text text-transparent from-[#1A1B50] to-[#3134A5] text-center justify-center -translate-y-8'>
              Infinite
            </h1>
            <p className='text-secondary text-base justify-center text-center font-medium font-roboto-text -translate-y-2'>
              Our roadmaps can be infinite! Yeah, that is right, we implemented
              minecraft-like chunking directly into the roadmaps, allowing for
              the creation and visualization of infinite amounts of data.
            </p>
          </motion.div>
          <motion.div
            className='border-primary border-t-4 w-72 h-80 2xl:w-96 py-3 px-6 bg-white drop-shadow-md items-center'
            initial='hidden'
            animate={fadeInUp}
            variants={fadeInUpAnim}
          >
            <div className='bg-white border border-primary rounded-full justify-center mx-auto -translate-y-16 items-center flex w-20 h-20'>
              <img
                src={intuitive}
                alt='intuitive'
                className='w-14 justify-center items-center'
              />
            </div>
            <h1 className='text-3xl font-roboto-text font-semibold bg-gradient-to-b bg-clip-text text-transparent from-[#1A1B50] to-[#3134A5] text-center justify-center -translate-y-8'>
              Intuitive
            </h1>
            <p className='text-secondary text-base justify-center text-center font-medium font-roboto-text -translate-y-2'>
              Roadmaps are interactive, allowing you to add comments, links,
              images, videos, and more. You can also share your roadmaps with
              others and collaborate on them in real-time.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MiddleSection;
