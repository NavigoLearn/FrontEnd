import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  getProfilePage,
  storeProfilePages,
} from '@components/profile/stores/store-profile-pages';
import ProfilePage from '@components/profile/UI/parts-desktop/profile-display-pages/pages/profile/ProfilePage';
import ActivityPage from '@components/profile/UI/parts-desktop/profile-display-pages/pages/activity/ActivityPage';
import RoadmapsPage from '@components/profile/UI/parts-desktop/profile-display-pages/pages/roadmaps/RoadmapsPage';
import { useStore } from '@nanostores/react';

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

  return (
    <div className=' w-[600px] monitor:w-[900px] '>
      <AnimatePresence>
        {page === 'profile' && (
          <AnimationWrapper id={page}>
            <ProfilePage />
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
