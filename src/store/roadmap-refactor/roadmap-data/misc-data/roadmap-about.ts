import { atom } from 'nanostores';
import {
  type IVersions,
  ROADMAP_CURRENT_VERSION,
} from '@store/roadmap-refactor/roadmap-data/params/params-base-roadmap';

export type IRoadmapType = 'create' | 'public' | 'draft';

export type IRoadmapAbout = {
  roadmapType: IRoadmapType;
  roadmapId: string;
  name: string;
  ownerId: string;
  description: string;
  version: IVersions;
};

const BOILERPLATE_ROADMAP_ABOUT: IRoadmapAbout = {
  roadmapType: 'create', // concerned with the type of the roadmap BEFORE RUNTIME
  name: '',
  roadmapId: '',
  ownerId: '',
  description: '',
  version: ROADMAP_CURRENT_VERSION,
};

export const DEFAULT_NAME = 'Untitled Roadmap';
export const DEFAULT_DESCRIPTION = 'No description';

const storeRoadmapAbout = atom(BOILERPLATE_ROADMAP_ABOUT as IRoadmapAbout);

export default storeRoadmapAbout;

export function setRoadmapAboutName(newName: string) {
  const store = storeRoadmapAbout.get();
  storeRoadmapAbout.set({ ...store, name: newName });
}

export function setRoadmapAboutDescription(newDescription: string) {
  const store = storeRoadmapAbout.get();
  storeRoadmapAbout.set({ ...store, description: newDescription });
}

export function setRoadmapAboutOwnerId(newOwnerId: string) {
  const store = storeRoadmapAbout.get();
  storeRoadmapAbout.set({ ...store, ownerId: newOwnerId });
}

export function setRoadmapType(type: IRoadmapType) {
  const store = storeRoadmapAbout.get();
  storeRoadmapAbout.set({ ...store, roadmapType: type });
}

export function getRoadmapType() {
  const store = storeRoadmapAbout.get();
  return store.roadmapType;
}

export function setRoadmapId(id: string) {
  const store = storeRoadmapAbout.get();
  storeRoadmapAbout.set({ ...store, roadmapId: id });
}

export function getIsCreate() {
  const store = storeRoadmapAbout.get();
  return store.roadmapType === 'create';
}

export function getIsPublic() {
  const store = storeRoadmapAbout.get();
  return store.roadmapType === 'public';
}

export function getIsDraft() {
  const store = storeRoadmapAbout.get();
  return store.roadmapType === 'draft';
}

export function getRoadmapAbout() {
  return storeRoadmapAbout.get();
}

export function fetchRoadmapAboutPost() {
  const store = storeRoadmapAbout.get();
  return {
    name: store.name,
    description: store.description,
    ownerId: store.ownerId,
  };
}

export function getRoadmapId() {
  const store = storeRoadmapAbout.get();
  return store.roadmapId;
}

export function setRoadmapVersion(version: IVersions) {
  const store = storeRoadmapAbout.get();
  storeRoadmapAbout.set({ ...store, version });
}

export function getRoadmapVersion() {
  const store = storeRoadmapAbout.get();
  return store.version;
}
