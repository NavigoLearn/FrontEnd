import { atom } from 'nanostores';

export type IEditingState = 'nodes' | 'connections';
const editingState = atom({
  roadmapState: 'nodes',
} as {
  roadmapState: IEditingState;
});

export function setEditingState(state: IEditingState) {
  const original = editingState.get();
  editingState.set({ ...original, roadmapState: state });
}

export function getEditingState() {
  const original = editingState.get();
  return original.roadmapState;
}

export default editingState;
