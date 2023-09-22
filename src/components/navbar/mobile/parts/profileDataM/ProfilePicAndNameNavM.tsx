import React from 'react';
import { useStore } from '@nanostores/react';
import { storeProfileData } from '@src/components/profile/stores/store-profile-data';
import storeLoggedUser from '@src/store/user/store-logged-user';

const ProfilePicAndNameNavM = () => {
  const { profilePictureUrl, name } = useStore(storeLoggedUser);

  return (
    <div className='relative flex flex-col mb-12'>
      <div className='flex flex-row items-center gap-3'>
        <div className='flex w-10 h-10 justify-center'>
          <img
            src={profilePictureUrl}
            className='w-full h-full rounded-full'
            alt='avatar'
          />
        </div>
        <span className='flex font-medium font-roboto-text text-xl top-12 w-32 text-center px-1 text-white truncate'>
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
