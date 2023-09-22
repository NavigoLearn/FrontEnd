import React from 'react';

const ProfilePicAndNamePlaceholderM = () => {
  return (
    <div className='relative flex flex-col'>
      <div className='flex flex-row items-center gap-3'>
        <div className='flex w-10 h-10 bg-white rounded-full justify-center' />
        <span className='flex font-medium font-roboto-text text-xl top-12 w-32 text-center px-1 text-white'>
          Eugene
        </span>
      </div>
      <a
        className='flex -translate-y-2 ml-14 font-medium font-roboto-text text-sm text-[#FFFFFF99] text-center'
        href='/profile'
      >
        View profile
      </a>
    </div>
  );
};

export default ProfilePicAndNamePlaceholderM;
