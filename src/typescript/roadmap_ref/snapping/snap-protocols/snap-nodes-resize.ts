import {
  getRenderedRootNodesExternalAnchorsPositions,
  getSubNodeExternalAnchorsPositions,
} from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-external-anchors';
import {
  type ISnapDelta,
  type ISnapPolynomialObject,
} from '@src/typescript/roadmap_ref/snapping/snapping-types';
import { generateSnapPolynomials } from '@src/typescript/roadmap_ref/snapping/polynomial-generators/generate-polynomials';
import { calculateAnchorsDeltasToPolynomials } from '@src/typescript/roadmap_ref/snapping/snapping-processing/process-x-snappings';
import { getSmallestOutOfAllDeltas } from '@src/typescript/roadmap_ref/snapping/evaluators/evaluate-deltas';
import { setSnappings } from '@store/roadmap-refactor/render/snapping-lines';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { type IMouseDragDirection } from '@src/to-be-organized/resize-dragging/stores-resize-node';
import {
  getResizedNodeAnchorsPositions,
  getResizedSubNodeAnchorsPositions,
} from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-resizing-anchors';
import { getAlt } from '@store/roadmap-refactor/misc/key-press-store';
import {
  mutateNodeHeightBottomDy,
  mutateNodeHeightTopDy,
  mutateNodeHeightYAxisDy,
  mutateNodeWidthLeftDx,
  mutateNodeWidthRightDx,
  mutateNodeWidthXAxisDx,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate-resize-protocols';
import { getNodeCenterAbsoluteCoords } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { transformSnapCoordsInAbsolute } from '@src/typescript/roadmap_ref/snapping/data-transform/transform-coords-snap';
import type { ICoords } from '@src/typescript/roadmap_ref/dragging/core';

const ALT_DIRECTIONS = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};
const DIRECTIONS = [
  'top',
  'bottom',
  'left',
  'right',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];

const getAnchorsDirections = (direction: IMouseDragDirection) => {
  const hasAlt = getAlt();
  return DIRECTIONS.filter((d) => direction.includes(d))
    .map((d) => [d, hasAlt ? ALT_DIRECTIONS[d] : null])
    .flat()
    .filter(Boolean);
};

const getSubNodeCoords = (node: NodeClass) =>
  !node.flags.renderedOnRoadmapFlag
    ? getNodeCenterAbsoluteCoords(node.id)
    : { x: node.data.coords.x, y: node.data.coords.y };

const handleDirectionSnapping = (
  node: NodeClass,
  delta: ISnapDelta,
  isNodeAboveOrLeftOfCenter: (n: NodeClass, d: ISnapDelta) => boolean,
  mutateNodeAxisFunction: (n: NodeClass, d: number) => void,
  mutateNodePositionFunction: (n: NodeClass, d: number) => void,
  directionInvert = false
) => {
  if (delta) {
    let { delta: deltaValue } = delta;

    if (directionInvert) {
      deltaValue = -deltaValue;
    }

    if (getAlt()) {
      if (directionInvert) deltaValue = -deltaValue;
      if (isNodeAboveOrLeftOfCenter(node, delta)) deltaValue = -deltaValue;
      mutateNodeAxisFunction(node, deltaValue);
    } else {
      mutateNodePositionFunction(node, deltaValue);
    }
  }
};

const snappingIsLeftOfCenter = (node: NodeClass, smallestDelta: ISnapDelta) =>
  getSubNodeCoords(node).x < smallestDelta.snappedElementAnchor.x;

const snappingIsAboveCenter = (node: NodeClass, smallestDelta: ISnapDelta) =>
  getSubNodeCoords(node).y < smallestDelta.snappedElementAnchor.y;

const handleTopDirectionSnapping = (
  node: NodeClass,
  smallestDeltaY: ISnapDelta
) =>
  handleDirectionSnapping(
    node,
    smallestDeltaY,
    snappingIsAboveCenter,
    mutateNodeHeightYAxisDy,
    mutateNodeHeightTopDy
  );

const handleBottomDirectionSnapping = (
  node: NodeClass,
  smallestDeltaY: ISnapDelta
) =>
  handleDirectionSnapping(
    node,
    smallestDeltaY,
    snappingIsAboveCenter,
    mutateNodeHeightYAxisDy,
    mutateNodeHeightBottomDy,
    true
  );

const handleLeftDirectionSnapping = (
  node: NodeClass,
  smallestDeltaX: ISnapDelta
) =>
  handleDirectionSnapping(
    node,
    smallestDeltaX,
    snappingIsLeftOfCenter,
    mutateNodeWidthXAxisDx,
    mutateNodeWidthLeftDx
  );

const handleRightDirectionSnapping = (
  node: NodeClass,
  smallestDeltaX: ISnapDelta
) =>
  handleDirectionSnapping(
    node,
    smallestDeltaX,
    snappingIsLeftOfCenter,
    mutateNodeWidthXAxisDx,
    mutateNodeWidthRightDx,
    true
  );

const handleTopLeftDirectionSnapping = (
  node: NodeClass,
  smallestDeltaX: ISnapDelta,
  smallestDeltaY: ISnapDelta
) => {
  handleTopDirectionSnapping(node, smallestDeltaY);
  handleLeftDirectionSnapping(node, smallestDeltaX);
};

const handleTopRightDirectionSnapping = (
  node: NodeClass,
  smallestDeltaX: ISnapDelta,
  smallestDeltaY: ISnapDelta
) => {
  handleTopDirectionSnapping(node, smallestDeltaY);
  handleRightDirectionSnapping(node, smallestDeltaX);
};

