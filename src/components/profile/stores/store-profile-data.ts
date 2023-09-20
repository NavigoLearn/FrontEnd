import { atom } from 'nanostores';
import {
  ICardRoadmapTypeApi,
  RoadmapTypeApiExplore,
} from '@src/types/explore/card';
import { getLoggedUserId } from '@store/user/store-logged-user';
import { DEFAULT_OWNER_AVATAR } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-owner-data';
import {
  setProfileInfoBio,
  setProfileInfoGithubUrl,
  setProfileInfoName,
  setProfileInfoWebsiteUrl,
  setProfilePageEditing,
} from '@components/profile/stores/store-selected-profile-page';
import {
  fetchPostProfileData,
  fetchProfileData,
  fetchRoadmapCardsProfile,
} from '../profile/profile-fetch';
import { ProfileDataReponse, UserData } from '../profile/profile-data';
import { DefaultProfileAdapter } from '../profile/adapter';

export const storeProfileData = atom({
  loading: true,
  data: {} as UserData,
  profileRoadmaps: {} as ICardRoadmapTypeApi[],
  ownProfile: false,
});

export function setOwnProfile(ownProfile: boolean) {
  storeProfileData.set({
    ...storeProfileData.get(),
    ownProfile,
  });
}

export function getIsOwnerOfProfile() {
  return storeProfileData.get().ownProfile;
}

export function setProfileDataLoading() {
  storeProfileData.set({
    ...storeProfileData.get(),
    loading: true,
  });
}

export function setProfileDataLoaded() {
  storeProfileData.set({
    ...storeProfileData.get(),
    loading: false,
  });
}

export function getProfileDataLoading() {
  return storeProfileData.get().loading;
}

const adapter = new DefaultProfileAdapter();

function checkProfileForDefaults(adaptedData: ProfileDataReponse) {
  if (!adaptedData.data.profileInfo.avatar) {
    adaptedData.data.profileInfo.avatar = DEFAULT_OWNER_AVATAR;
  }
}
export async function fetchAndSetProfileData(id) {
  setProfileDataLoading();
  let urlId = id === null ? '' : id;
  const loggedUserId = getLoggedUserId();

  if (urlId === loggedUserId.toString()) {
    setOwnProfile(true);
  }

  if (urlId === '') {
    setOwnProfile(true);
    urlId = loggedUserId.toString();
  }

  const rawData = await fetchProfileData(urlId);
  const rawProfileRoadmaps = await fetchRoadmapCardsProfile(urlId);

  const adaptedData = adapter.adapt(rawData);
  const adaptedRoadmaps = adapter.adaptRoadmaps(rawProfileRoadmaps);

  checkProfileForDefaults(adaptedData);

  storeProfileData.set({
    ...storeProfileData.get(),
    data: adaptedData.data,
    profileRoadmaps: adaptedRoadmaps,
  });

  setProfileDataLoaded();
}

export type IProfileData = {
  name: string;
  githubUrl: string;
  websiteUrl: string;
  bio: string;
};
export const storeProfileTempData = atom({
  profileData: {} as IProfileData,
});

export function setProfileTempDataField(field: string, value: string) {
  storeProfileTempData.set({
    ...storeProfileTempData.get(),
    profileData: {
      ...storeProfileTempData.get().profileData,
      [field]: value,
    },
  });
}

export const handleTransferProfileToTemp = () => {
  const { name, githubUrl, websiteUrl, bio } = {
    ...storeProfileData.get().data.profileInfo,
  };
  storeProfileTempData.set({
    ...storeProfileTempData.get(),
    profileData: {
      name,
      githubUrl,
      websiteUrl,
      bio,
    },
  });
};
export const handleSaveProfileData = (profileData: IProfileData) => {
  const { name, githubUrl, websiteUrl, bio } = { ...profileData };
  setProfileInfoName(name);
  setProfileInfoGithubUrl(githubUrl);
  setProfileInfoWebsiteUrl(websiteUrl);
  setProfileInfoBio(bio);
  setProfilePageEditing(false);
  fetchPostProfileData(name, githubUrl, websiteUrl, bio);
};
