import React from 'react';
import githublogo from '@assets/githublogo.png';

const GithubLoginButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type='button'
      className='flex rounded-lg relative justify-start w-72 h-14 bg-[#171515]  '
      onClick={onClick}
    >
      <div className='w-20 h-full  flex justify-center items-center'>
        <div className='w-8 h-8 flex justify-center items-center'>
          <img draggable="false" alt='' src={githublogo} className='w-full h-full select-none' />
        </div>
      </div>
      <div className='absolute w-full flex justify-center items-center h-full'>
        <div className='text-white font-semibold text-xl select-none'>
          Github
        </div>
      </div>
    </button>
  );
};

export default GithubLoginButton;
