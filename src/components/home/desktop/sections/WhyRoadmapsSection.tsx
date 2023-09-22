import React, { useEffect, useRef } from 'react';
import { Play } from '@components/home/desktop/icons/HomeIcons';
import NodesAnimation from '@components/home/desktop/components/NodesAnimation';
import Cards from '@components/home/desktop/components/Cards';
import { motion } from 'framer-motion';

const WhyRoadmapsSection = () => {
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
        <h1 className='mx-auto text-center items-center w-[600px] xl:w-[600px] font-roboto-text text-5xl font-semibold justify-center text-darkBlue'>
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
          <div className='absolute bg-white w-full h-1' />
          <NodesAnimation
            width={200}
            height={200}
            y1={150}
            y2={0}
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
          <Cards
            title='Versatile'
            description='In a form of a tree, roadmaps can represent any kind of information hierarchical structure. They can draw logic connections between ideas and allow you to follow a sequence of steps that lead you towards your goals'
            image='versatile'
            animate={fadeInUp}
            variants={fadeInUpAnim}
          />
          <Cards
            title='Infinite'
            description='Our roadmaps can be infinite! Yeah, that is right, we implemented minecraft-like chunking directly into the roadmaps, allowing for the creation and visualization of infinite amounts of data.'
            image='infinite'
            animate={fadeInUp}
            variants={fadeInUpAnim}
          />
          <Cards
            title='Intuitive'
            description='Roadmaps are interactive, allowing you to add comments, links, images, videos, and more. You can also share your roadmaps with others and collaborate on them in real-time.'
            image='intuitive'
            animate={fadeInUp}
            variants={fadeInUpAnim}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default WhyRoadmapsSection;
