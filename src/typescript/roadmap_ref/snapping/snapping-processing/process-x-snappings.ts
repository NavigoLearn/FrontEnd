import {
  ISnapDelta,
  ISnapPolynomialObject,
} from '@src/typescript/roadmap_ref/snapping/snapping-types';
import { ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import { evaluatePolynomialXDelta } from '@src/typescript/roadmap_ref/snapping/evaluators/evaluate-polynomials';
import { BASE_SNAPPING_DISTANCE } from '@src/typescript/roadmap_ref/snapping/snapping-params';

export function calculateAnchorDeltasXToPolynomials(
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
  const smallestDelta = deltas[0];
  return smallestDelta;
}

export function calculateAnchorsDeltasXToPolynomials(
  snapPolynomials: ISnapPolynomialObject[],
  anchors: ICoords[]
) {
  const deltas: ISnapDelta[] = [];
  for (let i = 0; i < anchors.length; i += 1) {
    const anchor = anchors[i];
    const anchorDeltas = calculateAnchorDeltasXToPolynomials(
      snapPolynomials,
      anchor
    );

    // finds smallest delta
    const smallestDelta = getSmallestDelta(anchorDeltas);
    deltas.push(smallestDelta);
  }
  return deltas;
}
