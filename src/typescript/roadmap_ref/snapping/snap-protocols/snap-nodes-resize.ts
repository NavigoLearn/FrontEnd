import {
  getRenderedRootNodesExternalAnchorsPositions,
  getSubNodeExternalAnchorsPositions,
} from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-external-anchors';
import {
  ISnapDelta,
  ISnapPolynomialObject,
} from '@src/typescript/roadmap_ref/snapping/snapping-types';
import { generateSnapPolynomials } from '@src/typescript/roadmap_ref/snapping/polynomial-generators/generate-polynomials';
import { calculateAnchorsDeltasToPolynomials } from '@src/typescript/roadmap_ref/snapping/snapping-processing/process-x-snappings';
import { getSmallestOutOfAllDeltas } from '@src/typescript/roadmap_ref/snapping/evaluators/evaluate-deltas';
import { setSnappings } from '@store/roadmap-refactor/render/snapping-lines';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  IMouseDirectionBase,
  IMouseDragDirection,
} from '@src/to-be-organized/resize-dragging/stores-resize';
import {
  getResizedNodeAnchorsPositions,
  getResizedSubNodeAnchorsPositions,
} from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-resizing-anchors';
import { getAlt } from '@store/roadmap-refactor/misc/key-press-store';
import {
  mutateNodeHeightBottomDy,
  mutateNodeHeightTop,
  mutateNodeHeightTopDy,
  mutateNodeHeightYAxisDy,
  mutateNodeWidthLeftDx,
  mutateNodeWidthRightDx,
  mutateNodeWidthXAxis,
  mutateNodeWidthXAxisDx,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate-resize';
import { getNodeCenterAbsoluteCoords } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';
import { getSubNodeAnchorsPositions } from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-element-anchors';
import { transformSnapCoordsInAbsolute } from '@src/typescript/roadmap_ref/snapping/data-transform/transform-coords-snap';

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

function snappingIsLeftOfCenter(node: NodeClass, smallestDeltaY: ISnapDelta) {
  const { snappedElementAnchor } = smallestDeltaY;
  const isSubNode = !node.flags.renderedOnRoadmapFlag;
  let nodeCoords;
  if (!isSubNode) {
    nodeCoords = getNodeCenterAbsoluteCoords(node.id);
  } else {
    nodeCoords = {
      x: node.data.coords.x,
      y: node.data.coords.y,
    };
  }

  if (nodeCoords.x < snappedElementAnchor.x) {
    return true;
  }
  return false;
}

function snappingIsAboveCenter(node: NodeClass, smallestDeltaY: ISnapDelta) {
  const { snappedElementAnchor } = smallestDeltaY;
  const isSubNode = !node.flags.renderedOnRoadmapFlag;
  let nodeCoords;
  if (!isSubNode) {
    nodeCoords = getNodeCenterAbsoluteCoords(node.id);
  } else {
    nodeCoords = {
      x: node.data.coords.x,
      y: node.data.coords.y,
    };
  }
  if (nodeCoords.y < snappedElementAnchor.y) {
    return true;
  }
  return false;
}

function handleTopDirectionSnapping(
  node: NodeClass,
  smallestDeltaY: ISnapDelta
) {
  if (smallestDeltaY) {
    if (getAlt()) {
      let { delta } = smallestDeltaY; // coords system are made for dragging, not for resizing, so we need to adjust the delta
      // because it gives the wrong up direction for bottom ( which is actually down in the dragging coordinate system)
      if (snappingIsAboveCenter(node, smallestDeltaY)) delta = -delta;
      mutateNodeHeightYAxisDy(node, delta);
    } else {
      mutateNodeHeightTopDy(node, smallestDeltaY.delta);
    }
  }
}

function handleBottomDirectionSnapping(
  node: NodeClass,
  smallestDeltaY: ISnapDelta
) {
  if (smallestDeltaY) {
    if (getAlt()) {
      let { delta } = smallestDeltaY; // coords system are made for dragging, not for resizing, so we need to adjust the delta
      // because it gives the wrong up direction for bottom ( which is actually down in the dragging coordinate system)
      if (snappingIsAboveCenter(node, smallestDeltaY)) delta = -delta;
      mutateNodeHeightYAxisDy(node, delta);
    } else {
      mutateNodeHeightBottomDy(node, -smallestDeltaY.delta);
    }
  }
}

function handleLeftDirectionSnapping(
  node: NodeClass,
  smallestDeltaX: ISnapDelta
) {
  if (smallestDeltaX) {
    if (getAlt()) {
      let { delta } = smallestDeltaX;
      if (snappingIsLeftOfCenter(node, smallestDeltaX)) delta = -delta;
      mutateNodeWidthXAxisDx(node, delta);
    } else {
      mutateNodeWidthLeftDx(node, smallestDeltaX.delta);
    }
  }
}

function handleRightDirectionSnapping(
  node: NodeClass,
  smallestDeltaX: ISnapDelta
) {
  if (smallestDeltaX) {
    if (getAlt()) {
      let { delta } = smallestDeltaX;
      if (snappingIsLeftOfCenter(node, smallestDeltaX)) delta = -delta;
      mutateNodeWidthXAxisDx(node, delta);
    } else {
      mutateNodeWidthRightDx(node, -smallestDeltaX.delta);
    }
  }
}

function handleTopLeftDirectionSnapping(
  node: NodeClass,
  smallestDeltaX: ISnapDelta,
  smallestDeltaY: ISnapDelta
) {
  if (smallestDeltaY) {
    if (getAlt()) {
      let { delta } = smallestDeltaY;
      if (snappingIsAboveCenter(node, smallestDeltaY)) delta = -delta;
      mutateNodeHeightYAxisDy(node, delta);
    } else {
      mutateNodeHeightTopDy(node, smallestDeltaY.delta);
    }
  }
  if (smallestDeltaX) {
    if (getAlt()) {
      let { delta } = smallestDeltaX;
      if (snappingIsLeftOfCenter(node, smallestDeltaX)) delta = -delta;
      mutateNodeWidthXAxisDx(node, delta);
    } else {
      mutateNodeWidthLeftDx(node, smallestDeltaX.delta);
    }
  }
}

function handleTopRightDirectionSnapping(
  node: NodeClass,
  smallestDeltaX: ISnapDelta,
  smallestDeltaY: ISnapDelta
) {
  if (smallestDeltaY) {
    if (getAlt()) {
      let { delta } = smallestDeltaY;
      if (snappingIsAboveCenter(node, smallestDeltaY)) delta = -delta;
      mutateNodeHeightYAxisDy(node, delta);
    } else {
      mutateNodeHeightTopDy(node, smallestDeltaY.delta);
    }
  }
  if (smallestDeltaX) {
    if (getAlt()) {
      let { delta } = smallestDeltaX;
      if (snappingIsLeftOfCenter(node, smallestDeltaX)) delta = -delta;
      mutateNodeWidthXAxisDx(node, delta);
    } else {
      mutateNodeWidthRightDx(node, -smallestDeltaX.delta);
    }
  }
}

function handleBottomLeftDirectionSnapping(
  node: NodeClass,
  smallestDeltaX: ISnapDelta,
  smallestDeltaY: ISnapDelta
) {
  if (smallestDeltaY) {
    if (getAlt()) {
      let { delta } = smallestDeltaY;
      if (snappingIsAboveCenter(node, smallestDeltaY)) delta = -delta;
      mutateNodeHeightYAxisDy(node, delta);
    } else {
      mutateNodeHeightBottomDy(node, -smallestDeltaY.delta);
    }
  }
  if (smallestDeltaX) {
    if (getAlt()) {
      let { delta } = smallestDeltaX;
      if (snappingIsLeftOfCenter(node, smallestDeltaX)) delta = -delta;
      mutateNodeWidthXAxisDx(node, delta);
    } else {
      mutateNodeWidthLeftDx(node, smallestDeltaX.delta);
    }
  }
}

function handleBottomRightDirectionSnapping(
  node: NodeClass,
  smallestDeltaX: ISnapDelta,
  smallestDeltaY: ISnapDelta
) {
  if (smallestDeltaY) {
    if (getAlt()) {
      let { delta } = smallestDeltaY;
      if (snappingIsAboveCenter(node, smallestDeltaY)) delta = -delta;
      mutateNodeHeightYAxisDy(node, delta);
    } else {
      mutateNodeHeightBottomDy(node, -smallestDeltaY.delta);
    }
  }
  if (smallestDeltaX) {
    if (getAlt()) {
      let { delta } = smallestDeltaX;
      if (snappingIsLeftOfCenter(node, smallestDeltaX)) delta = -delta;
      mutateNodeWidthXAxisDx(node, delta);
    } else {
      mutateNodeWidthRightDx(node, -smallestDeltaX.delta);
    }
  }
}

export function handleNodeResizingProtocol(
  node: NodeClass,
  direction: IMouseDragDirection,
  smallestDeltaX: ISnapDelta,
  smallestDeltaY: ISnapDelta
) {
  // return null;
  if (direction === 'top') {
    handleTopDirectionSnapping(node, smallestDeltaY);
  }
  if (direction === 'bottom') {
    handleBottomDirectionSnapping(node, smallestDeltaY);
  }
  if (direction === 'left') {
    handleLeftDirectionSnapping(node, smallestDeltaX);
  }

  if (direction === 'right') {
    handleRightDirectionSnapping(node, smallestDeltaX);
  }

  if (direction === 'top-left') {
    handleTopLeftDirectionSnapping(node, smallestDeltaX, smallestDeltaY);
  }
  if (direction === 'top-right') {
    handleTopRightDirectionSnapping(node, smallestDeltaX, smallestDeltaY);
  }
  if (direction === 'bottom-left') {
    handleBottomLeftDirectionSnapping(node, smallestDeltaX, smallestDeltaY);
  }
  if (direction === 'bottom-right') {
    handleBottomRightDirectionSnapping(node, smallestDeltaX, smallestDeltaY);
  }
}

export function snapResizingNodeProtocol(
  node: NodeClass,
  direction: IMouseDragDirection
) {
  const isSubNode = !node.flags.renderedOnRoadmapFlag;
  const resizedNodeId = node.id;

  let elementAnchors = [];

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

  let externalAnchors = [];
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
    let adjustedSnappingLinesCoords = [];
    const parentId = node.properties.nestedWithin;
    adjustedSnappingLinesCoords = transformSnapCoordsInAbsolute(
      parentId,
      snappingLinesCoords
    );
    setSnappings(adjustedSnappingLinesCoords);
  } else {
    setSnappings(snappingLinesCoords);
  }
}
