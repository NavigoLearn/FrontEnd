import React from 'react';
import googleLogo from '@assets/googleLogo.svg';

const GoogleLoginButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type='button'
      className='flex rounded-lg relative justify-start w-72 h-14 bg-white shadow-standard  '
      onClick={onClick}
    >
      <div className='w-20 h-full  flex justify-center items-center'>
        <div className='w-8 h-8 flex justify-center items-center'>
          <img draggable="false" alt='' src={googleLogo} className='w-full h-full select-none ' />
        </div>
      </div>
      <div className='absolute w-full flex justify-center items-center h-full'>
        <div className='text-main font-semibold text-xl select-none '>
          Google
        </div>
      </div>
    </button>
  );
};

export default GoogleLoginButton;
