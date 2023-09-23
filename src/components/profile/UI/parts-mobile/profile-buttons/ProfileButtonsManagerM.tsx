import React from 'react';
import { useStore } from '@nanostores/react';
import {
  storeSelectedProfilePage,
  profilePagesArray,
  getProfilePage,
  setProfilePage,
} from '@components/profile/stores/store-selected-profile-page';
import ProfileButtonM from '@components/profile/UI/parts-mobile/profile-buttons/components/ProfileButtonM';

const ProfileButtonsManagerM = () => {
  useStore(storeSelectedProfilePage);
  function firstLetterUpperCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className='flex justify-center items-center gap-3 mt-3'>
      {profilePagesArray.map((page) => {
        const selected = page === getProfilePage();
        return (
          <ProfileButtonM
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

export default ProfileButtonsManagerM;
