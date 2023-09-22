import React from 'react';
import { useStore } from '@nanostores/react';
import { storeProfileData } from '@src/components/profile/stores/store-profile-data';

const ProfilePicAndNameNavM = () => {
  const { data, loading } = useStore(storeProfileData);
  const { profileInfo } = data;
  const { name, avatar } = profileInfo;

  return (
    <div className='relative flex flex-col'>
      <div className='flex flex-row items-center gap-3'>
        <div className='flex w-10 h-10 justify-center'>
          <img
            src={avatar}
            className='w-full h-full rounded-full'
            alt='avatar'
          />
        </div>
        <span className='flex font-medium font-roboto-text text-xl top-12 w-32 text-center px-1 text-white'>
          {name}
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

export default ProfilePicAndNameNavM;
