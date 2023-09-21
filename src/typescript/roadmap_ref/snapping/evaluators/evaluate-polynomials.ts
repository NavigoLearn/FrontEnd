import { type ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import { type ISnapPolynomialObject } from '@src/typescript/roadmap_ref/snapping/snapping-types';

export function evaluatePolynomialXDelta(
  { polynomial }: ISnapPolynomialObject,
  { x, y }: ICoords
) {
  return polynomial(x, y);
}
