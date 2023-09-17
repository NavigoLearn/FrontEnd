import {
  IElementType,
  IMouseDragDirection,
} from '@src/to-be-organized/resize-dragging/stores-resize';
import { getResizeNodeCallbacks } from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate-resize';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

export function getResizeCallback(
  direction: IMouseDragDirection,
  type: IElementType,
  ref: NodeClass
) {
  if (type === 'node') {
    return (deltaXMouse, deltaYMouse) => {
      getResizeNodeCallbacks(direction)(ref, deltaXMouse, deltaYMouse);
    };
  }

  throw new Error('Not implemented yet');
}