const handleBottomLeftDirectionSnapping = (
  node: NodeClass,
  smallestDeltaX: ISnapDelta,
  smallestDeltaY: ISnapDelta
) => {
  handleBottomDirectionSnapping(node, smallestDeltaY);
  handleLeftDirectionSnapping(node, smallestDeltaX);
};

const handleBottomRightDirectionSnapping = (
  node: NodeClass,
  smallestDeltaX: ISnapDelta,
  smallestDeltaY: ISnapDelta
) => {
  handleBottomDirectionSnapping(node, smallestDeltaY);
  handleRightDirectionSnapping(node, smallestDeltaX);
};

export const handleNodeResizingProtocol = (
  node: NodeClass,
  direction: IMouseDragDirection,
  smallestDeltaX: ISnapDelta,
  smallestDeltaY: ISnapDelta
) => {
  const snappingFuncs: { [key in IMouseDragDirection]: () => void } = {
    top: () => handleTopDirectionSnapping(node, smallestDeltaY),
    bottom: () => handleBottomDirectionSnapping(node, smallestDeltaY),
    left: () => handleLeftDirectionSnapping(node, smallestDeltaX),
    right: () => handleRightDirectionSnapping(node, smallestDeltaX),
    'top-left': () =>
      handleTopLeftDirectionSnapping(node, smallestDeltaX, smallestDeltaY),
    'top-right': () =>
      handleTopRightDirectionSnapping(node, smallestDeltaX, smallestDeltaY),
    'bottom-left': () =>
      handleBottomLeftDirectionSnapping(node, smallestDeltaX, smallestDeltaY),
    'bottom-right': () =>
      handleBottomRightDirectionSnapping(node, smallestDeltaX, smallestDeltaY),
  };

  (snappingFuncs[direction] || function none() {})();
};

export function snapResizingNodeProtocol(
  node: NodeClass,
  direction: IMouseDragDirection
) {
  const isSubNode = !node.flags.renderedOnRoadmapFlag;
  const nodeCoords = isSubNode ? getSubNodeCoords(node) : node.data.coords;
  const resizedNodeId = node.id;

  let elementAnchors: ICoords[];

  if (isSubNode) {
    elementAnchors = getResizedSubNodeAnchorsPositions(
      resizedNodeId,
      getAnchorsDirections(direction)
    );
  } else {
    elementAnchors = getResizedNodeAnchorsPositions(
      resizedNodeId,
      getAnchorsDirections(direction)
    );
  }

  let externalAnchors: ICoords[];
  if (!isSubNode) {
    externalAnchors = getRenderedRootNodesExternalAnchorsPositions([
      resizedNodeId,
    ]);
  } else {
    externalAnchors = getSubNodeExternalAnchorsPositions(resizedNodeId, [
      resizedNodeId,
    ]);
  }

  const snapPolynomials: ISnapPolynomialObject[] =
    generateSnapPolynomials(externalAnchors);

  const snapPolynomialsX = snapPolynomials.filter((polynomial) => {
    return polynomial.params.includes('x') && polynomial.coefficients.x !== 0;
  });
  const snapPolynomialsY = snapPolynomials.filter(
    (polynomial) =>
      polynomial.params.includes('y') && polynomial.coefficients.y !== 0
  );

  // gets the distance between anchors and the calculated polynomials
  const deltasX = calculateAnchorsDeltasToPolynomials(
    snapPolynomialsX,
    elementAnchors,
    'x'
  );

  const deltasY = calculateAnchorsDeltasToPolynomials(
    snapPolynomialsY,
    elementAnchors,
    'y'
  );

  // takes the minimum/s from deltas
  const { smallestDelta: smallestDeltaX, snapCoordinates: snapCoordinatesX } =
    getSmallestOutOfAllDeltas(deltasX);
  const { smallestDelta: smallestDeltaY, snapCoordinates: snapCoordinatesY } =
    getSmallestOutOfAllDeltas(deltasY);

  // adjusts the snap coordinates to the smallest delta
  const alt = getAlt();
  const snapCoordinatesXAdjusted = snapCoordinatesX.map((snapCoordinate) => {
    const isRight = nodeCoords.x < snapCoordinate.startX;
    let sign = isRight ? 1 : -1;

    sign *= alt && isRight ? sign : -sign;

    snapCoordinate.startX += sign * smallestDeltaX.delta;
    return snapCoordinate;
  });

  const snapCoordinatesYAdjusted = snapCoordinatesY.map((snapCoordinate) => {
    const isBottom = nodeCoords.y < snapCoordinate.startY;
    let sign = isBottom ? 1 : -1;

    sign *= alt && isBottom ? sign : -sign;

    snapCoordinate.startY += sign * smallestDeltaY.delta;
    return snapCoordinate;
  });

  let deltaX = null;
  let deltaY = null;
  if (smallestDeltaX !== null) {
    deltaX = smallestDeltaX;
  }

  if (smallestDeltaY !== null) {
    deltaY = smallestDeltaY;
  }

  handleNodeResizingProtocol(node, direction, deltaX, deltaY);

  const snappingLinesCoords = [
    ...snapCoordinatesXAdjusted,
    ...snapCoordinatesYAdjusted,
  ];

  if (isSubNode) {
    const parentId = node.properties.nestedWithin;
    const adjustedSnappingLinesCoords = transformSnapCoordsInAbsolute(
      parentId,
      snappingLinesCoords
    );
    setSnappings(adjustedSnappingLinesCoords);
  } else {
    setSnappings(snappingLinesCoords);
  }
}
