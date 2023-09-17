import { getRenderedRootNodesExternalAnchorsPositions } from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-external-anchors';
import { ISnapPolynomialObject } from '@src/typescript/roadmap_ref/snapping/snapping-types';
import { generateSnapPolynomials } from '@src/typescript/roadmap_ref/snapping/polynomial-generators/generate-polynomials';
import { calculateAnchorsDeltasXToPolynomials } from '@src/typescript/roadmap_ref/snapping/snapping-processing/process-x-snappings';
import { getSmallestOutOfAllDeltas } from '@src/typescript/roadmap_ref/snapping/evaluators/evaluate-deltas';
import { setSnappings } from '@store/roadmap-refactor/render/snapping-lines';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  IMouseDirectionBase,
  IMouseDragDirection,
} from '@src/to-be-organized/resize-dragging/stores-resize';
import { getResizedNodeAnchorsPositions } from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-resizing-anchors';
import { getAlt } from '@store/roadmap-refactor/misc/key-press-store';
import {
  mutateNodeHeightBottomDy,
  mutateNodeHeightTop,
  mutateNodeHeightTopDy,
  mutateNodeWidthLeftDx,
  mutateNodeWidthRightDx,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate-resize';

const getAnchorsDirections = (direction: IMouseDragDirection) => {
  const directions: IMouseDirectionBase[] = [];
  if (direction === 'top') {
    directions.push('top');
    if (getAlt()) {
      directions.push('bottom');
    }
  }
  if (direction === 'bottom') {
    directions.push('bottom');
    if (getAlt()) {
      directions.push('top');
    }
  }

  if (direction === 'left') {
    directions.push('left');
    if (getAlt()) {
      directions.push('right');
    }
  }

  if (direction === 'right') {
    directions.push('right');
    if (getAlt()) {
      directions.push('left');
    }
  }

  if (direction === 'top-left') {
    directions.push('top');
    directions.push('left');
    if (getAlt()) {
      directions.push('bottom');
      directions.push('right');
    }
  }

  if (direction === 'top-right') {
    directions.push('top');
    directions.push('right');
    if (getAlt()) {
      directions.push('bottom');
      directions.push('left');
    }
  }

  if (direction === 'bottom-left') {
    directions.push('bottom');
    directions.push('left');
    if (getAlt()) {
      directions.push('top');
      directions.push('right');
    }
  }

  if (direction === 'bottom-right') {
    directions.push('bottom');
    directions.push('right');
    if (getAlt()) {
      directions.push('top');
      directions.push('left');
    }
  }

  return directions;
};

export function handleNodeResizingProtocol(
  node: NodeClass,
  direction: IMouseDragDirection,
  smallestDeltaX: number | null,
  smallestDeltaY: number | null
) {
  if (direction === 'top') {
    if (smallestDeltaY) {
      console.log('mutating top', smallestDeltaY);
      // mutateNodeHeightTopDy(node, smallestDeltaY);
    }
  }
  if (direction === 'bottom') {
    if (smallestDeltaY) {
      mutateNodeHeightBottomDy(node, smallestDeltaY);
    }
  }
  if (direction === 'left') {
    if (smallestDeltaX) {
      mutateNodeWidthLeftDx(node, smallestDeltaX);
    }
  }

  if (direction === 'right') {
    if (smallestDeltaX) {
      mutateNodeWidthRightDx(node, smallestDeltaX);
    }
  }
}

export function snapResizingRootNodeProtocol(
  node: NodeClass,
  direction: IMouseDragDirection
) {
  const resizedNodeId = node.id;

  const elementAnchors = getResizedNodeAnchorsPositions(
    resizedNodeId,
    getAnchorsDirections(direction)
  );

  const externalAnchors = getRenderedRootNodesExternalAnchorsPositions([
    resizedNodeId,
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

  let deltaX = null;
  let deltaY = null;
  if (smallestDeltaX !== null) {
    deltaX = smallestDeltaX.delta;
  }

  if (smallestDeltaY !== null) {
    deltaY = smallestDeltaY.delta;
  }
  handleNodeResizingProtocol(node, direction, deltaX, deltaY);

  const snappingLinesCoords = [
    ...snapCoordinatesXAdjusted,
    ...snapCoordinatesYAdjusted,
  ];

  setSnappings(snappingLinesCoords);
}
