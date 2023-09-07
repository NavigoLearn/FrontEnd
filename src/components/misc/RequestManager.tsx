import React, { useEffect } from 'react';
import loggedUser, { setProfileMini } from '@store/user/logged-user';
import { setVisitorId } from '@store/roadmap-refactor/roadmap-data/roadmap-visit-data';
import { setIsLogged, setLoaded } from '@store/user/user-status';
import { fetchGetMiniProfileData } from '../../api-wrapper/user/user';

const RequestManager = () => {
  useEffect(() => {
    fetchGetMiniProfileData().then((res) => {
      setIsLogged(false);
      setLoaded(true);

      if (res === false) {
        // deletes token if exists because it is invalid
        if (document.cookie.includes('token')) {
          document.cookie =
            'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
        return;
      }

      if (res === 'Error') return;
      setProfileMini(res?.profilePictureUrl, res?.userId, res?.name);
      setVisitorId(res?.userId);
      setIsLogged(true);
    });
  }, []);
};

export default RequestManager;
