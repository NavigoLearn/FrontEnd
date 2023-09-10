import { atom } from 'nanostores';
import {
  CardRoadmapTypeApi,
  RoadmapTypeApiExplore,
} from '@src/types/explore/card';
import { getLoggedUserId } from '@src/store/user/logged-user';
import {
  fetchProfileData,
  fetchRoadmapCardsProfile,
} from '../profile/profile-fetch';
import { ProfileDataReponse, UserData } from '../profile/profile-data';
import { DefaultProfileAdapter } from '../profile/adapter';

export const profileDataStore = atom({
  loading: true,
  data: {} as UserData,
  ProfileRoadmaps: {} as CardRoadmapTypeApi[],
});

export function setProfileDataLoading() {
  profileDataStore.set({
    ...profileDataStore.get(),
    loading: true,
  });
}

export function setProfileDataLoaded() {
  profileDataStore.set({
    ...profileDataStore.get(),
    loading: false,
  });
}

export function getProfileDataLoading() {
  return profileDataStore.get().loading;
}

const adapter = new DefaultProfileAdapter();

export async function fetchAndSetProfileData() {
  setProfileDataLoading();

  const rawData = await fetchProfileData(getLoggedUserId());
  const rawProfileRoadmaps = await fetchRoadmapCardsProfile(getLoggedUserId());

  const adaptedData = adapter.adapt(rawData);
  const adaptedRoadmaps = adapter.adaptRoadmaps(rawProfileRoadmaps);
  console.log(adaptedRoadmaps);

  profileDataStore.set({
    ...profileDataStore.get(),
    data: adaptedData.data,
    ProfileRoadmaps: adaptedRoadmaps,
  });

  setProfileDataLoaded();
}
