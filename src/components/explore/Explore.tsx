import React from 'react';
import ExploreDesktop from '@components/explore/UI/ExploreDesktop';
import ExploreMobile from '@components/explore/UI/ExploreMobile';
import { useIsMobile } from '@hooks/useIsMobile';

const Explore = () => {
  const mobile = useIsMobile();
  return (
    <div className='relative pointer-events-auto z-10'>
      {mobile !== null && (
        <div>{mobile ? <ExploreMobile /> : <ExploreDesktop />}</div>
      )}
    </div>
  );
};

export default Explore;
