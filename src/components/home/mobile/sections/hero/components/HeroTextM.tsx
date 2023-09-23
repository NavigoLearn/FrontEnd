import React from 'react';
import { motion } from 'framer-motion';

const HeroTextM = () => {
  return (
    <div className='flex-col justify-center items-center w-full'>
      <h1
        className='mx-2 bg-background font-roboto-text text-xl font-semibold text-darkBlue  text-center'
        style={{
          boxShadow: '0px 0px 64px rgba(255, 255, 255, 1)',
        }}
      >
        Start learning now with free community-made roadmaps
      </h1>
      <h2 className='mx-auto mt-4 text-center items-center  px-4 text-secondary text-sm font-roboto-text font-normal'>
        Stop the confusing search and get an instant and clear curriculum for a
        specific topic
      </h2>
      <div className='mt-2 flex flex-col'>
        <motion.a
          type='button'
          href='/explore'
          className='mx-auto mt-8 px-4 py-1.5 text-white bg-primary rounded-md shadow-md text-sm font-roboto-text font-medium border-2 border-primary'
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
    </div>
  );
};

export default HeroTextM;
