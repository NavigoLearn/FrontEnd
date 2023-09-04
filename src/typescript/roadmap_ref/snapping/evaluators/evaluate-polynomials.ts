import { ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import { ISnapPolynomialObject } from '@src/typescript/roadmap_ref/snapping/snapping-types';

export function evaluatePolynomialXDelta(
  polynomial: ISnapPolynomialObject,
  anchor: ICoords
) {
  const { polynomial: polynomialFunction } = polynomial;
  const delta = polynomialFunction(anchor.x, anchor.y);
  return delta;
}
