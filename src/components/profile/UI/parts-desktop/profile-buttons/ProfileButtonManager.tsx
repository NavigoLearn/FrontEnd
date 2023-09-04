import React from 'react';
import {
  getProfilePage,
  profilePagesArray,
  setProfilePage,
  storeProfilePages,
} from '@components/profile/stores/store-profile-pages';
import ProfileButton from '@components/profile/UI/parts-desktop/profile-buttons/components/ProfileButton';
import { useStore } from '@nanostores/react';

const ProfileButtonManager = () => {
  useStore(storeProfilePages);
  return (
    <div className='flex flex-col gap-1'>
      {profilePagesArray.map((page) => {
        const selected = page === getProfilePage();
        return (
          <ProfileButton
            selected={selected}
            key={page}
            name={page}
            callback={() => {
              setProfilePage(page);
            }}
          />
        );
      })}
    </div>
  );
};

export default ProfileButtonManager;
