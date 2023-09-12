export type generalInfo = {
  readonly followerCount: number;
  readonly followingCount: number;
  readonly githubLinked: boolean;
  readonly googleLinked: boolean;
  readonly createdAt: string;
  readonly isFollowing: boolean;
};

export type ProfileInfo = {
  readonly id: number;
  avatar: string | null;
  readonly quote: string | null;
  readonly name: string;
  readonly githubUrl: string | null;
  readonly websiteUrl: string | null;
  readonly bio: string | null;
};

export type ActivityInfo = {
  readonly roadmapsCount: number;
  readonly roadmapsViews: number;
  readonly roadmapsLikes: number;
};

export type UserData = {
  readonly generalInfo: generalInfo;
  readonly profileInfo: ProfileInfo;
  readonly activityInfo: ActivityInfo;
};

export type ProfileDataReponse = {
  data: UserData;
  message: string;
  success: boolean;
};
