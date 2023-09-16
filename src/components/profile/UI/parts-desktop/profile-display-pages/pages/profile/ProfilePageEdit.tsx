import React, { useState } from 'react';
import { getProfileDataLoading } from '@src/components/profile/stores/store-profile-data';
import {
  getProfileInfoAvatar,
  getProfileInfoBio,
  getProfileInfoGithubUrl,
  getProfileInfoName,
  getProfileInfoWebsiteUrl,
  setProfileInfoBio,
  setProfileInfoGithubUrl,
  setProfileInfoName,
  setProfileInfoWebsiteUrl,
  setProfilePageEditing,
} from '@components/profile/stores/store-selected-profile-page';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { fetchPostProfileData } from '@src/components/profile/profile/profile-fetch';
import ProfilePicture from './components/ProfilePicture';
import InputComponent from './components/InputComponent';
import TextareaComponent from './components/TextareaComponent';

const ProfilePageEdit = () => {
  const [name, setName] = useState(getProfileInfoName());
  const [githubUrl, setGithubUrl] = useState(getProfileInfoGithubUrl());
  const [websiteUrl, setWebsiteUrl] = useState(getProfileInfoWebsiteUrl());
  const [bio, setBio] = useState(getProfileInfoBio());
  const handleSave = () => {
    setProfileInfoName(name);
    setProfileInfoGithubUrl(githubUrl);
    setProfileInfoWebsiteUrl(websiteUrl);
    setProfileInfoBio(bio);
    setProfilePageEditing(false);
    fetchPostProfileData(name, githubUrl, websiteUrl, bio);
  };

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
          value={name}
          editable
          callback={(value) => setName(value)}
          hasLimit
        />
        <InputComponent
          label='Github'
          value={githubUrl}
          editable
          callback={(value) => setGithubUrl(value)}
        />
        <InputComponent
          label='Website'
          value={websiteUrl}
          editable
          callback={(value) => setWebsiteUrl(value)}
        />
      </section>
      <section className='flex flex-col gap-3 mt-10'>
        <TextareaComponent
          label='Bio'
          value={bio}
          editable
          callback={(value) => setBio(value)}
        />
      </section>
      <button
        className='text-lg font-roboto-text text-darkBlue ml-2 mt-1'
        type='button'
        onClick={() => handleSave()}
      >
        Save
      </button>
    </div>
  );
};

export default ProfilePageEdit;
