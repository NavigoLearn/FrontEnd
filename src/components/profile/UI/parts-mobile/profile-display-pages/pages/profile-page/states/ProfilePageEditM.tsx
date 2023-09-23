import React from 'react';
import DisplayProfileAvatarM from '@components/profile/UI/parts-mobile/profile-display-pages/pages/profile-page/states/components/DisplayProfileAvatar';
import {
  setProfileTempDataField,
  storeProfileTempData,
} from '@components/profile/stores/store-profile-data';
import { useStore } from '@nanostores/react';
import InputComponent from '@components/profile/UI/parts-desktop/profile-display-pages/pages/profile/components/InputComponent';
import TextareaComponent from '@components/profile/UI/parts-desktop/profile-display-pages/pages/profile/components/TextareaComponent';

const ProfilePageEditM = () => {
  const { profileData } = useStore(storeProfileTempData);

  const setName = (value: string) => setProfileTempDataField('name', value);
  const setGithubUrl = (value: string) =>
    setProfileTempDataField('githubUrl', value);
  const setWebsiteUrl = (value: string) =>
    setProfileTempDataField('websiteUrl', value);
  const setBio = (value: string) => setProfileTempDataField('bio', value);

  return (
    <div>
      <DisplayProfileAvatarM />
      <div className='w-full mt-10 pb-10'>
        <section className='flex flex-col gap-4 '>
          <InputComponent
            label='Name'
            value={profileData.name}
            editable
            callback={(value) => setName(value)}
            hasLimit
          />
          <InputComponent
            label='Github'
            value={profileData.githubUrl}
            editable
            callback={(value) => setGithubUrl(value)}
          />
          <InputComponent
            label='Website'
            value={profileData.websiteUrl}
            editable
            callback={(value) => setWebsiteUrl(value)}
          />

          <TextareaComponent
            label='Bio'
            value={profileData.bio}
            editable
            callback={(value) => setBio(value)}
          />
        </section>
      </div>
    </div>
  );
};

export default ProfilePageEditM;
