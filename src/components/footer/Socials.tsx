import React from 'react';
import discord from '@assets/discord-footer.svg';
import github from '@assets/github-footer.svg';
import gmail from '@assets/gmail-footer.svg';

const Socials = () => {
  return (
    <div className='flex flex-col mt-4'>
      <div className=' md:gap-10 flex gap-4 flex-row justify-center text-center items-center'>
        {/* disabled eslint for this anchor because WE DONT HAVE A SERVER !!!!!!!! */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          // insert discord server link here
          href='https://discord.gg/Y3sEfxGtGJ'
          target='_blank'
          className='text-placeholder font-kanit-text select-none'
          rel='noreferrer'
        >
          <img src={discord.src} alt='discord' className='w-6 h-6 ' />
        </a>
        <a
          href='https://github.com/NavigoLearn'
          target='_blank'
          rel='noreferrer'
          className='text-placeholder font-kanit-text select-none'
        >
          <img
            src={github.src}
            alt='github'
            className='w-6 h-6 translate-y-2'
          />
        </a>
        <a
          href='mailto:navigolearn@gmail.com'
          className='text-placeholder font-kanit-text select-none'
        >
          <img src={gmail.src} alt='gmail' className='w-6 h-6 ' />
        </a>
      </div>
    </div>
  );
};

export default Socials;
