import React from 'react';
import { getProfileDataLoading } from '@src/components/profile/stores/store-profile-data';
import {
  getProfileInfoAvatar,
  getProfileInfoBio,
  getProfileInfoGithubUrl,
  getProfileInfoName,
  getProfileInfoWebsiteUrl,
} from '@src/components/profile/stores/store-profile-pages';
import ProfilePicture from './components/ProfilePicture';
import InputComponent from './components/InputComponent';
import TextareaComponent from './components/TextareaComponent';

const ProfilePageEdit = () => {
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
      <section className='flex flex-col gap-7 mt-16'>
        <InputComponent
          label='Name'
          value={getProfileInfoName() || 'No name yet'}
          editable
          callback={() => null}
        />
        <InputComponent
          label='Github'
          value={getProfileInfoGithubUrl() || 'No github yet'}
          editable
          callback={() => null}
        />
        <InputComponent
          label='Website'
          value={getProfileInfoWebsiteUrl() || 'No website yet'}
          editable
          callback={() => null}
        />
      </section>
      <section className='flex flex-col gap-3 mt-10'>
        <TextareaComponent
          label='Bio'
          value={getProfileInfoBio() || 'No bio yet'}
          editable
          callback={() => null}
        />
      </section>
    </div>
  );
};

export default ProfilePageEdit;
