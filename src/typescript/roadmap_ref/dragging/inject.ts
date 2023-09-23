import {
  DraggingBehavior,
  type IDraggingElementType,
  type IDraggingStrategies,
} from '@src/typescript/roadmap_ref/dragging/core';

export function injectDraggingElementId(
  draggingBehavior: DraggingBehavior,
  draggingElementId: string
) {
  draggingBehavior.draggingElementId = draggingElementId;
}

export function injectDraggingStrategy(
  draggingBehavior: DraggingBehavior,
  draggingStrategyType: IDraggingStrategies
) {
  draggingBehavior.draggingStrategyType = draggingStrategyType;
}

export function injectDraggingElementType(
  draggingBehavior: DraggingBehavior,
  draggingElementType: IDraggingElementType
) {
  draggingBehavior.draggingElementType = draggingElementType;
}

export function injectDraggingParentNodeId(
  draggingBehavior: DraggingBehavior,
  parentNodeId: string
) {
  draggingBehavior.additionalData = {
    parentNodeId,
  };
}
