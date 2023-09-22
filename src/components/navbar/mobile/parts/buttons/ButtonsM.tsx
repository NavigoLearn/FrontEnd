import React, { useState } from 'react';
import loupeWhite from '@assets/loupe-white.svg';
import homeWhite from '@assets/home-white.svg';
import AuthPopupM from '../authPopupM/AuthPopupM';

const LoggedButtonsM = ({ isLogged }: { isLogged: boolean }) => {
  const [authPopup, setAuthPopup] = useState(false);

  const handleAuthClick = () => {
    setAuthPopup((prev) => !prev);
  };
  return (
    <div className='flex flex-col gap-4 mt-12'>
      {!isLogged && (
        <div className='flex flex-row'>
          <button
            type='button'
            onClick={handleAuthClick}
            className='text-white flex gap-2 items-center text-center text-md font-roboto-text font-normal'
          >
            Get Started
          </button>
          {authPopup && <AuthPopupM toggleAuth={handleAuthClick} isInNav />}
        </div>
      )}
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
