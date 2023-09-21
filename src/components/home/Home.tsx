import React from 'react';
import { useIsMobile } from '@hooks/useIsMobile';
import HomeMobile from '@components/home/mobile/HomeMobile';
import HomeDesktop from '@components/home/desktop/HomeDesktop';

const Home = () => {
  const mobile = useIsMobile();
  console.log('mobile home', mobile, !!mobile);
  return (
    <div>
      {mobile !== null && mobile !== undefined && (
        <div>{mobile ? <HomeMobile /> : <HomeDesktop />}</div>
      )}
    </div>
  );
};

export default Home;
