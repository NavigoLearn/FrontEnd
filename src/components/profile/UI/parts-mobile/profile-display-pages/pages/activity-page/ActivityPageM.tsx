import React from 'react';
import Statistic from '@components/profile/UI/parts-desktop/profile-display-pages/pages/activity/components/Statistic';
import {
  getProfileInfoRoadmapsCount,
  getProfileInfoRoadmapsLikes,
  getProfileInfoRoadmapsViews,
} from '@components/profile/stores/store-selected-profile-page';

const ActivityPageM = () => {
  return (
    <div className='flex flex-col gap-10 mt-10 items-center justify-center'>
      <Statistic
        type='mobile'
        title='Roadmap created'
        value={getProfileInfoRoadmapsCount().toString()}
      />
      <Statistic
        type='mobile'
        title='Total roadmap views'
        value={getProfileInfoRoadmapsViews().toString()}
      />
      <Statistic
        type='mobile'
        title='Total roadmap likes'
        value={getProfileInfoRoadmapsLikes().toString()}
      />
    </div>
  );
};

export default ActivityPageM;
