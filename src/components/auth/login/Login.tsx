import React, { useState, useEffect } from 'react';
import DesktopLogin from './Desktop';
import MobileLogin from './Mobile';

const Profile = () => {
  const [isDesktop, setIsDesktop] = useState(undefined);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {typeof isDesktop === 'undefined' ? null : (
        <div>{isDesktop ? <DesktopLogin /> : <MobileLogin />}</div>
      )}
    </div>
  );
};

export default Profile;
