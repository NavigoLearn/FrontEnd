import {
  DraggingBehavior,
  ICoords,
  IDraggingElementType,
} from '@src/typescript/roadmap_ref/dragging/core';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  getNodeByIdRoadmapSelector,
  getNodeCenterAbsoluteCoords,
  getRootNodesIds,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import renderNodesStore from '@store/roadmap-refactor/render/rendered-nodes';
import { getComponentById } from '@src/typescript/roadmap_ref/node/core/data-get/components';
import { setSnappings } from '@store/roadmap-refactor/render/snapping-lines';
import { snapCoordsToPositions } from '@src/typescript/roadmap_ref/snapping/core';
import { getNodeCornerPositions } from '@src/typescript/roadmap_ref/snapping/generate-positions';

export const draggingStrategyFree = (draggingBehavior, newX, newY) => {
  return {
    x: newX,
    y: newY,
  };
};

export const dispatchSnappingLinesNestedElements = (
  lastClosestIndexX: number,
  lastClosestIndexY: number,
  positions: ICoords[],
  parentNode: NodeClass,
  coords: ICoords
) => {
  const snappings = [];
  if (lastClosestIndexX !== -1) {
    const position = getNodeCenterAbsoluteCoords(parentNode.id);
    const adjustedStart = {
      x: position.x + coords.x,
      y: position.y + coords.y,
    };
    const adjustedEnd = {
      x: position.x + positions[lastClosestIndexX].x,
      y: position.y + positions[lastClosestIndexX].y,
    };

    snappings.push({
      startX: adjustedStart.x,
      startY: adjustedStart.y,
      endX: adjustedEnd.x,
      endY: adjustedEnd.y,
    });
  }

  if (lastClosestIndexY !== -1) {
    const position = getNodeCenterAbsoluteCoords(parentNode.id);
    const adjustedStart = {
      x: position.x + coords.x,
      y: position.y + coords.y,
    };
    const adjustedEnd = {
      x: position.x + positions[lastClosestIndexY].x,
      y: position.y + positions[lastClosestIndexY].y,
    };

    snappings.push({
      startX: adjustedStart.x,
      startY: adjustedStart.y,
      endX: adjustedEnd.x,
      endY: adjustedEnd.y,
    });
  }

  setSnappings(snappings);
};

export const draggingStrategySnapRoadmapNestedComponents = (
  draggingBehavior: DraggingBehavior,
  newX: number,
  newY: number
) => {
  const nodeId = draggingBehavior.additionalData.parentNodeId;
  const parentNode = getNodeByIdRoadmapSelector(nodeId);
  const componentId = draggingBehavior.draggingElementId;
  const parentSubNodesIds = parentNode.subNodeIds;
  const parentComponents = parentNode.components;
  const parentSubNodes = parentSubNodesIds.map((subNodeId) => {
    return getNodeByIdRoadmapSelector(subNodeId);
  });
  const positions = [];

  positions.push({
    x: 0,
    y: 0,
  }); // middle

  parentSubNodes.forEach((subNode) => {
    positions.push({
      x: subNode.data.coords.x,
      y: subNode.data.coords.y,
    });
  });

  parentComponents.forEach((component) => {
    if (componentId === draggingBehavior.draggingElementId) return;
    positions.push({
      x: component.x,
      y: component.y,
    });
  });

  const coords = snapCoordsToPositions(newX, newY, positions);
  const { lastClosestIndexX, lastClosestIndexY } = coords;

  dispatchSnappingLinesNestedElements(
    lastClosestIndexX,
    lastClosestIndexY,
    positions,
    parentNode,
    coords
  );
  return {
    x: coords.x,
    y: coords.y,
  };
};

export const draggingStrategySnapRoadmapNestedNodes = (
  draggingBehavior,
  newX,
  newY
) => {
  const node = getNodeByIdRoadmapSelector(draggingBehavior.draggingElementId);
  const parentNode = getNodeByIdRoadmapSelector(node.properties.nestedWithin);
  const parentSubNodesIds = parentNode.subNodeIds;
  const parentComponents = parentNode.components;
  const parentSubNodes = parentSubNodesIds.map((subNodeId) => {
    return getNodeByIdRoadmapSelector(subNodeId);
  });
  const positions = [];

  positions.push({
    x: 0,
    y: 0,
  });

  parentSubNodes.forEach((subNode) => {
    if (subNode.id === draggingBehavior.draggingElementId) return;
    positions.push({
      x: subNode.data.coords.x,
      y: subNode.data.coords.y,
      width: subNode.data.width,
      height: subNode.data.height,
    });
  });

  parentComponents.forEach((component) => {
    positions.push({
      x: component.x,
      y: component.y,
      width: component.width,
      height: component.height,
    });
  });

  const coords = snapCoordsToPositions(newX, newY, positions);
  const { lastClosestIndexX, lastClosestIndexY } = coords;

  dispatchSnappingLinesNestedElements(
    lastClosestIndexX,
    lastClosestIndexY,
    positions,
    parentNode,
    coords
  );

  return {
    x: coords.x,
    y: coords.y,
  };
};

