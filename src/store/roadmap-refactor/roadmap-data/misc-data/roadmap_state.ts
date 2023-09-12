import { atom } from 'nanostores';

export type IRoadmapState = 'edit' | 'view';
export type IRoadmapStateStore = {
  roadmapState: IRoadmapState; // concerned with the state of the roadmap AT RUNTIME
  save: boolean;
  loaded: boolean;
  starterTab: boolean;
  hiddenProgress: boolean;
};

// THIS STORE IS CONCERNED WITH ROADMAP STATE AT RUNTIME
const roadmapStateStore = atom({
  roadmapState: 'view',
  save: true,
  loaded: false,
  starterTab: false,
  hiddenProgress: false,
} as IRoadmapStateStore);

export default roadmapStateStore;

export function setHasStarterTab(state: boolean) {
  const original = roadmapStateStore.get();
  roadmapStateStore.set({ ...original, starterTab: state });
}

export function getStarterTabState() {
  const original = roadmapStateStore.get();
  return original.starterTab;
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

export function setRoadmapIsLoaded() {
  const original = roadmapStateStore.get();
  roadmapStateStore.set({ ...original, loaded: true });
}

export function getIsEditable() {
  const original = roadmapStateStore.get();
  return original.roadmapState === 'edit';
}
export function getIsEditing() {
  const original = roadmapStateStore.get();
  return original.roadmapState === 'edit';
}

export function setHideProgress(state: boolean) {
  const original = roadmapStateStore.get();
  roadmapStateStore.set({ ...original, hiddenProgress: state });
}

export function toggleProgressView() {
  const original = roadmapStateStore.get();
  roadmapStateStore.set({
    ...original,
    hiddenProgress: !original.hiddenProgress,
  });
}

export function getHideProgress() {
  const original = roadmapStateStore.get();
  return original.hiddenProgress;
}
