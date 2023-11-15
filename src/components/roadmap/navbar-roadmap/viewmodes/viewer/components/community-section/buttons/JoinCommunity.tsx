import React from 'react';
import { Globe2 } from 'lucide-react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils.ts';

const JoinCommunity = () => {
  return (
    <a
      href='https://discord.com/invite/3Fn35h8cY9'
      target='_blank'
      rel='noreferrer'
      className={`flex gap-2 items-center p-2 hover:bg-gray-200 ${tailwindTransitionClass}`}
    >
      <Globe2 size={22} className='opacity-60' />
      <div className='font-roboto-text font-medium text-base'>Join Discord</div>
    </a>
  );
};

export default JoinCommunity;
