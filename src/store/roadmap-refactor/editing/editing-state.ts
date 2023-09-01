import { atom } from 'nanostores';
import { editingStateChangeSideEffects } from '@store/roadmap-refactor/editing/editing-state-side-effects';

export type IEditingState = 'nodes' | 'connections';
const editingStateStore = atom({
  editingStateValue: 'nodes',
} as {
  editingStateValue: IEditingState;
});
export function setEditingState(state: IEditingState) {
  const original = editingStateStore.get();
  editingStateChangeSideEffects(original.editingStateValue, state);
  editingStateStore.set({ ...original, editingStateValue: state });
}

export function getEditingState() {
  const original = editingStateStore.get();
  return original.editingStateValue;
}

export default editingStateStore;
