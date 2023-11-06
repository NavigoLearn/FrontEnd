import React from 'react';
import { Star } from 'lucide-react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils.ts';

const StarUsGithub = () => {
  return (
    <a
      type='button'
      className='border-2 border-gray-300 flex items-center px-2 py-1 gap-2 group pointer-events-auto hover:border-black'
      href='https://github.com/NavigoLearn/NavigoLearn-MonoRepo'
      target='_blank'
      rel='noreferrer'
    >
      <Star size={24} className='opacity-60 group-hover:opacity-100' />
      <span
        className={`font-roboto-text text-secondary font-medium group-hover:text-black `}
      >
        Star on github
      </span>
    </a>
  );
};

export default StarUsGithub;
