import { atom } from 'nanostores';
import { clearSelectedConnection } from '@components/roadmap/connections/connection-editing/connection-store';
import { closeEditorProtocol } from '@src/to-be-organized/nodeview/actions-manager';

export type IEditingState = 'nodes' | 'connections';
const editingStateStore = atom({
  editingStateValue: 'nodes',
} as {
  editingStateValue: IEditingState;
});

export function editingStateChangeSideEffects(
  oldState: IEditingState,
  newState: IEditingState
) {
  if (oldState === 'nodes' && newState === 'connections') {
    closeEditorProtocol();
  }
  if (oldState === 'connections' && newState === 'nodes') {
    clearSelectedConnection();
  }
}
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
