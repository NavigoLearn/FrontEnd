import { atom } from 'nanostores';
import { profileDataStore } from './store-profile-data';

type IProfilePages = 'profile' | 'activity' | 'roadmaps';
export const profilePagesArray: IProfilePages[] = [
  'profile',
  'activity',
  'roadmaps',
];
export const storeProfilePages = atom({
  currentPage: 'profile',
  isEditing: false,
} as {
  currentPage: IProfilePages;
  isEditing: boolean;
});

export function setProfilePage(page: IProfilePages) {
  const originalStore = storeProfilePages.get();
  storeProfilePages.set({
    ...originalStore,
    currentPage: page,
  });
}

export function getProfilePage() {
  return storeProfilePages.get().currentPage;
}

export function setProfilePageEditing(isEditing: boolean) {
  const originalStore = storeProfilePages.get();
  storeProfilePages.set({
    ...originalStore,
    isEditing,
  });
}

export function getProfilePageEditing() {
  return storeProfilePages.get().isEditing;
}

export const setProfileInfoId = (id: number) => {
  profileDataStore.set({
    ...profileDataStore.get(),
    data: {
      ...profileDataStore.get().data,
      profileInfo: {
        ...profileDataStore.get().data.profileInfo,
        id,
      },
    },
  });
};

export const getProfileInfoId = () => {
  return profileDataStore.get().data.profileInfo.id;
};

export const setProfileInfoAvatar = (avatar: string | null) => {
  profileDataStore.set({
    ...profileDataStore.get(),
    data: {
      ...profileDataStore.get().data,
      profileInfo: {
        ...profileDataStore.get().data.profileInfo,
        avatar,
      },
    },
  });
};

export const getProfileInfoAvatar = () => {
  return profileDataStore.get().data.profileInfo.avatar;
};

export const setProfileInfoName = (name: string) => {
  profileDataStore.set({
    ...profileDataStore.get(),
    data: {
      ...profileDataStore.get().data,
      profileInfo: {
        ...profileDataStore.get().data.profileInfo,
        name,
      },
    },
  });
};

export const getProfileInfoName = () => {
  return profileDataStore.get().data.profileInfo.name;
};

export const setProfileInfoBio = (bio: string | null) => {
  profileDataStore.set({
    ...profileDataStore.get(),
    data: {
      ...profileDataStore.get().data,
      profileInfo: {
        ...profileDataStore.get().data.profileInfo,
        bio,
      },
    },
  });
};

export const getProfileInfoBio = () => {
  return profileDataStore.get().data.profileInfo.bio;
};

export const setProfileInfoQuote = (quote: string | null) => {
  profileDataStore.set({
    ...profileDataStore.get(),
    data: {
      ...profileDataStore.get().data,
      profileInfo: {
        ...profileDataStore.get().data.profileInfo,
        quote,
      },
    },
  });
};

export const getProfileInfoQuote = () => {
  return profileDataStore.get().data.profileInfo.quote;
};

export const setProfileInfoWebsiteUrl = (websiteUrl: string | null) => {
  profileDataStore.set({
    ...profileDataStore.get(),
    data: {
      ...profileDataStore.get().data,
      profileInfo: {
        ...profileDataStore.get().data.profileInfo,
        websiteUrl,
      },
    },
  });
};

export const getProfileInfoWebsiteUrl = () => {
  return profileDataStore.get().data.profileInfo.websiteUrl;
};

export const setProfileInfoGithubUrl = (githubUrl: string | null) => {
  profileDataStore.set({
    ...profileDataStore.get(),
    data: {
      ...profileDataStore.get().data,
      profileInfo: {
        ...profileDataStore.get().data.profileInfo,
        githubUrl,
      },
    },
  });
};

export const getProfileInfoGithubUrl = () => {
  return profileDataStore.get().data.profileInfo.githubUrl;
};

export const setProfileInfoRoadmapsCount = (roadmapsCount: number) => {
  profileDataStore.set({
    ...profileDataStore.get(),
    data: {
      ...profileDataStore.get().data,
      activityInfo: {
        ...profileDataStore.get().data.activityInfo,
        roadmapsCount,
      },
    },
  });
};

export const getProfileInfoRoadmapsCount = () => {
  return profileDataStore.get().data.activityInfo.roadmapsCount;
};

export const setProfileInfoRoadmapsViews = (roadmapsViews: number) => {
  profileDataStore.set({
    ...profileDataStore.get(),
    data: {
      ...profileDataStore.get().data,
      activityInfo: {
        ...profileDataStore.get().data.activityInfo,
        roadmapsViews,
      },
    },
  });
};

export const getProfileInfoRoadmapsViews = () => {
  return profileDataStore.get().data.activityInfo.roadmapsViews;
};

export const setProfileInfoRoadmapsLikes = (roadmapsLikes: number) => {
  profileDataStore.set({
    ...profileDataStore.get(),
    data: {
      ...profileDataStore.get().data,
      activityInfo: {
        ...profileDataStore.get().data.activityInfo,
        roadmapsLikes,
      },
    },
  });
};

export const getProfileInfoRoadmapsLikes = () => {
  return profileDataStore.get().data.activityInfo.roadmapsLikes;
};

export const setProfileInfoFollowerCount = (followerCount: number) => {
  profileDataStore.set({
    ...profileDataStore.get(),
    data: {
      ...profileDataStore.get().data,
      generalInfo: {
        ...profileDataStore.get().data.generalInfo,
        followerCount,
      },
    },
  });
};

export const getProfileInfoFollowerCount = () => {
  return profileDataStore.get().data.generalInfo.followerCount;
};

export const setProfileInfoFollowingCount = (followingCount: number) => {
  profileDataStore.set({
    ...profileDataStore.get(),
    data: {
      ...profileDataStore.get().data,
      generalInfo: {
        ...profileDataStore.get().data.generalInfo,
        followingCount,
      },
    },
  });
};

export const getProfileInfoFollowingCount = () => {
  return profileDataStore.get().data.generalInfo.followingCount;
};

export const setProfileInfoGithubLinked = (githubLinked: boolean) => {
  profileDataStore.set({
    ...profileDataStore.get(),
    data: {
      ...profileDataStore.get().data,
      generalInfo: {
        ...profileDataStore.get().data.generalInfo,
        githubLinked,
      },
    },
  });
};

export const getProfileInfoGithubLinked = () => {
  return profileDataStore.get().data.generalInfo.githubLinked;
};

export const setProfileInfoGoogleLinked = (googleLinked: boolean) => {
  profileDataStore.set({
    ...profileDataStore.get(),
    data: {
      ...profileDataStore.get().data,
      generalInfo: {
        ...profileDataStore.get().data.generalInfo,
        googleLinked,
      },
    },
  });
};

export const getProfileInfoGoogleLinked = () => {
  return profileDataStore.get().data.generalInfo.googleLinked;
};

export const getProfileInfoCreatedAt = () => {
  return profileDataStore.get().data.generalInfo.createdAt;
};

export const setProfileInfoIsFollowing = (isFollowing: boolean) => {
  profileDataStore.set({
    ...profileDataStore.get(),
    data: {
      ...profileDataStore.get().data,
      generalInfo: {
        ...profileDataStore.get().data.generalInfo,
        isFollowing,
      },
    },
  });
};

export const getProfileInfoIsFollowing = () => {
  return profileDataStore.get().data.generalInfo.isFollowing;
};
