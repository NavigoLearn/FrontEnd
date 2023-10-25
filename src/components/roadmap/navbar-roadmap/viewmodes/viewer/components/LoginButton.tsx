import React from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils.ts';
import { requestButton } from '@components/roadmap/navbar-roadmap/buttons/buttons-arrays/buttons-requester.ts';

const LoginButton = () => {
  const loginButton = requestButton('get-started');

  return (
    <div className='flex items-center'>
      <button
        type='button'
        onClick={() => {
          loginButton.callback();
        }}
        className={`px-3 py-1 mx-1 text-darkBlue font-roboto-text font-medium hover:bg-gray-200 ${tailwindTransitionClass}`}
      >
        Login
      </button>
      <span className='text-placeholder font-roboto-text text-sm  hidden 2xl:block -translate-x-1 '>
        ( unlock upvotes, progress tracking and more)
      </span>
    </div>
  );
};

export default LoginButton;
