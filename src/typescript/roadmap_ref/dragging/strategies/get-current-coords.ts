import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { getComponentById } from '@src/typescript/roadmap_ref/node/core/data-get/components';
import {
  DraggingBehavior,
  type ICoords,
} from '@src/typescript/roadmap_ref/dragging/core';

type IGetCurrentCoordsStrategy = () => {
  x: number;
  y: number;
};

export const getCurrentCoordsNode = (
  draggingBehavior: DraggingBehavior
): ICoords => {
  const nodeId = draggingBehavior.draggingElementId;
  const node = getNodeByIdRoadmapSelector(nodeId);
  return {
    x: node.data.coords.x,
    y: node.data.coords.y,
  };
};

export const getCurrentCoordsComponent = (
  draggingBehavior: DraggingBehavior
): ICoords => {
  const nodeId = draggingBehavior.additionalData.parentNodeId;
  const componentId = draggingBehavior.draggingElementId;
  const node = getNodeByIdRoadmapSelector(nodeId);
  const component = getComponentById(node, componentId);
  return {
    x: component.x,
    y: component.y,
  };
};

export const getCurrentCoordsStrategyFactory = (
  draggingBehavior: DraggingBehavior
): IGetCurrentCoordsStrategy => {
  const elementType = draggingBehavior.draggingElementType;
  if (elementType === 'node' || elementType === 'subNode')
    return () => {
      return getCurrentCoordsNode(draggingBehavior);
    };
  if (elementType === 'component')
    return () => {
      return getCurrentCoordsComponent(draggingBehavior);
    };
  throw new Error('invalid element type');
};
