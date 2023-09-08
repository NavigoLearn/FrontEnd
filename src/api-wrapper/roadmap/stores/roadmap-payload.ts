import { atom } from 'nanostores';
import storeRoadmapAbout from '@store/roadmap-refactor/roadmap-data/roadmap-about';
import { getRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';

export type IBackendRoadmapFormat = {
  name: string;
  description: string;
  isPublic: boolean;
  isDraft: boolean;
  createdAt?: string;
  updatedAt?: string;
  data: string; // base64 encoded json
};

export const storeRoadmapPostPayload = atom({} as IBackendRoadmapFormat);

export function setPostRoadmapPayloadFromExistingStores() {
  const roadmapPayload: IBackendRoadmapFormat = {
    name: storeRoadmapAbout.get().name,
    description: storeRoadmapAbout.get().description,
    isPublic: false,
    isDraft: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    data: btoa(JSON.stringify(getRoadmapSelector())),
  };
  storeRoadmapPostPayload.set({ ...roadmapPayload });
}

export function setPostRoadmapPostPayloadIsDraft(isDraft: boolean) {
  storeRoadmapPostPayload.set({
    ...storeRoadmapPostPayload.get(),
    isDraft,
  });
}

export function setPostRoadmapPostPayloadIsPublic(isPublic: boolean) {
  storeRoadmapPostPayload.set({
    ...storeRoadmapPostPayload.get(),
    isPublic,
  });
}
