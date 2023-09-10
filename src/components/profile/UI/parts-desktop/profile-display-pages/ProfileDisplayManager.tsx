import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  getProfilePage,
  getProfilePageEditing,
  storeProfilePages,
} from '@components/profile/stores/store-profile-pages';
import ActivityPage from '@components/profile/UI/parts-desktop/profile-display-pages/pages/activity/ActivityPage';
import RoadmapsPage from '@components/profile/UI/parts-desktop/profile-display-pages/pages/roadmaps/RoadmapsPage';
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
const ProfileDisplayManager = () => {
  useStore(storeProfilePages);
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
            <RoadmapsPage />
          </AnimationWrapper>
        )}
        {page === 'activity' && (
          <AnimationWrapper id={page}>
            <ActivityPage />
          </AnimationWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDisplayManager;
