import { atom } from 'nanostores';
import { storeProfileData } from './store-profile-data';

type IProfilePages = 'profile' | 'activity' | 'roadmaps';

export const profilePagesArray: IProfilePages[] = [
  'profile',
  'activity',
  'roadmaps',
];

export const storeSelectedProfilePage = atom({
  currentPage: 'profile',
  isEditing: false,
} as {
  currentPage: IProfilePages;
  isEditing: boolean;
});

export function setProfilePage(page: IProfilePages) {
  const originalStore = storeSelectedProfilePage.get();
  storeSelectedProfilePage.set({
    ...originalStore,
    currentPage: page,
  });
}

export function getProfilePage() {
  return storeSelectedProfilePage.get().currentPage;
}

export function setProfilePageEditing(isEditing: boolean) {
  const originalStore = storeSelectedProfilePage.get();
  storeSelectedProfilePage.set({
    ...originalStore,
    isEditing,
  });
}

export function getProfilePageEditing() {
  return storeSelectedProfilePage.get().isEditing;
}

export const setProfileInfoId = (id: number) => {
  storeProfileData.set({
    ...storeProfileData.get(),
    data: {
      ...storeProfileData.get().data,
      profileInfo: {
        ...storeProfileData.get().data.profileInfo,
        id,
      },
    },
  });
};

export const getProfileInfoId = () => {
  return storeProfileData.get().data.profileInfo.id;
};

export const setProfileInfoAvatar = (avatar: string | null) => {
  storeProfileData.set({
    ...storeProfileData.get(),
    data: {
      ...storeProfileData.get().data,
      profileInfo: {
        ...storeProfileData.get().data.profileInfo,
        avatar,
      },
    },
  });
};

export const getProfileInfoAvatar = () => {
  return storeProfileData.get().data.profileInfo.avatar;
};

export const setProfileInfoName = (name: string) => {
  storeProfileData.set({
    ...storeProfileData.get(),
    data: {
      ...storeProfileData.get().data,
      profileInfo: {
        ...storeProfileData.get().data.profileInfo,
        name,
      },
    },
  });
};

export const getProfileInfoName = () => {
  return storeProfileData.get().data.profileInfo.name;
};

export const setProfileInfoBio = (bio: string | null) => {
  storeProfileData.set({
    ...storeProfileData.get(),
    data: {
      ...storeProfileData.get().data,
      profileInfo: {
        ...storeProfileData.get().data.profileInfo,
        bio,
      },
    },
  });
};

export const getProfileInfoBio = () => {
  return storeProfileData.get().data.profileInfo.bio;
};

export const setProfileInfoQuote = (quote: string | null) => {
  storeProfileData.set({
    ...storeProfileData.get(),
    data: {
      ...storeProfileData.get().data,
      profileInfo: {
        ...storeProfileData.get().data.profileInfo,
        quote,
      },
    },
  });
};

export const getProfileInfoQuote = () => {
  return storeProfileData.get().data.profileInfo.quote;
};

export const setProfileInfoWebsiteUrl = (websiteUrl: string | null) => {
  storeProfileData.set({
    ...storeProfileData.get(),
    data: {
      ...storeProfileData.get().data,
      profileInfo: {
        ...storeProfileData.get().data.profileInfo,
        websiteUrl,
      },
    },
  });
};

export const getProfileInfoWebsiteUrl = () => {
  return storeProfileData.get().data.profileInfo.websiteUrl;
};

export const setProfileInfoGithubUrl = (githubUrl: string | null) => {
  storeProfileData.set({
    ...storeProfileData.get(),
    data: {
      ...storeProfileData.get().data,
      profileInfo: {
        ...storeProfileData.get().data.profileInfo,
        githubUrl,
      },
    },
  });
};

export const getProfileInfoGithubUrl = () => {
  return storeProfileData.get().data.profileInfo.githubUrl;
};

export const setProfileInfoRoadmapsCount = (roadmapsCount: number) => {
  storeProfileData.set({
    ...storeProfileData.get(),
    data: {
      ...storeProfileData.get().data,
      activityInfo: {
        ...storeProfileData.get().data.activityInfo,
        roadmapsCount,
      },
    },
  });
};

export const getProfileInfoRoadmapsCount = () => {
  return storeProfileData.get().data.activityInfo.roadmapsCount;
};

export const setProfileInfoRoadmapsViews = (roadmapsViews: number) => {
  storeProfileData.set({
    ...storeProfileData.get(),
    data: {
      ...storeProfileData.get().data,
      activityInfo: {
        ...storeProfileData.get().data.activityInfo,
        roadmapsViews,
      },
    },
  });
};

export const getProfileInfoRoadmapsViews = () => {
  return storeProfileData.get().data.activityInfo.roadmapsViews;
};

export const setProfileInfoRoadmapsLikes = (roadmapsLikes: number) => {
  storeProfileData.set({
    ...storeProfileData.get(),
    data: {
      ...storeProfileData.get().data,
      activityInfo: {
        ...storeProfileData.get().data.activityInfo,
        roadmapsLikes,
      },
    },
  });
};

export const getProfileInfoRoadmapsLikes = () => {
  return storeProfileData.get().data.activityInfo.roadmapsLikes;
};

export const setProfileInfoFollowerCount = (followerCount: number) => {
  storeProfileData.set({
    ...storeProfileData.get(),
    data: {
      ...storeProfileData.get().data,
      generalInfo: {
        ...storeProfileData.get().data.generalInfo,
        followerCount,
      },
    },
  });
};

export const getProfileInfoFollowerCount = () => {
  return storeProfileData.get().data.generalInfo.followerCount;
};

export const setProfileInfoFollowingCount = (followingCount: number) => {
  storeProfileData.set({
    ...storeProfileData.get(),
    data: {
      ...storeProfileData.get().data,
      generalInfo: {
        ...storeProfileData.get().data.generalInfo,
        followingCount,
      },
    },
  });
};

export const getProfileInfoFollowingCount = () => {
  return storeProfileData.get().data.generalInfo.followingCount;
};

export const setProfileInfoGithubLinked = (githubLinked: boolean) => {
  storeProfileData.set({
    ...storeProfileData.get(),
    data: {
      ...storeProfileData.get().data,
      generalInfo: {
        ...storeProfileData.get().data.generalInfo,
        githubLinked,
      },
    },
  });
};

export const getProfileInfoGithubLinked = () => {
  return storeProfileData.get().data.generalInfo.githubLinked;
};

export const setProfileInfoGoogleLinked = (googleLinked: boolean) => {
  storeProfileData.set({
    ...storeProfileData.get(),
    data: {
      ...storeProfileData.get().data,
      generalInfo: {
        ...storeProfileData.get().data.generalInfo,
        googleLinked,
      },
    },
  });
};

export const getProfileInfoGoogleLinked = () => {
  return storeProfileData.get().data.generalInfo.googleLinked;
};

export const getProfileInfoCreatedAt = () => {
  return storeProfileData.get().data.generalInfo.createdAt;
};

export const setProfileInfoIsFollowing = (isFollowing: boolean) => {
  storeProfileData.set({
    ...storeProfileData.get(),
    data: {
      ...storeProfileData.get().data,
      generalInfo: {
        ...storeProfileData.get().data.generalInfo,
        isFollowing,
      },
    },
  });
};

export const getProfileInfoIsFollowing = () => {
  return storeProfileData.get().data.generalInfo.isFollowing;
};
