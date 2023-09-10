import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import {
  profileDataStore,
  fetchAndSetProfileData,
} from '../stores/store-profile-data';
import {
  setProfilePage,
  storeProfilePages,
} from '../stores/store-profile-pages';

const useProfileData = () => {
  // const { currentPage } = useStore(storeProfilePages);

  useEffect(() => {
    fetchAndSetProfileData();
  }, []);
};

export default useProfileData;
