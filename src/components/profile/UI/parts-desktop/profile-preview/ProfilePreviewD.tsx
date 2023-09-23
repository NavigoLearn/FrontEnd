import React, { useEffect } from 'react';
import HumanSvg from '@components/profile/UI/parts-desktop/profile-preview/components/HumanSvg';
import { useStore } from '@nanostores/react';
import {
  storeProfileData,
  getProfileDataLoading,
} from '@src/components/profile/stores/store-profile-data';
import {
  getProfileInfoAvatar,
  getProfileInfoFollowerCount,
  getProfileInfoFollowingCount,
  getProfileInfoName,
} from '@components/profile/stores/store-selected-profile-page';

const ProfilePreviewD = () => {
  const { loading } = useStore(storeProfileData);

  return (
    <div className='relative flex items-center gap-3'>
      <section>
        <img
          className='rounded-full w-8 h-8 monitor:w-10 monitor:h-10'
          src={getProfileDataLoading() ? '' : getProfileInfoAvatar()}
          alt='profilePic'
        />
      </section>
      {getProfileDataLoading() ? (
        <div className='text-sm font-roboto-text text-darkBlue'>loading...</div>
      ) : (
        <span className='font-kanit-text text-lg monitor:text-xl'>
          {getProfileInfoName()}
        </span>
      )}
      <HumanSvg size={18} opacity={0.7} />
      <hr className='h-6 bg-gray-300 w-[1px]' />
      <span className='font-roboto-text text-placeholder monitor:text-lg ml-2'>
        Followers
      </span>
      {getProfileDataLoading() ? (
        <div className='text-sm font-roboto-text text-darkBlue'>loading...</div>
      ) : (
        <span className='font-roboto-text text-darkBlue monitor:text-lg  font-medium'>
          {getProfileInfoFollowerCount()}
        </span>
      )}
      <span className='font-roboto-text text-placeholder monitor:text-lg  ml-4'>
        Following
      </span>
      {getProfileDataLoading() ? (
        <div className='text-sm font-roboto-text text-darkBlue'>loading...</div>
      ) : (
        <span className='font-roboto-text text-darkBlue monitor:text-lg  font-medium'>
          {getProfileInfoFollowingCount()}
        </span>
      )}
    </div>
  );
};

export default ProfilePreviewD;
