import React from 'react';
import ProfilePreview from '@components/profile/UI/parts-desktop/profile-preview/ProfilePreview';
import ProfileButtonManager from '@components/profile/UI/parts-desktop/profile-buttons/ProfileButtonManager';
import ProfileDisplayManager from '@components/profile/UI/parts-desktop/profile-display-pages/ProfileDisplayManager';

const ProfileDesktop = () => {
  return (
    <div className='w-full flex justify-center mt-20 '>
      <div className='  max-w-[1200px]'>
        <div className='flex justify-start relative pb-4'>
          <ProfilePreview />
          <hr className='w-full h-[1.5px] bg-gray-300 absolute bottom-0 -left-0' />
        </div>
        <div className='flex h-full'>
          <ProfileButtonManager />
          <hr className='w-[1px] h-full  bg-gray-300 ' />
          <ProfileDisplayManager />
        </div>
      </div>
    </div>
  );
};

export default ProfileDesktop;
