import { type IMouseDragDirection } from '@src/to-be-organized/resize-dragging/stores-resize-node';
import {
  getResizeComponentInitialSize,
  getResizeComponentRef,
} from '@src/to-be-organized/resize-dragging/stores-resize-components';
import { mutateComponentWidth } from '@src/typescript/roadmap_ref/node/components/mutate';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes.ts';
import { injectComponentParentNodeId } from '@src/typescript/roadmap_ref/node/components/text/inject.ts';
import { getSelectedNodeId } from '@store/roadmap-refactor/elements-editing/store-editor-selected-data.ts';

type IMutateFunction = (deltaXMouse: number, deltaYMouse: number) => void;

export function getResizeComponentCallbacks(
  direction: IMouseDragDirection
): IMutateFunction {
  const component = getResizeComponentRef();
  return (deltaXMouse, deltaYMouse) => {
    const { width, height } = getResizeComponentInitialSize();
    // console.log('deltaXMouse and original Width', deltaXMouse, width);
    const newWidth = width + deltaXMouse * 2;
    mutateComponentWidth(component, Math.round(newWidth));

    // patch for corrupted data in some roadmaps where the mutate nodes ids in templating
    // was not mutating some components fine
    if (component.parentNodeId === '0') {
      injectComponentParentNodeId(component, getSelectedNodeId());
    }
  };
}
