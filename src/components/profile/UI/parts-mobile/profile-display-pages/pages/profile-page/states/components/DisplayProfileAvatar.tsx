import React from 'react';
import { getProfileInfoAvatar } from '@components/profile/stores/store-selected-profile-page';

const DisplayProfileAvatarM = () => {
  return (
    <div className='flex justify-center items-center w-full flex-col gap-3 mt-8'>
      <h3 className='text-secondary text-md'>Profile picture</h3>
      <div>
        <div className='w-32 h-32'>
          <img
            alt='profile picture'
            className='w-full rounded-full h-full'
            src={getProfileInfoAvatar()}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayProfileAvatarM;
