import React from 'react';
import { useStore } from '@nanostores/react';
import { storeProfileData } from '@components/profile/stores/store-profile-data';
import DisplayProfileAvatarM from '@components/profile/UI/parts-mobile/profile-display-pages/pages/profile-page/states/components/DisplayProfileAvatar';
import DisplayProfilePropertyM from '@components/profile/UI/parts-mobile/profile-display-pages/pages/profile-page/states/components/DisplayProfilePropertyM';
import {
  getProfileInfoBio,
  getProfileInfoGithubUrl,
  getProfileInfoName,
  getProfileInfoWebsiteUrl,
} from '@components/profile/stores/store-selected-profile-page';

const ProfilePageViewM = () => {
  return (
    <div>
      <DisplayProfileAvatarM />
      <div className='flex flex-col gap-4 w-full mt-10 pb-10'>
        <DisplayProfilePropertyM
          name='Name'
          value={getProfileInfoName()}
          data={{ type: 'text' }}
        />
        <DisplayProfilePropertyM
          name='Github'
          value={getProfileInfoGithubUrl()}
          data={{ type: 'link', href: getProfileInfoGithubUrl() }}
        />
        <DisplayProfilePropertyM
          name='Website'
          value={getProfileInfoWebsiteUrl()}
          data={{ type: 'link', href: getProfileInfoWebsiteUrl() }}
        />
        <DisplayProfilePropertyM
          name='Bio'
          value={getProfileInfoBio()}
          data={{ type: 'text' }}
        />
      </div>
    </div>
  );
};

export default ProfilePageViewM;
