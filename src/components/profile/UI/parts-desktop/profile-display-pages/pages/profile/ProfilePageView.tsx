import React, { useEffect, useState } from 'react';
import ProfilePicture from '@components/profile/UI/parts-desktop/profile-display-pages/pages/profile/components/ProfilePicture';
import InputComponent from '@components/profile/UI/parts-desktop/profile-display-pages/pages/profile/components/InputComponent';
import TextComponent from '@components/roadmap/pages-roadmap/editor/editor-pages/components-page/components/TextComponent';
import TextareaComponent from '@components/profile/UI/parts-desktop/profile-display-pages/pages/profile/components/TextareaComponent';
import useProfileData from '@src/components/profile/hooks/useProfileData';
import {
  getProfileInfoAvatar,
  getProfileInfoBio,
  getProfileInfoGithubLinked,
  getProfileInfoGithubUrl,
  getProfileInfoName,
  getProfileInfoWebsiteUrl,
} from '@src/components/profile/stores/store-profile-pages';
import {
  getProfileDataLoading,
  profileDataStore,
} from '@src/components/profile/stores/store-profile-data';
import { useStore } from '@nanostores/react';

const ProfilePageView = () => {
  const { loading } = useStore(profileDataStore);

  return (
    <div>
      <div className='mt-7'>
        {getProfileDataLoading() ? (
          <div className='text-sm font-roboto-text text-darkBlue'>
            loading...
          </div>
        ) : (
          <ProfilePicture src={getProfileInfoAvatar()} />
        )}
      </div>
      <section className='flex flex-col gap-3 mt-16'>
        <div>
          <div className='text-secondary font-roboto-text'>Name</div>
          <div>
            {getProfileDataLoading() ? (
              <div className='text-sm font-roboto-text text-darkBlue'>
                loading...
              </div>
            ) : (
              <div className='text-lg font-roboto-text text-darkBlue'>
                {getProfileInfoName() || 'No name yet'}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className='text-secondary font-roboto-text'>Github</div>
          <div>
            {getProfileDataLoading() ? (
              <div className='text-sm font-roboto-text text-darkBlue'>
                loading...
              </div>
            ) : (
              <div className='text-lg font-roboto-text text-darkBlue'>
                {getProfileInfoGithubUrl() || 'No github yet'}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className='text-secondary font-roboto-text'>Website</div>
          <div>
            {getProfileDataLoading() ? (
              <div className='text-sm font-roboto-text text-darkBlue'>
                loading...
              </div>
            ) : (
              <div className='text-lg font-roboto-text text-darkBlue'>
                {getProfileInfoWebsiteUrl() || 'No website yet'}
              </div>
            )}
          </div>
        </div>
        <div>
          <div className='text-secondary font-roboto-text'>Bio</div>
          <div>
            {getProfileDataLoading() ? (
              <div className='text-sm font-roboto-text text-darkBlue'>
                loading...
              </div>
            ) : (
              <div className='text-lg font-roboto-text text-darkBlue'>
                {getProfileInfoBio() || 'No bio yet'}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePageView;
