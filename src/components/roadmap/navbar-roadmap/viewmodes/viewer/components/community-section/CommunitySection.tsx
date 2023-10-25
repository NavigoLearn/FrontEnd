import React from 'react';
import JoinCommunity from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/community-section/buttons/JoinCommunity.tsx';
import RequestChange from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/community-section/buttons/RequestChange.tsx';
import ForkAndContribute from '@components/roadmap/navbar-roadmap/viewmodes/viewer/components/community-section/buttons/ForkAndContribute.tsx';

const CommunitySection = () => {
  return (
    <div className='flex items-center gap-3 pointer-events-auto mr-2'>
      <ForkAndContribute />
      <JoinCommunity />
      <RequestChange />
    </div>
  );
};

export default CommunitySection;
