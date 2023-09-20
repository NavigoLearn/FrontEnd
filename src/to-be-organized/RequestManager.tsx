import React, { useEffect } from 'react';
import { setProfileMini } from '@store/user/store-logged-user';
import { setIsLogged, setLoaded, setVisitorId } from '@store/user/user-status';
import { fetchGetMiniProfileData } from '../api-wrapper/user/routes-user';

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
      const { avatar, name, id } = res.data;
      setProfileMini(avatar, id, name);
      setVisitorId(id);
      setIsLogged(true);
    });
  }, []);
};

export default RequestManager;
