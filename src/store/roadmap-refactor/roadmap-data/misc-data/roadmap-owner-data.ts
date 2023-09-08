import { atom } from 'nanostores';

export const storeRoadmapOwnerData = atom({
  loaded: false,
  roadmapId: '',
  ownerId: '',
  ownerAvatar: '',
  ownerName: '',
} as {
  loaded: boolean;
  roadmapId: string;
  ownerId: string;
  ownerAvatar: string;
  ownerName: string;
});

export function setRoadmapOwnerData(
  roadmapId: string,
  ownerId: string,
  ownerAvatar: string,
  ownerName: string
) {
  const original = storeRoadmapOwnerData.get();
  storeRoadmapOwnerData.set({
    ...original,
    loaded: true,
    roadmapId,
    ownerId,
    ownerAvatar,
    ownerName,
  });
}

export function getRoadmapOwnerData() {
  return storeRoadmapOwnerData.get();
}
