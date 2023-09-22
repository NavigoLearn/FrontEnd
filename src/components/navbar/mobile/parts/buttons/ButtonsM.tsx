import React from 'react';
import loupeWhite from '@assets/loupe-white.svg';
import homeWhite from '@assets/home-white.svg';
import ProfilePicAndNamePlaceholderM from '../temptesting/ProfilePicAndNamePlaceholderM';

const LoggedButtonsM = () => {
  return (
    <div className='flex flex-col gap-4 mt-12'>
      <div className='flex flex-row'>
        <a
          href='/login'
          className='text-white flex gap-2 items-center text-center text-md font-roboto-text font-normal'
        >
          <img src={loupeWhite} alt='exploreicon' className='w-4 h-4' />
          Explore
        </a>
      </div>
      <div>
        <a
          href='/'
          className='text-white flex gap-2 items-center text-center text-md font-roboto-text font-normal'
        >
          <img src={homeWhite} alt='exploreicon' className='w-4 h-4' />
          Home
        </a>
      </div>
    </div>
  );
};

export default LoggedButtonsM;
