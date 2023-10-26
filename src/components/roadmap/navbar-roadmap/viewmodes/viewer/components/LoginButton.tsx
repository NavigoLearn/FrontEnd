import React from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils.ts';
import { requestButton } from '@components/roadmap/navbar-roadmap/viewmodes/owner/components/buttons-arrays/buttons-requester.ts';
import { User2 } from 'lucide-react';

const LoginButton = () => {
  const loginButton = requestButton('get-started');

  return (
    <div className='relative'>
      <div className='flex items-center gap-2'>
        <button
          type='button'
          onClick={() => {
            loginButton.callback();
          }}
          className='px-2 py-1 hover:bg-gray-200 flex items-center gap-2 '
        >
          <User2 size={22} />
          <span
            className={` text-darkBlue font-roboto-text font-medium  ${tailwindTransitionClass}`}
          >
            Login
          </span>
        </button>
        <span className='text-placeholder font-roboto-text text-sm  hidden 2xl:block -translate-x-1 '>
          ( unlock upvotes, progress tracking and more)
        </span>
      </div>
    </div>
  );
};

export default LoginButton;
