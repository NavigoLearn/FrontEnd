import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';
import { getSubNodeMovedAnchorsPositions } from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-element-anchors';
import { getSubNodeExternalAnchorsPositions } from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-external-anchors';
import { type ISnapPolynomialObject } from '@src/typescript/roadmap_ref/snapping/snapping-types';
import { generateSnapPolynomials } from '@src/typescript/roadmap_ref/snapping/polynomial-generators/generate-polynomials';
import { calculateAnchorsDeltasToPolynomials } from '@src/typescript/roadmap_ref/snapping/snapping-processing/process-x-snappings';
import { getSmallestOutOfAllDeltas } from '@src/typescript/roadmap_ref/snapping/evaluators/evaluate-deltas';
import { setSnappings } from '@store/roadmap-refactor/render/snapping-lines';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { transformSnapCoordsInAbsolute } from '@src/typescript/roadmap_ref/snapping/data-transform/transform-coords-snap';

export function snapSubNodeProtocol(
  dragX: number,
  dragY: number,
  draggingBehavior: DraggingBehavior
) {
  // gigachad math polynomials based solution
  /* think of the lines for snapping as polynomials. Here all those lines are built as a function of x and y
    Those functions are evaluated for the current drag position, calculating how many x and y units are needed to snap
    to that function ( remember the function are lines from external points )
     */
  const draggedNodeId = draggingBehavior.draggingElementId;
  const elementAnchors = getSubNodeMovedAnchorsPositions(
    draggedNodeId,
    dragX,
    dragY
  );
  const parentId =
    getNodeByIdRoadmapSelector(draggedNodeId).properties.nestedWithin;

  const externalAnchors = getSubNodeExternalAnchorsPositions(draggedNodeId, [
    draggedNodeId,
  ]);
  const snapPolynomials: ISnapPolynomialObject[] =
    generateSnapPolynomials(externalAnchors);

  const snapPolynomialsX = snapPolynomials.filter((polynomial) => {
    return polynomial.params.includes('x') && polynomial.coefficients.x !== 0;
  });
  const snapPolynomialsY = snapPolynomials.filter((polynomial) =>
    polynomial.params.includes('y')
  );

  // gets the distance between anchors and the calculated polynomials
  const deltasX = calculateAnchorsDeltasToPolynomials(
    snapPolynomialsX,
    elementAnchors
  );

  const deltasY = calculateAnchorsDeltasToPolynomials(
    snapPolynomialsY,
    elementAnchors
  );

  // takes the minimum/s from deltas
  const { smallestDelta: smallestDeltaX, snapCoordinates: snapCoordinatesX } =
    getSmallestOutOfAllDeltas(deltasX);
  const { smallestDelta: smallestDeltaY, snapCoordinates: snapCoordinatesY } =
    getSmallestOutOfAllDeltas(deltasY);

  const snapCoordinatesXAdjusted = snapCoordinatesX.map((snapCoordinate) => {
    snapCoordinate.startX -= smallestDeltaX.delta;
    return snapCoordinate;
  });

  const snapCoordinatesYAdjusted = snapCoordinatesY.map((snapCoordinate) => {
    snapCoordinate.startY -= smallestDeltaY.delta;
    return snapCoordinate;
  });

  let appliedX = dragX;
  if (smallestDeltaX !== null) {
    appliedX -= smallestDeltaX.delta;
  }

  let appliedY = dragY;
  if (smallestDeltaY !== null) {
    appliedY -= smallestDeltaY.delta;
  }
  const snappingLinesCoords = [
    ...snapCoordinatesXAdjusted,
    ...snapCoordinatesYAdjusted,
  ];

  const adjustedSnappingLinesCoords = transformSnapCoordsInAbsolute(
    parentId,
    snappingLinesCoords
  );
  setSnappings(adjustedSnappingLinesCoords);

  return {
    x: appliedX,
    y: appliedY,
  };
}
