import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CardsM from '@components/home/mobile/sections/why-roadmaps/components/CardsM';
import NodesAnimationM from '@components/home/mobile/sections/why-roadmaps/components/NodesAnimationM';
import PlayButtonM from '@components/home/mobile/sections/why-roadmaps/components/PlayButtonM';

const WhyRoadmapsSectionM = () => {
  const fadeInUpAnim = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  const root = useRef(null);
  const [fadeInUp, setFadeInUp] = useState('hidden');

  const [fillPlay, setFillPlay] = useState('#fff');
  const [fillCircle, setFillCircle] = useState('#1A1B50');

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
    <motion.div className='-translate-y-24' ref={root}>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-xl text-darkBlue font-medium font-roboto-text'>
          Why roadmaps?
        </h1>
        <motion.button
          type='button'
          className='flex px-3 mt-4 py-2 text-darkBlue bg-background rounded-md shadow-md text-sm font-roboto-text font-regular border-2 border-darkBlue text-center items-center'
          whileHover={{
            scale: 1.05,
            backgroundColor: '#1A1B50',
            color: '#fff',
            transition: { duration: 0.2 },
          }}
          onHoverStart={handleButtonHover}
          onHoverEnd={handleButtonHover}
        >
          <PlayButtonM size={22} fillCircle={fillCircle} fillPlay={fillPlay} />
          Watch video
        </motion.button>
      </div>

      <div className='px-2 w-full flex justify-center mt-32'>
        <CardsM
          title='Versatile'
          description='In a form of a tree, roadmaps can represent any kind of information hierarchical structure. They can draw logic connections between ideas and allow you to follow a sequence of steps that lead you towards your goals'
          image='versatile'
          animate={fadeInUp}
          variants={fadeInUpAnim}
        />
      </div>
      <motion.div
        className='flex justify-center z-10'
        // initial='hidden'
        // animate={fadeInUp}
        // variants={fadeInUpAnim}
      >
        <div className='relative'>
          <NodesAnimationM width={300} height={200} />
        </div>
      </motion.div>

      <div className='px-2 w-full flex justify-center'>
        <CardsM
          title='Infinite'
          description='Our roadmaps can be infinite! Yeah, that is right, we implemented minecraft-like chunking directly into the roadmaps, allowing for the creation and visualization of infinite amounts of data.'
          image='infinite'
          animate={fadeInUp}
          variants={fadeInUpAnim}
        />
      </div>

      <motion.div
        className='flex justify-center z-10'
        // initial='hidden'
        // animate={fadeInUp}
        // variants={fadeInUpAnim}
      >
        <div className='relative'>
          <NodesAnimationM width={300} height={200} />
        </div>
      </motion.div>

      <div className='px-2 w-full flex justify-center'>
        <CardsM
          title='Intuitive'
          description='Roadmaps are interactive, allowing you to add comments, links, images, videos, and more. You can also share your roadmaps with others and collaborate on them in real-time.'
          image='intuitive'
          animate={fadeInUp}
          variants={fadeInUpAnim}
        />
      </div>
    </motion.div>
  );
};

export default WhyRoadmapsSectionM;
