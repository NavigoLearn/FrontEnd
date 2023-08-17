import {
  DraggingBehavior,
  ICoords,
  IDraggingElementType,
} from '@src/typescript/roadmap_ref/dragging/core';
import {
  getNodeByIdRoadmapSelector,
  getRootNodesIds,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import renderNodesStore from '@store/roadmap-refactor/render/rendered-nodes';

export const draggingStrategyFree = (draggingBehavior, newX, newY) => {
  return {
    x: newX,
    y: newY,
  };
};

export const snapCoordsToPositions = (
  newX: number,
  newY: number,
  positions: ICoords[]
): ICoords => {
  let lastClosestIndexX = -1;
  let lastClosestIndexY = -1;
  const snappingDistance = 10;

  for (let i = 0; i < positions.length; i += 1) {
    const { x: rootNodeX, y: rootNodeY } = positions[i];
    // checks if snapping is valid for X
    if (Math.abs(rootNodeX - newX) < snappingDistance) {
      if (lastClosestIndexX === -1) {
        lastClosestIndexX = i;
      }
      // take the closest node
      if (
        Math.abs(rootNodeX - newX) <
        Math.abs(rootNodeX - positions[lastClosestIndexX].x)
      ) {
        lastClosestIndexX = i;
      }
    }

    // checks if snapping is valid for Y
    if (Math.abs(rootNodeY - newY) < snappingDistance) {
      if (lastClosestIndexY === -1) {
        lastClosestIndexY = i;
      }
      // take the closest node
      if (
        Math.abs(rootNodeY - newY) <
        Math.abs(rootNodeY - positions[lastClosestIndexY].y)
      ) {
        lastClosestIndexY = i;
      }
    }
  }
  // applies snapping
  const appliedX =
    lastClosestIndexX !== -1 ? positions[lastClosestIndexX].x : newX;
  const appliedY =
    lastClosestIndexY !== -1 ? positions[lastClosestIndexY].y : newY;

  return {
    x: appliedX,
    y: appliedY,
  };
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

  return snapCoordsToPositions(newX, newY, positions);
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

  parentSubNodes.forEach((subNode) => {
    if (subNode.id === draggingBehavior.draggingElementId) return;
    positions.push({
      x: subNode.data.coords.x,
      y: subNode.data.coords.y,
    });
  });

  parentComponents.forEach((component) => {
    positions.push({
      x: component.x,
      y: component.y,
    });
  });

  return snapCoordsToPositions(newX, newY, positions);
};

export const draggingStrategySnapRoadmapRootNodes = (
  draggingBehavior,
  newX,
  newY
) => {
  // we snap root roadmap nodes
  // get positions of all root nodes
  const rootNodes = getRootNodesIds();
  const renderedNodes = renderNodesStore.get().nodesIds;
  // filter out nodes that are not rendered
  const filteredRootNodes = rootNodes.filter((nodeId) => {
    return (
      renderedNodes.includes(nodeId) &&
      nodeId !== draggingBehavior.draggingElementId
    );
  });

  const rootNodesPositions = filteredRootNodes.map((nodeId) => {
    const node = getNodeByIdRoadmapSelector(nodeId);
    return {
      x: node.data.coords.x,
      y: node.data.coords.y,
    };
  });

  const coords = snapCoordsToPositions(newX, newY, rootNodesPositions);
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

export const thrrottledSnappingFactory = (
  snapStrategy: IDraggingStrategyInternal,
  freeStrategy: IDraggingStrategyInternal
) => {
  // used to snap at 50ms instead of every time since it is a more expensive operation
  // update: didn't work, might come back later if this optimization is needed
  const delay = 50;
  let lastCall = 0;
  return (
    draggingBehavior: DraggingBehavior,
    newX: number,
    newY: number
  ): ICoords => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return freeStrategy(draggingBehavior, newX, newY);
    }
    lastCall = now;
    return snapStrategy(draggingBehavior, newX, newY);
  };
};

export const draggingStrategySnap = (draggingBehavior, newX, newY): ICoords => {
  const elementType: IDraggingElementType =
    draggingBehavior.draggingElementType;

  if (elementType === 'node') {
    return draggingStrategySnapRoadmapRootNodes(draggingBehavior, newX, newY);
  }
  if (elementType === 'subNode') {
    return draggingStrategySnapRoadmapNestedNodes(draggingBehavior, newX, newY);
  }
  if (elementType === 'component') {
    return draggingStrategySnapRoadmapNestedComponents(
      draggingBehavior,
      newX,
      newY
    );
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
