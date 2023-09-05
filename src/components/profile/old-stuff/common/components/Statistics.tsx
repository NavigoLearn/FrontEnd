import React from 'react';
import dizaign from '@assets/dizaign.svg';

const Statistics = ({ roadmapsCount }: { roadmapsCount: number }) => {
  return (
    <div className='flex flex-col md:flex-row w-full justify-center items-center mt-10 md:mt-0 md:justify-around '>
      <div className='flex w-fit flex-col items-center'>
        <div className='flex'>
          <h1 className='font-normal text-secondary text-center text-[16px] font-roboto-text'>
            Created Roadmaps
          </h1>
        </div>
        <div className='flex'>
          <img draggable="false" src={dizaign} className='flex select-none' alt='line' />
          <h2 className='text-xl font-normal mx-4 text-center font-roboto-text'>
            {roadmapsCount}
          </h2>
          <img draggable="false" src={dizaign} className='flex select-none' alt='line' />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
