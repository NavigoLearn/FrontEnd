import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';
import {
  getComponentMovedAnchorsPositions,
  getSubNodeMovedAnchorsPositions,
} from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-element-anchors';
import {
  getComponentsExternalAnchorsPositions,
  getSubNodeExternalAnchorsPositions,
} from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-external-anchors';
import { ISnapPolynomialObject } from '@src/typescript/roadmap_ref/snapping/snapping-types';
import { generateSnapPolynomials } from '@src/typescript/roadmap_ref/snapping/polynomial-generators/generate-polynomials';
import { calculateAnchorsDeltasXToPolynomials } from '@src/typescript/roadmap_ref/snapping/snapping-processing/process-x-snappings';
import { evaluateDeltas } from '@src/typescript/roadmap_ref/snapping/evaluators/evaluate-deltas';
import { setSnappings } from '@store/roadmap-refactor/render/snapping-lines';
import {
  getNodeAbsoluteCoordsCenter,
  getNodeByIdRoadmapSelector,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { transformSnapCoordsInAbsolute } from '@src/typescript/roadmap_ref/snapping/data-transform/transform-coords-snap';
import { getComponentById } from '@src/typescript/roadmap_ref/node/core/data-get/components';

export function snapComponentProtocol(
  dragX: number,
  dragY: number,
  draggingBehavior: DraggingBehavior
) {
  const draggedComponentId = draggingBehavior.draggingElementId;
  const parentId = draggingBehavior.additionalData.parentNodeId;
  const parentNode = getNodeByIdRoadmapSelector(parentId);
  const component = getComponentById(parentNode, draggedComponentId);

  const elementAnchors = getComponentMovedAnchorsPositions(
    component,
    dragX,
    dragY
  );

  const externalAnchors = getComponentsExternalAnchorsPositions(
    parentId,
    draggedComponentId
  );
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
