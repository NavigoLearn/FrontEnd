import React from 'react';

const Ball = ({ fill }: { fill: boolean }) => {
  return (
    <div
      className={`rounded-full transition-all duration-200 bg-white flex w-[86px] h-[86px]  justify-center items-center z-10 
      ${fill ? 'opacity-100' : 'opacity-0'}
       `}
    >
      <div
        className={` bg-primary w-14 h-14 transition-all duration-300 rounded-full `}
      />
    </div>
  );
};

export default Ball;
