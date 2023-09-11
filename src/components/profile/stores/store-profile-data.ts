import { atom } from 'nanostores';
import {
  CardRoadmapTypeApi,
  RoadmapTypeApiExplore,
} from '@src/types/explore/card';
import { getLoggedUserId } from '@src/store/user/logged-user';
import { DEFAULT_OWNER_AVATAR } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-owner-data';
import {
  fetchProfileData,
  fetchRoadmapCardsProfile,
} from '../profile/profile-fetch';
import { ProfileDataReponse, UserData } from '../profile/profile-data';
import { DefaultProfileAdapter } from '../profile/adapter';

export const profileDataStore = atom({
  loading: true,
  data: {} as UserData,
  profileRoadmaps: {} as CardRoadmapTypeApi[],
  ownProfile: false,
});

export function setOwnProfile(ownProfile: boolean) {
  profileDataStore.set({
    ...profileDataStore.get(),
    ownProfile,
  });
}

export function getOwnProfile() {
  return profileDataStore.get().ownProfile;
}

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

function checkProfileForDefaults(adaptedData: ProfileDataReponse) {
  if (!adaptedData.data.profileInfo.avatar) {
    adaptedData.data.profileInfo.avatar = DEFAULT_OWNER_AVATAR;
  }
}
export async function fetchAndSetProfileData(id) {
  setProfileDataLoading();
  const urlId = id.id.id === null ? '1' : id.id.id;
  const loggedUserId = getLoggedUserId();

  if (urlId === loggedUserId.toString()) {
    setOwnProfile(true);
  }

  const rawData = await fetchProfileData(urlId);
  const rawProfileRoadmaps = await fetchRoadmapCardsProfile(urlId);

  const adaptedData = adapter.adapt(rawData);
  const adaptedRoadmaps = adapter.adaptRoadmaps(rawProfileRoadmaps);

  checkProfileForDefaults(adaptedData);

  profileDataStore.set({
    ...profileDataStore.get(),
    data: adaptedData.data,
    profileRoadmaps: adaptedRoadmaps,
  });

  setProfileDataLoaded();
}
