import { atom } from 'nanostores';
import { type User, type UserResponse } from '@type/user/types';
import { checkIsTypeUser } from '@type/user/typecheckers';
import { processUserUrlPic } from '@src/typescript/user/misc';
import { fetchUserData } from '../../api-wrapper/user/routes-user';

const generateUserBoilerplate = (): User => ({
  userId: '',
  profilePictureUrl:
    'https://media.istockphoto.com/id/470100848/ro/vector/pictograma-profilului-masculin-alb%C4%83-pe-fundal-albastru.jpg?s=612x612&w=0&k=20&c=-We-8zY-Oj7MMSuKwpOEkm7QUX8Gnc4Bk0KcBIO8lYY=',
  name: '',
  followerCount: 0,
  followingCount: 0,
  quote: '',
  websiteUrl: '',
  bio: '',
  roadmapsCount: 0,
  isFollowing: false,
});

const parseResponse = (response: UserResponse): User => {
  if (!checkIsTypeUser(response)) {
    throw new Error('Response is not of type User');
  }
  // parses some of the response properties-page to the correct type
  const parsedResponse: User = { ...response };
  parsedResponse.followerCount = parseInt(response.followerCount, 10);
  parsedResponse.followingCount = parseInt(response.followingCount, 10);
  parsedResponse.roadmapsCount = parseInt(response.roadmapsCount, 10);
  return parsedResponse;
};

const userDisplay = atom(generateUserBoilerplate() as User);

export const fetchUserAndSetStore = async (id: string) => {
  const originalUser = userDisplay.get();
  const { data, status } = await fetchUserData(id);
  if (status === 404) {
    throw new Error('User not found');
  }

  if (!checkIsTypeUser(data)) {
    throw new Error('Response is not of type User');
  }
  const parsedResponse = parseResponse(data);
  if (parsedResponse.profilePictureUrl === '') {
    parsedResponse.profilePictureUrl = originalUser.profilePictureUrl;
  }
  userDisplay.set({ ...parsedResponse });
};

export const setProfilePictureUrl = (profilePictureUrl: string) => {
  const originalUser = userDisplay.get();
  const newProfilePictureUrl = processUserUrlPic(profilePictureUrl);
  userDisplay.set({ ...originalUser, profilePictureUrl });
};

export default userDisplay;
