import React from 'react';
import discord from '@assets/discord.svg';
import github from '@assets/github.svg';
import gmail from '@assets/gmail.svg';

const Socials = () => {
  return (
    <div className='mt-10 flex flex-col'>
      <h1 className='text-center text-2xl font-kanit-text font-medium text-eugene'>
        Connect with us through our
      </h1>
      <div className='mt-5 flex flex-col md:flex-row gap-2 md:gap-20 justify-center text-center items-center'>
        {/* disabled eslint for this anchor because WE DONT HAVE A SERVER !!!!!!!! */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          // insert discord server link here
          href='https://discord.gg/Y3sEfxGtGJ'
          target='_blank'
          className='w-20 text-placeholder font-kanit-text md:translate-y-12'
          rel='noreferrer'
        >
          discord
          <img
            draggable='false'
            src={discord.src}
            alt='discord'
            className='w-full h-full mt-6 select-none'
          />
        </a>
        <a
          href='https://github.com/NavigoLearn'
          target='_blank'
          rel='noreferrer'
          className='w-32 text-placeholder font-kanit-text'
        >
          github organization
          <img
            draggable='false'
            src={github.src}
            alt='github'
            className='mt-6 w-full h-full select-none'
          />
        </a>
        <a
          href='mailto:navigolearn@gmail.com'
          className='w-20 text-placeholder font-kanit-text md:translate-y-12'
        >
          email
          <img
            draggable='false'
            src={gmail.src}
            alt='gmail'
            className='flex md:mt-6 w-full h-full select-none'
          />
        </a>
      </div>
    </div>
  );
};

export default Socials;
