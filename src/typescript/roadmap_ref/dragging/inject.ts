import {
  DraggingBehavior,
  IDraggingElementIdentifiers,
  IDraggingElementType,
  IDraggingStrategies,
} from '@src/typescript/roadmap_ref/dragging/core';
import { draggingStrategyFactory } from '@src/typescript/roadmap_ref/dragging/strategies';

export function injectDraggingElementIdentifier(
  draggingBehavior: DraggingBehavior,
  draggingElementIdentifier: IDraggingElementIdentifiers
) {
  draggingBehavior.draggingElementIdentifier = draggingElementIdentifier;
}

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
  draggingBehavior.draggingStrategy = draggingStrategyFactory(
    draggingBehavior,
    draggingStrategyType
  );
}

export function injectDraggingElementType(
  draggingBehavior: DraggingBehavior,
  draggingElementType: IDraggingElementType
) {
  draggingBehavior.draggingElementType = draggingElementType;
}
