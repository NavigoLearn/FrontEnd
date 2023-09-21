import React from 'react';
import githubLogo from '@assets/githublogo.png';

const GithubLoginButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type='button'
      className='flex rounded-sm relative justify-start w-60  bg-[#171515] p-1 border-2 border-transparent'
      onClick={onClick}
    >
      <div className=' p-2 h-full  flex justify-start items-center'>
        <div className='w-6 h-6 flex justify-center items-center'>
          <img
            draggable='false'
            alt='github octocat image'
            src={githubLogo.src}
            className='w-full h-full select-none'
          />
        </div>
      </div>
      <div className='absolute top-0 left-0 w-full  h-full'>
        <div className='flex w-full h-full items-center justify-center'>
          <span className='text-white font-medium font-roboto-text text-lg select-none'>
            Github
          </span>
        </div>
      </div>
    </button>
  );
};

export default GithubLoginButton;
