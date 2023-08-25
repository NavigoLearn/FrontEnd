import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';
import { addDragabilityProtocol } from '@src/typescript/roadmap_ref/render/dragging';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { setDraggableElement } from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/editor-selected-data';

export function draggableElementProtocol(
  draggingBehavior: DraggingBehavior,
  id: string
) {
  addDragabilityProtocol(draggingBehavior);
  afterEventLoop(() => {
    setDraggableElement(id, true);
  });
  triggerRerenderEditor();
}
