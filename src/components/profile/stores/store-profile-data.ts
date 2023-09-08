import { atom } from 'nanostores';
import { CardRoadmapTypeApi } from '@src/types/explore/card';

type ProfileType = {
  name: string;
  GitHub: string | null;
  email: string;
  website: string;
  bio: string;
};

type ActivityType = {
  totalRoadmaps: number;
  totalLikes: number;
  totalViews: number;
};

export const profileDataStore = atom({
  loading: true,
  data: {
    Profile: {} as ProfileType,
    Activity: {} as ActivityType,
    ProfileRoadmaps: {} as CardRoadmapTypeApi[],
  },
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

export async function fetchAndSetProfileData() {
  setProfileDataLoading();

  const data = await fetchProfileData();

  profileDataStore.set({
    ...profileDataStore.get(),
    data: data.data,
  });

  setProfileDataLoaded();
}
