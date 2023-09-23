import { type IMouseDragDirection } from '@src/to-be-organized/resize-dragging/stores-resize-node';
import { getResizeNodeCallbacks } from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate-resize-protocols';
import { type IElementType } from '@src/to-be-organized/resize-dragging/stores-resize-shared-data';
import { getResizeComponentCallbacks } from '@src/typescript/roadmap_ref/node/components/mutate-resize-protocols';

export function getResizeCallback(
  direction: IMouseDragDirection,
  type: IElementType
) {
  if (type === 'node') {
    return (deltaXMouse, deltaYMouse) => {
      getResizeNodeCallbacks(direction)(deltaXMouse, deltaYMouse);
    };
  }
  if (type === 'component') {
    return (deltaXMouse, deltaYMouse) => {
      getResizeComponentCallbacks(direction)(deltaXMouse, deltaYMouse);
    };
  }

  throw new Error('Not implemented yet');
}
