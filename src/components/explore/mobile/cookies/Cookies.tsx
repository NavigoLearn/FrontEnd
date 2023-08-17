import React, { useEffect } from 'react';
import filterObject, { setData } from '@store/explore/explorefilter';

const Cookies = () => {
  useEffect(() => {
    filterObject.subscribe((data) => {
      document.cookie = `myStoreData=${JSON.stringify(data)}`;
    });

    const cookieData = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('myStoreData='))
      ?.split('=')[1];

    if (cookieData) {
      setData(JSON.parse(cookieData));
    }
  }, []);
  return null;
};

export default Cookies;
