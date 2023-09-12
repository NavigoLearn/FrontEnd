import React from 'react';
import circledot from '@assets/circledot.svg';

const Issue = ({ title, author }: { title: string; author: string }) => {
  return (
    <div className='w-full flex my-6 relative'>
      <div className='w-10 h-10 '>
        <img draggable="false" src={circledot} alt='issue icon' />
      </div>
      <div>
        <div className='font-semibold font-roboto-text text-main text-sm md:text-base w-full'>
          {title}
        </div>
        <div className='font-medium font-roboto-text text-secondary text-sm mt-1'>
          by {author}
        </div>
      </div>
      <div className='absolute right-0 h-full'>
        <button
          type='button'
          className=' text-placeholder font-normal text-xs flex items-center h-full'
          onClick={() => {
            // adding issue login
          }}
        >
          archive
        </button>
      </div>
    </div>
  );
};

export default Issue;
