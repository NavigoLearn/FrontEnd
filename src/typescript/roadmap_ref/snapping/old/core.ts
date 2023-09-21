import { type ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import {
  getNodeCornerPositions,
  getNodeCornerPositionsWithWH,
} from '@src/typescript/roadmap_ref/snapping/old/generate-positions';
import { setSnappings } from '@store/roadmap-refactor/render/snapping-lines';
import { getScaleSafari } from '@store/roadmap-refactor/misc/scale-safari-store';

export const snapCoordsToPositions = (
  newX: number,
  newY: number,
  positions: ICoords[]
) => {
  let lastClosestIndexX = -1;
  let lastClosestIndexY = -1;
  const scale = getScaleSafari();
  const snappingDistance = 5 / scale;

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
    lastClosestIndexX,
    lastClosestIndexY,
  };
};

export const snapCoordsMultipleToPositions = (
  coords: ICoords[],
  positions: ICoords[]
) => {
  const snappedCoords = [];
  const lastClosestIndexesX = [];
  const lastClosestIndexesY = [];
  for (let i = 0; i < coords.length; i += 1) {
    const { x, y } = coords[i];
    const {
      x: appliedX,
      y: appliedY,
      lastClosestIndexX,
      lastClosestIndexY,
    } = snapCoordsToPositions(x, y, positions);
    snappedCoords.push({
      x: appliedX,
      y: appliedY,
    });
    lastClosestIndexesX.push(lastClosestIndexX);
    lastClosestIndexesY.push(lastClosestIndexY);
  }

  return {
    snappedCoords,
    lastClosestIndexesX,
    lastClosestIndexesY,
  };
};

export const snapNodeWidthHeight = (
  nodeId: string,
  nodesToSnapTo: string[],
  width: number,
  height: number
): {
  width: number;
  height: number;
} => {
  // gets corners
  const corners: ICoords[] = getNodeCornerPositionsWithWH(
    nodeId,
    width,
    height
  );

  const nodes = nodesToSnapTo;

  const nodesCornerPositions: ICoords[] = [];
  nodes.forEach((rootNodeId) => {
    if (rootNodeId === nodeId) return;
    const rootNodeCorners: ICoords[] = getNodeCornerPositions(rootNodeId);
    rootNodeCorners.forEach((corner) => {
      nodesCornerPositions.push(corner);
    });
  });

  // snaps each corner to the other root nodes corners
  const { snappedCoords, lastClosestIndexesX, lastClosestIndexesY } =
    snapCoordsMultipleToPositions(corners, nodesCornerPositions);

  const snappings = [];

  const widthsSnapDeltas = [];
  const heightsSnapDeltas = [];

  // I had to find minimum delta width and then trace back the coordinates corresponding to that delta snapping
  // thats why we keep a trace of the indexes of the deltas
  const widthDeltasIndexes = [];
  const heightDeltasIndexes = [];

  for (let i = 0; i < snappedCoords.length; i += 1) {
    const indexX = lastClosestIndexesX[i];
    const indexY = lastClosestIndexesY[i];
    if (indexX !== -1) {
      const { x: newX } = nodesCornerPositions[indexX];
      // horrible approach to conditionals, needs refactor,
      // we need to differentiate for the width delta between left and right corners
      if (i === 0 || i === 2) {
        widthsSnapDeltas.push(newX - corners[i].x);
        widthDeltasIndexes.push(i);
      } else {
        widthsSnapDeltas.push(corners[i].x - newX);
        widthDeltasIndexes.push(i);
      }
    }

    if (indexY !== -1) {
      const { y: newY } = nodesCornerPositions[indexY];
      if (i < 2) {
        heightsSnapDeltas.push(newY - corners[i].y);
        heightDeltasIndexes.push(i);
      } else {
        heightsSnapDeltas.push(corners[i].y - newY);
        heightDeltasIndexes.push(i);
      }
    }
  }
  if (widthsSnapDeltas.length === 0) {
    widthsSnapDeltas.push(0); // ------
    widthDeltasIndexes.push(-1);
  }
  if (heightsSnapDeltas.length === 0) {
    heightsSnapDeltas.push(0);
    heightDeltasIndexes.push(-1);
  }
  // finds minimum index of the absolutes of the deltas

  let minIndexWidth = 0;
  let minDeltaWidth = widthsSnapDeltas[0];
  for (let i = 0; i < widthsSnapDeltas.length; i += 1) {
    const delta = widthsSnapDeltas[i];
    if (Math.abs(delta) < Math.abs(minDeltaWidth)) {
      minDeltaWidth = delta;
      minIndexWidth = i;
    }
  }

  const originalIndexWidthSnapping = widthDeltasIndexes[minIndexWidth];
  const firstSnappingCornerWidth = snappedCoords[originalIndexWidthSnapping];
  const secondSnappingCornerWidth =
    nodesCornerPositions[lastClosestIndexesX[originalIndexWidthSnapping]];

  if (originalIndexWidthSnapping !== -1) {
    snappings.push({
      startX: firstSnappingCornerWidth.x,
      startY: firstSnappingCornerWidth.y,
      endX: secondSnappingCornerWidth.x,
      endY: secondSnappingCornerWidth.y,
    });
  }

  let minIndexHeight = 0;
  let minDeltaHeight = heightsSnapDeltas[0];
  for (let i = 0; i < heightsSnapDeltas.length; i += 1) {
    const delta = heightsSnapDeltas[i];
    if (Math.abs(delta) < Math.abs(minDeltaHeight)) {
      minDeltaHeight = delta;
      minIndexHeight = i;
    }
  }

  const originalIndexHeightSnapping = heightDeltasIndexes[minIndexHeight];
  const firstSnappingCornerHeight = snappedCoords[originalIndexHeightSnapping];
  const secondSnappingCornerHeight =
    nodesCornerPositions[lastClosestIndexesY[originalIndexHeightSnapping]];

  if (originalIndexHeightSnapping !== -1) {
    snappings.push({
      startX: firstSnappingCornerHeight.x,
      startY: firstSnappingCornerHeight.y,
      endX: secondSnappingCornerHeight.x,
      endY: secondSnappingCornerHeight.y,
    });
  }
  setSnappings(snappings);

  const minWidthSnapDelta = widthsSnapDeltas[minIndexWidth];
  const minHeightSnapDelta = heightsSnapDeltas[minIndexHeight];

  return {
    width: width - 2 * minWidthSnapDelta,
    height: height - 2 * minHeightSnapDelta,
  };
};
