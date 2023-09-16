import React from 'react';
import ProfilePreviewD from '@components/profile/UI/parts-desktop/profile-preview/ProfilePreviewD';
import ProfileButtonManagerD from '@components/profile/UI/parts-desktop/profile-buttons/ProfileButtonManagerD';
import ProfileDisplayManagerD from '@components/profile/UI/parts-desktop/profile-display-pages/ProfileDisplayManagerD';
import useProfileData from '../hooks/useProfileData';

type Props = {
  id: string;
};
const ProfileDesktop = ({ id }: Props) => {
  useProfileData(id);

  return (
    <div className='w-full flex justify-center mt-20 '>
      <div className='  max-w-[1200px]'>
        <div className='flex justify-start relative pb-4'>
          <ProfilePreviewD />
          <hr className='w-full h-[1.5px] bg-gray-300 absolute bottom-0 -left-0' />
        </div>
        <div className='flex h-full'>
          <ProfileButtonManagerD />
          <hr className='w-[1px] h-full  bg-gray-300 ' />
          <ProfileDisplayManagerD />
        </div>
      </div>
    </div>
  );
};

export default ProfileDesktop;
