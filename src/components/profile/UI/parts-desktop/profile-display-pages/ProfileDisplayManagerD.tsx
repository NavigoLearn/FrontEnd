import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  getProfilePage,
  getProfilePageEditing,
  storeSelectedProfilePage,
} from '@components/profile/stores/store-selected-profile-page';
import ActivityPageD from '@components/profile/UI/parts-desktop/profile-display-pages/pages/activity/ActivityPageD';
import RoadmapsPageD from '@components/profile/UI/parts-desktop/profile-display-pages/pages/roadmaps/RoadmapsPageD';
import { useStore } from '@nanostores/react';
import ProfilePageView from './pages/profile/ProfilePageView';
import ProfilePageManager from './pages/profile/ProfilePageManager';

type IAnimationWrapperProps = {
  id: string;
  children: React.ReactNode;
};
const AnimationWrapper = ({ id, children }: IAnimationWrapperProps) => {
  return (
    <motion.div key={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {children}
    </motion.div>
  );
};
const ProfileDisplayManagerD = () => {
  useStore(storeSelectedProfilePage);
  const page = getProfilePage();
  const isEditing = getProfilePageEditing();

  return (
    <div className=' w-[750px] monitor:w-[900px] '>
      <AnimatePresence>
        {page === 'profile' && (
          <AnimationWrapper id={page}>
            <ProfilePageManager />
          </AnimationWrapper>
        )}
        {page === 'roadmaps' && (
          <AnimationWrapper id={page}>
            <RoadmapsPageD />
          </AnimationWrapper>
        )}
        {page === 'activity' && (
          <AnimationWrapper id={page}>
            <ActivityPageD />
          </AnimationWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDisplayManagerD;
