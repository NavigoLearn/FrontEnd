import React from 'react';
import { useIsMobile } from '@hooks/useIsMobile';
import HomeMobile from '@components/home/mobile/HomeMobile';
import HomeDesktop from '@components/home/desktop/HomeDesktop';

const Home = () => {
  const mobile = useIsMobile();
  return (
    <div>
      {!!mobile && <div>{mobile ? <HomeMobile /> : <HomeDesktop />}</div>}
    </div>
  );
};

export default Home;
