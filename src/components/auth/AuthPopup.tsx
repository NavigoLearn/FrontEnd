import React from 'react';
import GithubLoginButton from '@components/auth/old/social-buttons/GithubLoginButton';
import {
  handleGitHubLogin,
  handleGoogleLogin,
} from '@components/auth/old/socialAuth';
import GoogleLoginButton from '@components/auth/old/social-buttons/GoogleLoginButton';
import { CLOSE_SVG_SRC } from '@src/to-be-organized/svg-params';

type IAuthPopupProps = {
  closeCallback: () => void;
  additionalData: string;
};
const AuthPopup = ({ closeCallback, additionalData }: IAuthPopupProps) => {
  return (
    <div className='relative bg-white w-72 pb-6 border-t-8 border-t-primary rounded-lg'>
      <h2 className='text-2xl font-medium font-roboto-text w-full flex justify-center mt-6 '>
        Get started now
      </h2>
      <div className='flex justify-center mt-2 w-full'>
        <span className='text-sm font-roboto-text text-placeholder text-center w-3/4 '>
          {additionalData}
        </span>
      </div>

      <section className='absolute w-6 h-6 top-3.5 right-2'>
        <button
          className='w-full h-full opacity-30 hover:opacity-100'
          type='button'
          onClick={() => {
            closeCallback();
          }}
        >
          <img src={CLOSE_SVG_SRC.src} className='w-full h-full' />
        </button>
      </section>

      <div className='gap-2.5 mt-16 w-full flex flex-col justify-center items-center'>
        <GithubLoginButton
          onClick={() => {
            handleGitHubLogin();
            closeCallback();
          }}
        />
        <GoogleLoginButton
          onClick={() => {
            handleGoogleLogin();
            closeCallback();
          }}
        />
      </div>
    </div>
  );
};

export default AuthPopup;
