import React from 'react';
import ProfilePicAndNameM from '@components/profile/UI/parts-mobile/profile-preview/components/ProfilePicAndNameM';
import FollowersM from '@components/profile/UI/parts-mobile/profile-preview/components/FollowersM';
import { useStore } from '@nanostores/react';
import { storeProfileData } from '@components/profile/stores/store-profile-data';

const ProfilePreviewM = () => {
  const { data, loading } = useStore(storeProfileData);
  if (loading)
    return <div className='w-full flex gap-4'>Loading please wait...</div>;

  const { generalInfo } = data;
  const { followerCount, followingCount } = generalInfo;

  return (
    <div className='w-full flex gap-12 items-center justify-center mt-4'>
      <ProfilePicAndNameM />
      <section className='flex gap-5'>
        <FollowersM text='Followers' value={followerCount} />
        <FollowersM text='Following' value={followingCount} />
      </section>
    </div>
  );
};

export default ProfilePreviewM;
