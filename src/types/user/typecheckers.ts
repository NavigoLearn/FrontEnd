import { type User } from '@type/user/types';

export const a = 1;
export const checkIsTypeUser = (obj: any): obj is User => {
  return (
    'userId' in obj &&
    'profilePictureUrl' in obj &&
    'name' in obj &&
    'followerCount' in obj &&
    'followingCount' in obj &&
    'quote' in obj &&
    'websiteUrl' in obj &&
    'bio' in obj &&
    'roadmapsCount' in obj
  );
};
