import React from 'react';
import useProfileData from '@components/profile/hooks/useProfileData';
import ProfilePreviewM from '@components/profile/UI/parts-mobile/profile-preview/ProfilePreviewM';
import ProfileButtonsManagerM from '@components/profile/UI/parts-mobile/profile-buttons/ProfileButtonsManagerM';
import ProfileDisplayManagerM from '@components/profile/UI/parts-mobile/profile-display-pages/ProfileDisplayManagerM';

type Props = {
  id: string;
};

const ProfileMobile = ({ id }: Props) => {
  useProfileData(id);

  return (
    <div>
      <ProfilePreviewM />
      <hr className='w-full h-[2px] bg-placeholderBlack mt-12' />
      <ProfileButtonsManagerM />
      <ProfileDisplayManagerM />
    </div>
  );
};

export default ProfileMobile;
