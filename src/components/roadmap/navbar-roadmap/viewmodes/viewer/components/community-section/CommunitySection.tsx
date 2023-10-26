import React from 'react';
import JoinCommunity from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/community-section/buttons/JoinCommunity.tsx';
import RequestChange from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/community-section/buttons/RequestChange.tsx';
import ForkAndContribute from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/community-section/buttons/ForkAndContribute.tsx';
import { useStore } from '@nanostores/react';
import { storeRoadmapNavbarProperties } from '@components/roadmap/navbar-roadmap/stores/store-roadmap-navbar-properties.ts';

const CommunitySection = () => {
  const { under2Xl } = useStore(storeRoadmapNavbarProperties);
  return (
    <div
      className={`flex items-center ${
        under2Xl ? 'gap-0' : 'gap-3'
      } pointer-events-auto mr-2`}
    >
      <ForkAndContribute />
      <JoinCommunity />
      <RequestChange />
    </div>
  );
};

export default CommunitySection;
