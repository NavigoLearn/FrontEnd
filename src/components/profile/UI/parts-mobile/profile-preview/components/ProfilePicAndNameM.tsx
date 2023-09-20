import React from 'react';
import { useStore } from '@nanostores/react';
import { storeProfileData } from '@components/profile/stores/store-profile-data';

const ProfilePicAndNameM = () => {
  const { data, loading } = useStore(storeProfileData);
  const { profileInfo } = data;
  const { name, avatar } = profileInfo;

  return (
    <div className='relative'>
      <div className='flex flex-col justify-center items-center gap-3'>
        <div className='w-12 h-12 '>
          <img
            src={avatar}
            className='w-full h-full rounded-full'
            alt='avatar'
          />
        </div>
        <span className='font-medium font-kanit-text text-sm absolute top-12 w-32 text-center px-1'>
          {name}
        </span>
      </div>
    </div>
  );
};

export default ProfilePicAndNameM;
