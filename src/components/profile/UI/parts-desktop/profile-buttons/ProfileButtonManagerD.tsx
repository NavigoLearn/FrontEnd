import React from 'react';
import {
  getProfilePage,
  profilePagesArray,
  setProfilePage,
  storeSelectedProfilePage,
} from '@components/profile/stores/store-selected-profile-page';
import ProfileButtonD from '@components/profile/UI/parts-desktop/profile-buttons/components/ProfileButtonD';
import { useStore } from '@nanostores/react';

const ProfileButtonManagerD = () => {
  useStore(storeSelectedProfilePage);
  function firstLetterUpperCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className='flex flex-col gap-1'>
      {profilePagesArray.map((page) => {
        const selected = page === getProfilePage();
        return (
          <ProfileButtonD
            selected={selected}
            key={page}
            name={firstLetterUpperCase(page)}
            callback={() => {
              setProfilePage(page);
            }}
          />
        );
      })}
    </div>
  );
};

export default ProfileButtonManagerD;
