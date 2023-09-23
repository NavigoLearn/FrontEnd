import {
  type ISnapDelta,
  type ISnapPolynomialObject,
} from '@src/typescript/roadmap_ref/snapping/snapping-types';
import { type ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import { evaluatePolynomialXDelta } from '@src/typescript/roadmap_ref/snapping/evaluators/evaluate-polynomials';
import { BASE_SNAPPING_DISTANCE } from '@src/typescript/roadmap_ref/snapping/snapping-params';
import {
  type ICoordsCustom,
  typeAssertICoordsCustom,
} from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-resizing-anchors';

export function calculateAnchorDeltasToPolynomials(
  snapPolynomials: ISnapPolynomialObject[],
  anchor: ICoords
) {
  const deltas: ISnapDelta[] = [];
  for (let i = 0; i < snapPolynomials.length; i += 1) {
    const polynomial = snapPolynomials[i];
    // WARNING !! this parts breaks and needs refactor if polynomials include both x and y
    const deltaX = evaluatePolynomialXDelta(polynomial, anchor);
    if (Math.abs(deltaX) < BASE_SNAPPING_DISTANCE) {
      deltas.push({
        polynomialOrigins: polynomial.polynomialOrigins,
        polynomial: polynomial.polynomial,
        snappedElementAnchor: anchor,
        delta: deltaX,
      });
    }
  }
  return deltas;
}

export function getSmallestDelta(deltas: ISnapDelta[]) {
  if (deltas.length === 0) {
    return null;
  }
  deltas.sort((a, b) => Math.abs(a.delta) - Math.abs(b.delta));
  return deltas[0];
}

export function calculateAnchorsDeltasToPolynomials(
  snapPolynomials: ISnapPolynomialObject[],
  anchors: (ICoords | ICoordsCustom)[],
  snapType?: 'x' | 'y'
) {
  const deltas: ISnapDelta[] = [];
  for (let i = 0; i < anchors.length; i += 1) {
    const anchor = anchors[i];

    if (typeAssertICoordsCustom(anchor)) {
      if (anchor.snapOnY === false && snapType === 'y') {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (anchor.snapOnX === false && snapType === 'x') {
        // eslint-disable-next-line no-continue
        continue;
      }
    }

    const anchorDeltas = calculateAnchorDeltasToPolynomials(
      snapPolynomials,
      anchor
    );

    // finds smallest delta
    const smallestDelta = getSmallestDelta(anchorDeltas);
    deltas.push(smallestDelta);
  }
  return deltas;
}
