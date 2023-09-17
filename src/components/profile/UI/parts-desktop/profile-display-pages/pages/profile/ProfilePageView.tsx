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
} from '@components/profile/stores/store-selected-profile-page';
import {
  getProfileDataLoading,
  storeProfileData,
} from '@src/components/profile/stores/store-profile-data';
import { useStore } from '@nanostores/react';

const ProfilePageView = () => {
  const { loading } = useStore(storeProfileData);

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
      <section className='flex flex-col gap-5 mt-16'>
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
        <div className='break-words w-96'>
          <div className='text-secondary font-roboto-text'>Github</div>
          <div>
            {getProfileDataLoading() ? (
              <div className='text-sm font-roboto-text text-darkBlue'>
                loading...
              </div>
            ) : (
              <a
                href={getProfileInfoGithubUrl()}
                className='text-lg font-roboto-text text-darkBlue'
                target='_blank'
                rel='noopener noreferrer'
              >
                {getProfileInfoGithubUrl() || 'No github yet'}
              </a>
            )}
          </div>
        </div>
        <div className='break-words w-96'>
          <div className='text-secondary font-roboto-text'>Website</div>
          <div>
            {getProfileDataLoading() ? (
              <div className='text-sm font-roboto-text text-darkBlue'>
                loading...
              </div>
            ) : (
              <a
                href={getProfileInfoWebsiteUrl()}
                className='text-lg font-roboto-text text-darkBlue'
                target='_blank'
                rel='noopener noreferrer'
              >
                {getProfileInfoWebsiteUrl() || 'No website yet'}
              </a>
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
              <div className='text-lg font-roboto-text text-darkBlue break-words whitespace-pre-line w-96'>
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
