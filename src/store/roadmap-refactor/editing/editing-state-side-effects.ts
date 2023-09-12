import { closeEditorProtocol } from '@src/to-be-organized/nodeview/actions-manager';
import { clearSelectedConnection } from '@components/roadmap/connections/connection-editing/connection-store';
import { IEditingState } from '@store/roadmap-refactor/editing/editing-state';

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
