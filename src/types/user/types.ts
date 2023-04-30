export type User = {
  userId: string;
  profilePictureUrl: string;
  name: string;
  followerCount: number;
  followingCount: number;
  quote: string;
  websiteUrl: string;
  bio: string;
  roadmapsCount: number;
};

export type UserResponse = {
  userId: string;
  profilePictureUrl: string;
  name: string;
  followerCount: string;
  followingCount: string;
  quote: string;
  websiteUrl: string;
  bio: string;
  roadmapsCount: string;
};
