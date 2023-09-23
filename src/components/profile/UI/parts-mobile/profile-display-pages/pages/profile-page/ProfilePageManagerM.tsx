import React, { useState } from 'react';
import ProfilePageEditM from '@components/profile/UI/parts-mobile/profile-display-pages/pages/profile-page/states/ProfilePageEditM';
import ProfilePageViewM from '@components/profile/UI/parts-mobile/profile-display-pages/pages/profile-page/states/ProfilePageViewM';
import { useStore } from '@nanostores/react';
import {
  getIsOwnerOfProfile,
  handleSaveProfileData,
  handleTransferProfileToTemp,
  storeProfileData,
  storeProfileTempData,
} from '@components/profile/stores/store-profile-data';

const ProfilePageManagerM = () => {
  const { loading } = useStore(storeProfileData);
  const [editing, setEditing] = useState(false);
  const owner = getIsOwnerOfProfile();

  if (loading)
    return <div className='text-darkBlue font-roboto-text'>Loading...</div>;

  return (
    <div className='mx-4'>
      {editing ? <ProfilePageEditM /> : <ProfilePageViewM />}
      {owner && (
        <button
          type='button'
          onClick={() => {
            setEditing((prev) => !prev);
            if (editing)
              handleSaveProfileData(storeProfileTempData.get().profileData);
            else {
              handleTransferProfileToTemp();
            }
          }}
          className='fixed bottom-8 border-2 border-darkBlue text-lg text-darkBlue font-roboto-text font-medium bg-background left-1/2 -translate-x-1/2 px-5 py-1 rounded-lg'
        >
          {editing ? 'Save' : 'Edit'}
        </button>
      )}
    </div>
  );
};

export default ProfilePageManagerM;
