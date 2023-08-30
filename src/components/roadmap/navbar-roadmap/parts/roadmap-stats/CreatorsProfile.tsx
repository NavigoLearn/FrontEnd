import React from 'react';

const CreatorsProfile = () => {
  return (
    <div className='flex gap-2 items-center'>
      <h4 className='text-placeholder font-roboto-text text-sm font-medium'>
        Made by
      </h4>
      <button type='button' className=''>
        <img />
        <div className='rounded-full bg-gray-300 font-semibold font-roboto-text w-10 h-10 flex justify-center items-center shadow-sm'>
          S
        </div>
      </button>
    </div>
  );
};

export default CreatorsProfile;
