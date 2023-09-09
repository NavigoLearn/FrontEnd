import React, { useEffect, useState } from 'react';
import ProfilePicture from '@components/profile/UI/parts-desktop/profile-display-pages/pages/profile/components/ProfilePicture';
import InputComponent from '@components/profile/UI/parts-desktop/profile-display-pages/pages/profile/components/InputComponent';
import TextComponent from '@components/roadmap/pages-roadmap/editor/editor-pages/components-page/components/TextComponent';
import TextareaComponent from '@components/profile/UI/parts-desktop/profile-display-pages/pages/profile/components/TextareaComponent';
import useProfileData from '@src/components/profile/hooks/useProfileData';
import {
  getProfileInfoAvatar,
  getProfileInfoBio,
  getProfileInfoGithubUrl,
  getProfileInfoName,
  getProfileInfoWebsiteUrl,
} from '@src/components/profile/stores/store-profile-pages';
import {
  getProfileDataLoading,
  profileDataStore,
} from '@src/components/profile/stores/store-profile-data';
import { useStore } from '@nanostores/react';

const ProfilePage = () => {
  const { loading } = useStore(profileDataStore);
  if (loading)
    return (
      <div className='text-2xl ml-14 mt-6 font-roboto-text text-darkBlue'>
        Loading...
      </div>
    );

  return (
    <div className='ml-14 mt-6'>
      <h1 className='text-4xl monitor:text-5xl text-darkBlue font-roboto-text font-medium'>
        Profile
      </h1>
      <h6 className='text-lg monitor:text-xl font-roboto-text text-placeholder'>
        Update your profile details below
      </h6>

      <div className='mt-7'>
        <ProfilePicture src={getProfileInfoAvatar()} />
      </div>
      <section className='flex flex-col gap-8 mt-16'>
        <InputComponent
          label='Name'
          value={getProfileInfoName()}
          editable={false}
          callback={() => null}
        />
        <InputComponent
          label='Github'
          value={getProfileInfoGithubUrl()}
          editable={false}
          callback={() => null}
        />
        <InputComponent
          label='Website'
          value={getProfileInfoWebsiteUrl()}
          editable={false}
          callback={() => null}
        />
      </section>

      <section className='flex flex-col gap-8 mt-10'>
        <TextareaComponent
          label='Bio'
          value={getProfileInfoBio()}
          editable={false}
          callback={() => null}
        />
      </section>
    </div>
  );
};

export default ProfilePage;
