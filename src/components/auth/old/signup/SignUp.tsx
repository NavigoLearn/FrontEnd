import React, { useState, useEffect } from 'react';
import { dispatchAnalyticsEvent } from '@src/to-be-organized/analytics-module/stores/analytics';
import DesktopSignUp from './Desktop';
import MobileSignUp from './Mobile';

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
        <div>{isDesktop ? <DesktopSignUp /> : <MobileSignUp />}</div>
      )}
    </div>
  );
};

export default Profile;
