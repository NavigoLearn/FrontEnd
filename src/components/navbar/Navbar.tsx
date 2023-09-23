import React, { useState } from 'react';
import { useIsMobile } from '@src/hooks/useIsMobile';
import DesktopNavbar from './desktop/Desktop';
import MobileNavbar from './mobile/Mobile';

const Navbar = () => {
  const mobile = useIsMobile();
  const [isRoadmap, setIsRoadmap] = useState(false);

  React.useEffect(() => {
    // check if current location starts with /roadmap
    setIsRoadmap(window.location.pathname.startsWith('/roadmap'));
  }, []);

  return (
    <>
      <div className='hidden md:block sticky top-0 z-[20]'>
        {!mobile && <DesktopNavbar />}
      </div>
      <div
        className={`md:hidden ${
          isRoadmap ? `relative` : `sticky top-0  `
        } z-[20]`}
      >
        {mobile && <MobileNavbar />}
      </div>
    </>
  );
};

export default Navbar;
