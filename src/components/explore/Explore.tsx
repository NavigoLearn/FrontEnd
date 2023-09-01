import React from 'react';
import ExploreDesktop from '@components/explore/UI/ExploreDesktop';
import ExploreMobile from '@components/explore/UI/ExploreMobile';
import { useIsMobile } from '@hooks/useIsMobile';

const Explore = () => {
  const mobile = useIsMobile();
  return (
    <div
      onMouseOver={() => {
        console.log('hovered');
      }}
      onClick={() => {
        console.log('clicked');
      }}
      onClickCapture={() => {
        console.log('clicked capture');
      }}
      className='relative pointer-events-auto z-10 hover:bg-red-200'
    >
      {mobile ? <ExploreMobile /> : <ExploreDesktop />}
    </div>
  );
};

export default Explore;
