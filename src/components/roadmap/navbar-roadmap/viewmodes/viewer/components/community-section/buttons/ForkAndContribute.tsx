import React from 'react';
import { GitPullRequest } from 'lucide-react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils.ts';

const ForkAndContribute = () => {
  return (
    <div className='relative'>
      <div
        className={`flex gap-2 items-center p-2 hover:bg-gray-200${tailwindTransitionClass}`}
      >
        <GitPullRequest size={22} className='opacity-30' />
        <div className='font-roboto-text font-medium text-base opacity-60 relative'>
          Fork and contribute
          <div className='text-xs text-center w-40 text-placeholder -bottom-4 absolute left-1/2 -translate-x-1/2'>
            (coming soon)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForkAndContribute;
