import { atom } from 'nanostores';

export type IRoadmapType = 'create' | 'public' | 'draft';

export type IRoadmapAbout = {
  roadmapType: IRoadmapType;
  roadmapId: string;
  name: string;
  ownerId: string;
  description: string;
};

const BOILERPLATE_ROADMAP_ABOUT: IRoadmapAbout = {
  roadmapType: 'create', // concerned with the type of the roadmap BEFORE RUNTIME
  name: 'Untitled',
  roadmapId: '',
  ownerId: '',
  description: 'No description',
};

export const DEFAULT_NAME = '';
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

export function setRoadmapAboutId(id: string) {
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
