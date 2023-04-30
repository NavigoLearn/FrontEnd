import React from 'react';
import ProfileDisplay from '@components/profile/desktop/ProfileDisplay';
import CardDisplay from '@components/profile/desktop/CardDisplay';

const DesktopProfile = () => {
  return (
    <div className='flex flex-col w-full h-full justify-center items-center '>
      <div className='flex flex-col gap-10 justify-center items-center mx-auto w-full h-full my-40'>
        <div className='flex w-10/12 shadow-xl bg-white relative rounded-3xl min-h-10/12'>
          <ProfileDisplay />
        </div>
        <div className='flex justify-center items-center mt-13 font-roboto-text text-4xl'>
          <CardDisplay />
        </div>
      </div>
    </div>
  );
};

export default DesktopProfile;
