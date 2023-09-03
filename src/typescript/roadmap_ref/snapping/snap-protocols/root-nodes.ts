import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';
import { getNodeMovedAnchorsPositions } from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-element-anchors';
import { getRenderedRootNodesAnchorsPositions } from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-external-anchors';
import { ISnapPolynomialObject } from '@src/typescript/roadmap_ref/snapping/snapping-types';
import { generateSnapPolynomials } from '@src/typescript/roadmap_ref/snapping/polynomial-generators/generate-polynomials';
import { calculateAnchorsDeltasXToPolynomials } from '@src/typescript/roadmap_ref/snapping/snapping-processing/process-x-snappings';
import { evaluateDeltas } from '@src/typescript/roadmap_ref/snapping/evaluators/evaluate-deltas';
import { setSnappings } from '@store/roadmap-refactor/render/snapping-lines';

export function snapRootNodeProtocol(
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
  const elementAnchors = getNodeMovedAnchorsPositions(
    draggedNodeId,
    dragX,
    dragY
  );
  const externalAnchors = getRenderedRootNodesAnchorsPositions([draggedNodeId]);
  const snapPolynomials: ISnapPolynomialObject[] =
    generateSnapPolynomials(externalAnchors);

  const snapPolynomialsX = snapPolynomials.filter((polynomial) => {
    return polynomial.params.includes('x') && polynomial.coefficients.x !== 0;
  });
  const snapPolynomialsY = snapPolynomials.filter((polynomial) =>
    polynomial.params.includes('y')
  );

  // gets the distance between anchors and the calculated polynomials
  const deltasX = calculateAnchorsDeltasXToPolynomials(
    snapPolynomialsX,
    elementAnchors
  );

  const deltasY = calculateAnchorsDeltasXToPolynomials(
    snapPolynomialsY,
    elementAnchors
  );

  // takes the minimum/s from deltas
  const { smallestDelta: smallestDeltaX, snapCoordinates: snapCoordinatesX } =
    evaluateDeltas(deltasX);
  const { smallestDelta: smallestDeltaY, snapCoordinates: snapCoordinatesY } =
    evaluateDeltas(deltasY);

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
  setSnappings(snappingLinesCoords);

  return {
    x: appliedX,
    y: appliedY,
  };
}
