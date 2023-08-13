import React, { useEffect, useRef, useState } from 'react';
import { setProfileMini, setProfilePictureUrl } from '@store/user/logged-user';
import { setVisitorId } from '@store/roadmap-refactor/roadmap-data/roadmap-visit-data';
import { fetchGetMiniProfileData } from '../../api-wrapper/user/user';

export default (WrappedComponent) => {
  const hocComponent = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const isMobile = useRef<boolean>();
    useEffect(() => {
      fetchGetMiniProfileData().then((res) => {
        if (res === false) {
          setLoggedIn(false);
          return;
        }
        setProfileMini(res.profilePictureUrl, res.userId, res.name);
        setVisitorId(res.userId);
        setLoggedIn(true);
      });
      if (document.cookie.includes('token')) {
        setLoggedIn(true);
      }
      setLoaded(true);
    }, []);

    return <WrappedComponent isLoggedIn={loggedIn} loaded={loaded} />;
  };

  return hocComponent;
};
