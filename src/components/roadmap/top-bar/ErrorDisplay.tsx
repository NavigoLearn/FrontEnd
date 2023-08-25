import React, { useEffect, useRef } from 'react';
import warn from '@assets/warningErr.webp';
import '@styles/globals.css'; // Add this import

const ErrorDisplay = ({ time, message }: { message: string; time: number }) => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // triggers fade out after some time
    setTimeout(() => {
      root.current.classList.add('fadeOutAnimation');
    }, time - 500);
  }, []);

  return (
    <div
      ref={root}
      className='w-72 bg-red-100 rounded-md flex relative fadeInAnimation select-none z-20 '
    >
      <div className='absolute h-full w-1 bg-red-800 rounded-md ' />
      <div className=' w-8 relative  '>
        <img
          draggable='false'
          src={warn}
          className='absolute top-4 left-4'
          width='20'
          height='20'
          alt=''
        />
      </div>
      <div className='w-full ml-7 mt-1 mr-1 mb-4  '>
        <div className='mt-2 font-semibold  text-sm font-roboto-text  text-red-800 '>
          Warning
        </div>
        <div className='text-xs mt-2 font-roboto-text text-red-600'>
          {message}
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
