import React from 'react';
import { useStore } from '@nanostores/react';
import { storeRoadmapOwnerData } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-owner-data';

const CreatorsProfile = () => {
  const { ownerAvatar, ownerId } = useStore(storeRoadmapOwnerData);

  return (
    <div className='flex gap-2 items-center'>
      <h4 className='text-placeholder font-roboto-text text-sm font-medium'>
        Made by
      </h4>
      <button
        type='button'
        className='w-10 h-10'
        onClick={() => {
          window.location.href = `/profile/${ownerId}`;
        }}
      >
        <img
          alt='roadmap creator profile'
          src={ownerAvatar}
          className='w-full h-full rounded-full'
        />
      </button>
    </div>
  );
};

export default CreatorsProfile;
