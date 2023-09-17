import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import {
  storeProfileData,
  fetchAndSetProfileData,
} from '../stores/store-profile-data';
import {
  setProfilePage,
  storeSelectedProfilePage,
} from '../stores/store-selected-profile-page';

const useProfileData = (id) => {
  // const { currentPage } = useStore(storeProfilePages);
  useEffect(() => {
    fetchAndSetProfileData(id);
  }, []);
};

export default useProfileData;
