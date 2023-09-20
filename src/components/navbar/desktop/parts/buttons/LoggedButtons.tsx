import React from 'react';
import Button from '@components/navbar/desktop/parts/buttons/Button';
import ProfileDropdown from '@components/navbar/desktop/parts/profile/ProfileDropdown';
import { useStore } from '@nanostores/react';
import storeLoggedUser from '@store/user/store-logged-user';

const LoggedButtons = () => {
  const { profilePictureUrl } = useStore(storeLoggedUser);
  return (
    <div className='flex gap-8 mr-3 items-center'>
      <Button
        hasUnder
        name='Create roadmap'
        buttonData={{
          type: 'link',
          href: '/roadmap/create',
        }}
      />
      <ProfileDropdown profilePictureUrl={profilePictureUrl} />
    </div>
  );
};

export default LoggedButtons;
