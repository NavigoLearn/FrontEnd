import { atom } from 'nanostores';
import { type UserResponse } from '@type/user/types';

type IRoadmapOwnerData = {
  loaded: boolean;
  ownerId: string;
  ownerAvatar: string;
  ownerName: string;
};
export const DEFAULT_OWNER_AVATAR =
  'https://media.istockphoto.com/id/470100848/ro/vector/pictograma-profilului-masculin-alb%C4%83-pe-fundal-albastru.jpg?s=612x612&w=0&k=20&c=-We-8zY-Oj7MMSuKwpOEkm7QUX8Gnc4Bk0KcBIO8lYY=';

export const storeRoadmapOwnerData = atom({
  loaded: false,
  ownerId: '',
  ownerAvatar: '',
  ownerName: '',
} as IRoadmapOwnerData);

export function setRoadmapOwnerData(adaptedOwnerData: IRoadmapOwnerData) {
  const original = storeRoadmapOwnerData.get();
  const { ownerId, ownerAvatar, ownerName } = adaptedOwnerData;
  const adjustedOwnerAvatar = ownerAvatar || DEFAULT_OWNER_AVATAR;
  storeRoadmapOwnerData.set({
    ...original,
    loaded: true,
    ownerId,
    ownerAvatar: adjustedOwnerAvatar,
    ownerName,
  });
}

export function getRoadmapOwnerData() {
  return storeRoadmapOwnerData.get();
}

export function adapterUserDataToRoadmapOwnerData(
  userData: UserResponse
): IRoadmapOwnerData {
  const { id, avatar, name } = userData;
  return {
    loaded: true,
    ownerId: id,
    ownerAvatar: avatar,
    ownerName: name,
  };
}
