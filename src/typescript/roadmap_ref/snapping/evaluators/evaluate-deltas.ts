import { type ISnapDelta } from '@src/typescript/roadmap_ref/snapping/snapping-types';
import { type ISnapDrawCoordintes } from '@store/roadmap-refactor/render/snapping-lines';

export function getSmallestOutOfAllDeltas(deltas: ISnapDelta[]): {
  smallestDelta: ISnapDelta;
  snapCoordinates: ISnapDrawCoordintes[];
} {
  let smallestDelta = null;
  deltas.forEach((delta) => {
    if (delta === null) {
      return;
    }
    if (
      smallestDelta === null ||
      Math.abs(delta.delta) < Math.abs(smallestDelta.delta)
    ) {
      smallestDelta = delta;
    }
  });

  const snapCoordinates: ISnapDrawCoordintes[] = [];
  deltas.forEach((delta) => {
    if (delta === null) {
      return;
    }
    if (Math.abs(delta.delta) === Math.abs(smallestDelta.delta)) {
      delta.polynomialOrigins.forEach((polynomialOrigin) => {
        snapCoordinates.push({
          startX: delta.snappedElementAnchor.x,
          startY: delta.snappedElementAnchor.y,
          endX: polynomialOrigin.x,
          endY: polynomialOrigin.y,
        });
      });
    }
  });

  return {
    smallestDelta,
    snapCoordinates,
  };
}
