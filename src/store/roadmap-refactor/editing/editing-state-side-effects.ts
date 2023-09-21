import { closeEditorProtocol } from '@src/to-be-organized/node-rendering-stuff/actions-manager';
import { clearSelectedConnection } from '@components/roadmap/connections/connection-editing/connection-store';
import { type IEditingState } from '@store/roadmap-refactor/editing/editing-state';

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
