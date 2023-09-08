import React from 'react';
import { useIsMobile } from '@hooks/useIsMobile';
import ProfileDesktop from '@components/profile/UI/ProfileDesktop';

const Profile = () => {
  const mobile = useIsMobile();
  console.log(mobile, 'is mobile js');
  return (
    <div className='relative pointer-events-auto z-10 '>
      {mobile !== null && (
        <div>{mobile ? <div>Mobile</div> : <ProfileDesktop />}</div>
      )}
    </div>
  );
};

export default Profile;
