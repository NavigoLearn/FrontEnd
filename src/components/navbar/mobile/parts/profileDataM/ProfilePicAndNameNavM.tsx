import React from 'react';
import { useStore } from '@nanostores/react';
import { storeProfileData } from '@src/components/profile/stores/store-profile-data';
import storeLoggedUser from '@src/store/user/store-logged-user';

const ProfilePicAndNameNavM = () => {
  const { profilePictureUrl, name } = useStore(storeLoggedUser);

  return (
    <div className='relative flex flex-col mb-12'>
      <div className='flex flex-row items-center gap-3'>
        <div className='flex w-[10vw] h-[10vw] justify-center'>
          <img
            src={profilePictureUrl}
            className='w-full h-full rounded-full'
            alt='avatar'
          />
        </div>
        <p className='inline-block font-medium font-roboto-text text-[5vw] top-12 w-[30vw] text-start px-1 text-white text-ellipsis whitespace-nowrap overflow-hidden h-[8vw]'>
          {name}
        </p>
      </div>
      <a
        className='flex -translate-y-2 ml-14 font-light font-roboto-text text-[4vw] text-[#FFFFFF99] text-center'
        href='/profile'
      >
        View profile
      </a>
    </div>
  );
};

export default ProfilePicAndNameNavM;
