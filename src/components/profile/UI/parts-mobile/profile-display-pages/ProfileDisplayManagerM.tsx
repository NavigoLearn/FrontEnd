import React from 'react';
import { useStore } from '@nanostores/react';
import { storeSelectedProfilePage } from '@components/profile/stores/store-selected-profile-page';
import ActivityPageM from '@components/profile/UI/parts-mobile/profile-display-pages/pages/activity-page/ActivityPageM';
import RoadmapsPageM from '@components/profile/UI/parts-mobile/profile-display-pages/pages/roadmaps-page/RoadmapsPageM';
import ProfilePageManagerM from '@components/profile/UI/parts-mobile/profile-display-pages/pages/profile-page/ProfilePageManagerM';

const ProfileDisplayManagerM = () => {
  const { currentPage } = useStore(storeSelectedProfilePage);
  return (
    <div>
      {currentPage === 'profile' && <ProfilePageManagerM />}
      {currentPage === 'activity' && <ActivityPageM />}
      {currentPage === 'roadmaps' && <RoadmapsPageM />}
    </div>
  );
};

export default ProfileDisplayManagerM;
