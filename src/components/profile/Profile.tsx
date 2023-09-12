import React from 'react';
import { useIsMobile } from '@hooks/useIsMobile';
import ProfileDesktop from '@components/profile/UI/ProfileDesktop';

const Profile = (id) => {
  const mobile = useIsMobile();
  if (mobile === null) return null;
  return (
    <div className=''>
      {mobile ? <div>Mobile</div> : <ProfileDesktop id={id} />}
    </div>
  );
};

export default Profile;
