import {
  DraggingBehavior,
  draggingElementIdentifiers,
  draggingStrategies,
} from '@src/typescript/roadmap_ref/dragging/core';
import { draggingStrategyFactory } from '@src/typescript/roadmap_ref/dragging/strategies';

export function injectDraggingSpace(
  draggingBehavior: DraggingBehavior,
  draggingSpace: string | null
) {
  draggingBehavior.draggingSpaceId = draggingSpace;
}

export function injectRootDraggingSpace(
  draggingBehavior: DraggingBehavior,
  rootDraggingSpace: string | null
) {
  draggingBehavior.rootDraggingSpaceId = rootDraggingSpace;
}

export function injectDraggingElementIdentifier(
  draggingBehavior: DraggingBehavior,
  draggingElementIdentifier: draggingElementIdentifiers
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
  draggingStrategyType: draggingStrategies
) {
  draggingBehavior.draggingStrategyType = draggingStrategyType;
  draggingBehavior.draggingStrategy = draggingStrategyFactory(
    draggingBehavior,
    draggingStrategyType
  );
}
