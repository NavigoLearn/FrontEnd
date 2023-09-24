/* eslint-disable react/no-array-index-key */
import React from 'react';
import { motion } from 'framer-motion';
import BottomSectionState from '@components/home/desktop/components/BottomSectionState';
import useHomeLogic from '@components/home/typescript/useHomeLogic';
import HeroAnimation from './components/HeroAnimation';
import WhyRoadmapsSection from './sections/WhyRoadmapsSection';
import EditorSection from './sections/EditorSection';
import ScrollingElement from './sections/ScrollingElement';

const HomeDesktop = () => {
  const { parallaxNodes, viewCoords, handleMouseMove } = useHomeLogic();

  return (
    <div
      onMouseMove={handleMouseMove}
      className='overflow-x-hidden relative flex items-center justify-center'
    >
      <HeroAnimation parallaxNodes={parallaxNodes} viewCoords={viewCoords} />
      <div className='flex-col mt-28 justify-center items-center w-full'>
        <h1
          className='mx-auto bg-background p-1 rounded-xl text-center items-center w-[650px] xl:w-[650px] 2xl:w-[650px] font-roboto-text text-5xl font-semibold justify-center text-darkBlue'
          style={{
            boxShadow: '0px 0px 64px rgba(255, 255, 255, 1)',
          }}
        >
          Start learning now with free community-made roadmaps
        </h1>
        <h2 className='mx-auto mt-4 text-center items-center w-[400px] xl:w-[500px] xl:text-lg px-4 2xl:w-[600px] 2xl:text-xl text-secondary text-xl font-roboto-text font-normal'>
          Stop the confusing search and get an instant and clear curriculum for
          a specific topic
        </h2>
        <div className='mt-2 w-[500px] mx-auto gap-2 flex flex-row'>
          <motion.a
            type='button'
            href='/roadmap/create'
            className='mx-auto mt-8 px-5 py-2 text-darkBlue bg-transparent rounded-lg shadow-md text-xl font-roboto-text font-semibold border-2 border-darkBlue'
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
            className='mx-auto mt-8 px-5 py-2 text-white bg-primary rounded-lg shadow-md text-xl font-roboto-text font-medium'
            whileHover={{
              backgroundColor: '#1A1B50',
              color: '#fff',
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          >
            Explore roadmaps
          </motion.a>
        </div>
        <WhyRoadmapsSection />
        {/* @ts-ignore */}
        <BottomSectionState>
          {/* @ts-ignore */}
          <EditorSection />
        </BottomSectionState>
        <ScrollingElement />
      </div>
    </div>
  );
};

export default HomeDesktop;
