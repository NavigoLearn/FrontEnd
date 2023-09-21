import { type IComponentObject } from '@type/roadmap/node/components-types';
import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';

export function injectComponentParentNodeId(
  component: IComponentObject,
  parentNodeId: string
) {
  component.parentNodeId = parentNodeId;
}

export function injectComponentDraggingBehavior(
  component: IComponentObject,
  draggingBehavior: DraggingBehavior
) {
  component.draggingBehavior = draggingBehavior;
}
