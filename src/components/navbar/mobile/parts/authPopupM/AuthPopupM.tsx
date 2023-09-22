import GithubLoginButton from '@src/components/auth/old/social-buttons/GithubLoginButton';
import GoogleLoginButton from '@src/components/auth/old/social-buttons/GoogleLoginButton';
import {
  handleGitHubLogin,
  handleGoogleLogin,
} from '@src/components/auth/old/socialAuth';
import dropclose from '@assets/cross.svg';
import React from 'react';

const AuthPopupM = ({ toggleAuth }: { toggleAuth: () => void }) => {
  return (
    <div className='bg-[#1A1B504D] top-0 left-0 z-50 flex justify-center items-center w-screen h-screen fixed'>
      <div className='h-80 mx-6 bg-white w-full mb-32 border-t-primary border-t-8 rounded-md relative'>
        <h2 className='text-2xl font-medium font-roboto-text w-full flex justify-center mt-6 '>
          Get started now
        </h2>
        <div className='flex justify-center mt-2 w-full'>
          <span className='text-md font-normal font-roboto-text text-placeholder text-center w-3/4 '>
            If you don't have an account we will create one for you !
          </span>
        </div>
        <section className='absolute w-6 h-6 top-2 right-2'>
          <button
            className='w-full h-full opacity-30 hover:opacity-100'
            type='button'
            onClick={() => {
              toggleAuth();
            }}
          >
            <img alt='close' src={dropclose} className='w-full h-full' />
          </button>
        </section>

        <div className='gap-2.5 mt-8 w-full flex flex-col justify-center items-center'>
          <GoogleLoginButton onClick={handleGoogleLogin} />
          <GithubLoginButton onClick={handleGitHubLogin} />
        </div>
      </div>
    </div>
  );
};

export default AuthPopupM;
