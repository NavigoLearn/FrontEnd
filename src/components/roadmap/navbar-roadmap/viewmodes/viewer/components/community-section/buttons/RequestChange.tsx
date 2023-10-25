import React from 'react';
import { MessageCircle } from 'lucide-react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils.ts';

const JoinCommunity = () => {
  return (
    <div
      className={`flex gap-2 items-center p-2 hover:bg-gray-200${tailwindTransitionClass}`}
    >
      <MessageCircle size={22} className='opacity-60' />
      <div className='font-roboto-text font-medium text-base'>
        Request change
      </div>
    </div>
  );
};

export default JoinCommunity;
