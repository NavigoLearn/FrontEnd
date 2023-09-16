import React from 'react';
import Statistic from '@components/profile/UI/parts-desktop/profile-display-pages/pages/activity/components/Statistic';
import {
  getProfileInfoCreatedAt,
  getProfileInfoRoadmapsCount,
  getProfileInfoRoadmapsLikes,
  getProfileInfoRoadmapsViews,
} from '@components/profile/stores/store-selected-profile-page';
// import { useStore } from '@nanostores/react';
// import { profileDataStore } from '@src/components/profile/stores/store-profile-data';
import { getProfileDataLoading } from '@src/components/profile/stores/store-profile-data';

const ActivityPageD = () => {
  if (getProfileDataLoading())
    return (
      <div className='text-2xl ml-14 mt-6 font-roboto-text text-darkBlue'>
        Loading...
      </div>
    );

  return (
    <div className='ml-10 mt-5'>
      <h1 className='text-xl monitor:text-3xl text-darkBlue font-roboto-text font-medium'>
        Statistics
      </h1>
      <div className='flex justify-start gap-3 mt-4 '>
        <div className='flex gap-3 items-center'>
          <Statistic
            title='Roadmap created'
            value={getProfileInfoRoadmapsCount().toString()}
          />
          <hr className='h-10 w-[1px] bg-placeholderBlack' />
          <Statistic
            title='Total roadmap views'
            value={getProfileInfoRoadmapsViews().toString()}
          />
          <hr className='h-10 w-[1px] bg-placeholderBlack' />
          <Statistic
            title='Total roadmap likes'
            value={getProfileInfoRoadmapsLikes().toString()}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityPageD;
