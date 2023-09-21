import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';
import { addDragabilityProtocol } from '@src/typescript/roadmap_ref/render/dragging';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { setElementDraggable } from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';

export function draggableElementProtocol(
  draggingBehavior: DraggingBehavior,
  id: string
) {
  addDragabilityProtocol(draggingBehavior);
  afterEventLoop(() => {
    setElementDraggable(id, true);
  });
  triggerRerenderEditor();
}
