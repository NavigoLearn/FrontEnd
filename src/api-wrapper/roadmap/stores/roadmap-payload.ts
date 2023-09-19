import { atom } from 'nanostores';
import storeRoadmapAbout, {
  DEFAULT_DESCRIPTION,
  DEFAULT_NAME,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';
import { getRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { encodeBase64 } from '@src/typescript/utils/misc';

export type IBackendRoadmapFormat = {
  name: string;
  description: string;
  isPublic: boolean;
  isDraft: boolean;
  createdAt?: string;
  updatedAt?: string;
  version: string;
  data: string; // base64 encoded json
  miscData: string; // base64 encoded json
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
    version: storeRoadmapAbout.get().version,
    data: encodeBase64(JSON.stringify(getRoadmapSelector())),
    miscData: encodeBase64(JSON.stringify(getRoadmapSelector().data)),
  };
  storeRoadmapPostPayload.set({ ...roadmapPayload });
}

export function setPostRoadmapPostPayloadIsDraft(isDraft: boolean) {
  storeRoadmapPostPayload.set({
    ...storeRoadmapPostPayload.get(),
    isDraft,
  });
}

export function setPostRoadmapPostPayloadIsNotBanned(isPublic: boolean) {
  storeRoadmapPostPayload.set({
    ...storeRoadmapPostPayload.get(),
    isPublic,
  });
}

export function validateRoadmapPostPayload() {
  const store = storeRoadmapPostPayload.get();
  if (!store.name) {
    throw new Error('Roadmap name is missing');
  }
  if (!store.description) {
    throw new Error('Roadmap description is missing');
  }
  if (!store.data) {
    throw new Error('Roadmap data is missing');
  }
}

export function replaceRoadmapPostPayloadMissingWithDefaults() {
  const store = storeRoadmapPostPayload.get();
  if (!store.name) {
    store.name = DEFAULT_NAME;
  }
  if (!store.description) {
    store.description = DEFAULT_DESCRIPTION;
  }
  storeRoadmapPostPayload.set(store);
}
