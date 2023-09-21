import { type INodeResizeEvent } from '@src/to-be-organized/undo-redo/undo-types';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import {
  mutateNodeCoordX,
  mutateNodeCoordY,
  mutateNodeHeight,
  mutateNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { storeUndoStack } from '@src/to-be-organized/undo-redo/store-undo-functionality';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { triggerNodeConnectionsRerender } from '@src/to-be-organized/triggering-stuff-alert/trigger-connections';

function undoNodeResize(event: INodeResizeEvent) {
  const node = getNodeByIdRoadmapSelector(event.nodeId);
  if (!node) {
    return;
  }
  mutateNodeWidth(node, event.initialData.width);
  mutateNodeHeight(node, event.initialData.height);
  mutateNodeCoordX(node, event.initialData.x);
  mutateNodeCoordY(node, event.initialData.y);
  triggerNodeRerender(node.id);
  triggerNodeConnectionsRerender(node.id);
}

export function undoEvent() {
  const mostRecentEvent = storeUndoStack.get().stack.pop();
  if (!mostRecentEvent) return;
  if (mostRecentEvent.eventType === 'node-resize') {
    undoNodeResize(mostRecentEvent);
    return;
  }
  console.warn('undoEvent: unknown event type');
}
