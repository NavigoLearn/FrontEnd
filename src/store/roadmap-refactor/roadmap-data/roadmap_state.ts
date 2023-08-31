import { atom } from 'nanostores';

export type IRoadmapState = 'create' | 'edit' | 'view' | 'draft';
export type IRoadmapStateStore = {
  roadmapState: IRoadmapState;
  save: boolean;
  loaded: boolean;
  rerender: boolean;
  id: string;
  userId: string;
  starterTab: boolean;
}
const roadmapStateStore = atom({
  roadmapState: 'view', // used to determine if the roadmap is being created, edited or viewed
  save: true, // and if the elements-editing state should be saved or not
  loaded: false, // used to determine if the roadmap has been loaded
  rerender: false, // used to rerender roadmap
  id: '', // the id of the roadmap
  userId: '',
  starterTab: false,
} as IRoadmapStateStore);

export default roadmapStateStore;

export function setSaveTrue() {
  const original = roadmapStateStore.get();
  roadmapStateStore.set({ ...original, save: true });
}

export function setRoadmapState(state: IRoadmapState) {
  const original = roadmapStateStore.get();
  roadmapStateStore.set({ ...original, roadmapState: state });
}

export function getRoadmapState() {
  const original = roadmapStateStore.get();
  return original.roadmapState;
}

export function getRoadmapStateStore() {
  return roadmapStateStore.get();
}

export function setRoadmapStateStore(state: IRoadmapStateStore) {
    const original = roadmapStateStore.get();
    roadmapStateStore.set({ ...original, ...state });
}

export function setRoadmapId(id: string) {
  const original = roadmapStateStore.get();
  roadmapStateStore.set({ ...original, id });
}

export function getRoadmapId() {
  const original = roadmapStateStore.get();
  return original.id;
}

export function setRoadmapIsLoaded() {
  const original = roadmapStateStore.get();
  roadmapStateStore.set({ ...original, loaded: true });
}

export function getIsEditable() {
  const original = roadmapStateStore.get();
  return original.roadmapState === 'edit' || original.roadmapState === 'create';
}
export function getIsEditing() {
  const original = roadmapStateStore.get();
  return original.roadmapState === 'edit';
}

export function getIsCreate() {
  const original = roadmapStateStore.get();
  return original.roadmapState === 'create';
}

export function getIsView() {
  const original = roadmapStateStore.get();
  return original.roadmapState === 'view';
}

export function getIsDraft() {
  const original = roadmapStateStore.get();
  return original.roadmapState === 'draft';
}

export function rerenderRoadmap() {
  const original = roadmapStateStore.get();
  roadmapStateStore.set({ ...original, rerender: !original.rerender });
}
