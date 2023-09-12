import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import {
  storeProfilePages,
  setProfilePageEditing,
} from '@src/components/profile/stores/store-profile-pages';
import {
  getOwnProfile,
  getProfileDataLoading,
  profileDataStore,
} from '@src/components/profile/stores/store-profile-data';
import { get } from 'http';
import ProfilePageView from './ProfilePageView';
import ProfilePageEdit from './ProfilePageEdit';

const ProfilePageManager = () => {
  const { isEditing } = useStore(storeProfilePages);
  const { ownProfile } = useStore(profileDataStore);
  //   console.log(getOwnProfile());

  return (
    <div className='ml-14 mt-6'>
      <div className='flex justify-between'>
        <div>
          <h1 className='text-4xl monitor:text-5xl text-darkBlue font-roboto-text font-medium'>
            Profile
          </h1>
          <h6 className='text-lg monitor:text-xl font-roboto-text text-placeholder'>
            Update your profile details below
          </h6>
        </div>
        {ownProfile && (
          <button
            className='text-lg font-roboto-text text-darkBlue mr-10'
            type='button'
            onClick={() => setProfilePageEditing(!isEditing)}
          >
            {isEditing ? 'Switch to View' : 'Switch to Edit'}
          </button>
        )}
      </div>
      {isEditing ? <ProfilePageEdit /> : <ProfilePageView />}
    </div>
  );
};

export default ProfilePageManager;