export const draggingStrategySnapRoadmapRootNodes = (
  draggingBehavior,
  newX,
  newY
) => {
  // we snap root roadmap nodes-page
  // get positions of all root nodes-page
  const rootNodesIds = getRootNodesIds();
  const renderedNodes = renderNodesStore.get().nodesIds;
  // filter out nodes-page that are not rendered
  const filteredRootNodes = rootNodesIds.filter((nodeId) => {
    return (
      renderedNodes.includes(nodeId) &&
      nodeId !== draggingBehavior.draggingElementId
    );
  });

  const rootNodesPositionsCenter = filteredRootNodes.map((nodeId) => {
    const node = getNodeByIdRoadmapSelector(nodeId);
    // returns the centers of the nodes since the roots are positioned by top left corner
    return {
      x: node.data.coords.x + node.data.width / 2,
      y: node.data.coords.y + node.data.height / 2,
    };
  });
  const rootNodesPositionsCorners = [];
  rootNodesIds.forEach((nodeId) => {
    if (nodeId === draggingBehavior.draggingElementId) return;
    const corners = getNodeCornerPositions(nodeId);
    rootNodesPositionsCorners.push(...corners);
  });
  const rootNodesPositions = [
    ...rootNodesPositionsCenter,
    ...rootNodesPositionsCorners,
  ];

  const node = getNodeByIdRoadmapSelector(draggingBehavior.draggingElementId);
  const { width, height } = node.data;
  // adjusts coords to work with centers
  const coords = snapCoordsToPositions(
    newX + width / 2,
    newY + height / 2,
    rootNodesPositions
  );
  const { lastClosestIndexX, lastClosestIndexY } = coords;
  // if snapped add lines
  const snappings = [];
  if (lastClosestIndexX !== -1) {
    snappings.push({
      startX: coords.x,
      startY: coords.y,
      endX: rootNodesPositions[lastClosestIndexX].x,
      endY: rootNodesPositions[lastClosestIndexX].y,
    });
  }

  if (lastClosestIndexY !== -1) {
    snappings.push({
      startX: coords.x,
      startY: coords.y,
      endX: rootNodesPositions[lastClosestIndexY].x,
      endY: rootNodesPositions[lastClosestIndexY].y,
    });
  }
  setSnappings(snappings);

  coords.x -= width / 2;
  coords.y -= height / 2;
  return coords;
};

type IDraggingStrategyInternal = (
  draggingBehavior: DraggingBehavior,
  x: number,
  y: number
) => {
  x: number;
  y: number;
};

export const boundCoordsToNode = (
  node: NodeClass,
  newX: number,
  newY: number,
  elementWidth = 0,
  elementHeight = 0
): ICoords => {
  const halfWidth = node.data.width / 2;
  const halfHeight = node.data.height / 2;

  const x = Math.max(
    -halfWidth + elementWidth / 2,
    Math.min(newX, halfWidth - elementWidth / 2)
  );
  const y = Math.max(
    -halfHeight + elementHeight / 2,
    Math.min(newY, halfHeight - elementHeight / 2)
  );

  return { x, y };
};

export const draggingBoundStrategyNestedNodes = (
  draggingBehavior: DraggingBehavior,
  newX: number,
  newY: number
): ICoords => {
  const node = getNodeByIdRoadmapSelector(draggingBehavior.draggingElementId);
  const parentNode = getNodeByIdRoadmapSelector(node.properties.nestedWithin);

  // bounds x and y to parent node
  const { x, y } = boundCoordsToNode(parentNode, newX, newY);
  return {
    x,
    y,
  };
};

export const draggingBoundStrategyNestedComponents = (
  draggingBehavior: DraggingBehavior,
  newX: number,
  newY: number
): ICoords => {
  const parentNode = getNodeByIdRoadmapSelector(
    draggingBehavior.additionalData.parentNodeId
  );
  const component = getComponentById(
    parentNode,
    draggingBehavior.draggingElementId
  );
  const { width, height } = component;
  // bounds x and y to parent node
  const { x, y } = boundCoordsToNode(parentNode, newX, newY, width, height);
  return {
    x,
    y,
  };
};

export const draggingStrategySnap = (draggingBehavior, newX, newY): ICoords => {
  const elementType: IDraggingElementType =
    draggingBehavior.draggingElementType;

  if (elementType === 'node') {
    return draggingStrategySnapRoadmapRootNodes(draggingBehavior, newX, newY);
  }
  if (elementType === 'subNode') {
    const { x, y } = draggingStrategySnapRoadmapNestedNodes(
      draggingBehavior,
      newX,
      newY
    );
    return draggingBoundStrategyNestedNodes(draggingBehavior, x, y);
  }
  if (elementType === 'component') {
    const { x, y } = draggingStrategySnapRoadmapNestedComponents(
      draggingBehavior,
      newX,
      newY
    );
    return draggingBoundStrategyNestedComponents(draggingBehavior, x, y);
  }
  throw new Error('invalid dragging element type');
};

type IDraggingStrategy = (
  x: number,
  y: number
) => {
  x: number;
  y: number;
};
export const getDraggingStrategyFactory = (
  draggingBehavior: DraggingBehavior
): IDraggingStrategy => {
  const { draggingStrategyType } = draggingBehavior;
  // here you should be able to compose multiple strategies

  if (draggingStrategyType === 'free') {
    return (newX: number, newY: number) => {
      return draggingStrategyFree(draggingBehavior, newX, newY);
    };
  }

  if (draggingStrategyType === 'snap') {
    return (newX: number, newY: number) => {
      return draggingStrategySnap(draggingBehavior, newX, newY);
    };
  }

  throw new Error('invalid dragging strategy type');
};
