import { type ISnapDrawCoordintes } from '@store/roadmap-refactor/render/snapping-lines';
import { type ICoords } from '@src/typescript/roadmap_ref/dragging/core';

export const snappingLinesForCoords = (
  coords: ICoords,
  positionsSnappingTo: ICoords[],
  lastClosestIndexX: number,
  lastClosestIndexY: number
): ISnapDrawCoordintes[] => {
  const snappings = [];
  if (lastClosestIndexX !== -1) {
    snappings.push({
      startX: coords.x,
      startY: coords.y,
      endX: positionsSnappingTo[lastClosestIndexX].x,
      endY: positionsSnappingTo[lastClosestIndexX].y,
    });
  }

  if (lastClosestIndexY !== -1) {
    snappings.push({
      startX: coords.x,
      startY: coords.y,
      endX: positionsSnappingTo[lastClosestIndexY].x,
      endY: positionsSnappingTo[lastClosestIndexY].y,
    });
  }

  return snappings;
};
