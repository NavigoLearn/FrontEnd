import React from 'react';
import HumanSvg from '@components/profile/UI/parts-desktop/profile-preview/components/HumanSvg';
import useProfileData from '@src/components/profile/hooks/useProfileData';
import { useStore } from '@nanostores/react';
import { profileDataStore } from '@src/components/profile/stores/store-profile-data';
import {
  getProfileInfoAvatar,
  getProfileInfoFollowerCount,
  getProfileInfoFollowingCount,
  getProfileInfoName,
} from '@src/components/profile/stores/store-profile-pages';
import { getProfileDataLoading } from '@src/components/profile/stores/store-profile-data';

const ProfilePreview = () => {
  const { loading } = useStore(profileDataStore);

  // if (loading)
  //   return (
  //     <div className='text-2xl ml-14 mt-6 font-roboto-text text-darkBlue'>
  //       Loading...
  //     </div>
  //   );

  return (
    <div className='relative flex items-center gap-3'>
      <section>
        <img src={loading ? '' : getProfileInfoAvatar()} alt='profilePic' />
        <div className='rounded-full w-8 h-8 monitor:w-10 monitor:h-10 bg-gray-300' />
      </section>
      {loading ? (
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
      {loading ? (
        <div className='text-sm font-roboto-text text-darkBlue'>loading...</div>
      ) : (
        <span className='font-roboto-text text-darkBlue monitor:text-lg  font-medium'>
          {getProfileInfoFollowerCount()}
        </span>
      )}
      <span className='font-roboto-text text-placeholder monitor:text-lg  ml-4'>
        Following
      </span>
      {loading ? (
        <div className='text-sm font-roboto-text text-darkBlue'>loading...</div>
      ) : (
        <span className='font-roboto-text text-darkBlue monitor:text-lg  font-medium'>
          {getProfileInfoFollowingCount()}
        </span>
      )}
    </div>
  );
};

export default ProfilePreview;
