import { atom } from 'nanostores';

export type IRoadmapState = 'edit' | 'view';
export type IRoadmapStateStore = {
  roadmapState: IRoadmapState; // concerned with the state of the roadmap AT RUNTIME
  save: boolean;
  loaded: boolean;
  id: string;
  starterTab: boolean;
};

// THIS STORE IS CONCERNED WITH ROADMAP STATE AT RUNTIME
const roadmapStateStore = atom({
  roadmapState: 'view',
  save: true,
  loaded: false,
  starterTab: false,
  id: '',
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
  return original.roadmapState === 'edit';
}
export function getIsEditing() {
  const original = roadmapStateStore.get();
  return original.roadmapState === 'edit';
}
