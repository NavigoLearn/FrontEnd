import React from 'react';
import wave from '@assets/wavesNegative.svg';

const MyComponent = () => {
  return (
    <>
      <div className='mt-40 relative'>
        <div className='bg-[#cfeefc] absolute w-full h-[300px] top-[-160px] -z-20' />
      </div>
      <img draggable="false"
        src={wave}
        alt='WaveBackground'
        className='absolute -z-10 bg-[#cfeefc] h-36 w-full'
      />
    </>
  );
};

export default MyComponent;