import React from 'react';
import googleLogo from '@assets/googleLogo.svg';

const GoogleLoginButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type='button'
      className='flex rounded-sm relative justify-start w-60 bg-white p-1  border-2 border-placeholderBlack'
      onClick={onClick}
    >
      <div className=' p-2 h-full  flex justify-start items-center'>
        <div className='w-6 h-6 flex justify-center items-center'>
          <img
            draggable='false'
            alt='google logo'
            src={googleLogo.src}
            className='w-full h-full select-none'
          />
        </div>
      </div>
      <div className='absolute top-0 left-0 w-full  h-full'>
        <div className='flex w-full h-full items-center justify-center'>
          <span className='text-black font-medium font-roboto-text text-lg select-none'>
            Google
          </span>
        </div>
      </div>
    </button>
  );
};

export default GoogleLoginButton;
