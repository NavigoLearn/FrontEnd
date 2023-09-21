import React, { useEffect, useState } from 'react';
import userStatus from '@store/user/user-status';
import { useStore } from '@nanostores/react';

const Links = () => {
  // get logged user from userStatus.isLogged and make reactive
  const { isLogged } = useStore(userStatus);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // avoid ssr error
    setHydrated(true);
  }, [isLogged]);

  return (
    <div className='flex flex-row justify-center gap-6 mt-4'>
      <a
        href='/feedback'
        className='font-roboto-text text-normal text-white text-md text-center hover:underline hover:underline-offset-4 select-none'
      >
        {' '}
        Feedback
      </a>
      <a
        href='/explore'
        className='font-roboto-text text-normal text-white text-md text-center hover:underline hover:underline-offset-4 select-none'
      >
        {' '}
        Explore
      </a>
      <a
        href='/home'
        className='font-roboto-text text-normal text-white text-md text-center hover:underline hover:underline-offset-4 select-none'
      >
        {' '}
        Home
      </a>
      {hydrated && isLogged ? (
        <a
          href='/profile'
          className='font-roboto-text text-normal text-white text-md text-center hover:underline hover:underline-offset-4 select-none'
        >
          {' '}
          Profile
        </a>
      ) : (
        <a
          href='/login'
          className='font-roboto-text text-normal text-white text-md text-center hover:underline hover:underline-offset-4 select-none'
        >
          {' '}
          Login
        </a>
      )}
    </div>
  );
};

export default Links;
