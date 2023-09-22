import React from 'react';
import { useIsMobile } from '@hooks/useIsMobile';
import ProfileDesktop from '@components/profile/UI/ProfileDesktop';
import ProfileMobile from '@components/profile/UI/ProfileMobile';

type Props = {
  id: string;
};

const Profile = ({ id }: Props) => {
  const mobile = useIsMobile();
  if (mobile === undefined || mobile === null) return null;
  return (
    <div className=''>
      {mobile ? <ProfileMobile id={id} /> : <ProfileDesktop id={id} />}
    </div>
  );
};

export default Profile;
