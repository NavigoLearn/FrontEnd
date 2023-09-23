import { type ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import {
  type IPolynomialFunction,
  type ISnapPolynomialObject,
} from '@src/typescript/roadmap_ref/snapping/snapping-types';
import { type ICoordsCustom } from '@src/typescript/roadmap_ref/snapping/anchors-generators/generate-resizing-anchors';

function generateHorizontalSnapPolynomialFunction(
  anchor: ICoords
): IPolynomialFunction {
  return (_: number, y: number) => {
    return y - anchor.y;
  };
}

function generateVerticalSnapPolynomialFunction(
  anchor: ICoords
): IPolynomialFunction {
  return (x: number, _: number) => {
    return x - anchor.x;
  };
}

function generateSnapPolynomial(anchor: ICoords) {
  const polynomials: ISnapPolynomialObject[] = [
    {
      polynomial: generateHorizontalSnapPolynomialFunction(anchor),
      params: ['y'],
      coefficients: {
        y: 1,
        x: 0,
        free: -anchor.y,
      },
      polynomialOrigins: [anchor],
    },
    {
      polynomial: generateVerticalSnapPolynomialFunction(anchor),
      params: ['x'],
      coefficients: {
        y: 0,
        x: 1,
        free: -anchor.x,
      },
      polynomialOrigins: [anchor],
    },
  ];

  return polynomials;
}

export function evaluateEqualPolynomials(
  polynomial1: ISnapPolynomialObject,
  polynomial2: ISnapPolynomialObject
) {
  if (polynomial1.params.length !== polynomial2.params.length) {
    return false;
  }

  const keys = Object.keys(polynomial1.coefficients);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (polynomial1.coefficients[key] !== polynomial2.coefficients[key]) {
      return false;
    }
  }

  return true;
}

export function checkIfPolynomialExists(
  snapPolynomials: ISnapPolynomialObject[],
  polynomial: ISnapPolynomialObject
) {
  for (let i = 0; i < snapPolynomials.length; i += 1) {
    if (evaluateEqualPolynomials(snapPolynomials[i], polynomial)) {
      return {
        status: true,
        index: i,
      };
    }
  }
  return {
    status: false,
    index: -1,
  };
}

export function generateSnapPolynomials(
  externalAnchors: (ICoordsCustom | ICoords)[]
) {
  const snapPolynomials: ISnapPolynomialObject[] = [];
  for (let i = 0; i < externalAnchors.length; i += 1) {
    const polynomials = generateSnapPolynomial(externalAnchors[i]);
    for (let j = 0; j < polynomials.length; j += 1) {
      // if polynomial already exists, add the origin to the existing polynomial
      const polynomial = polynomials[j];
      const { status, index } = checkIfPolynomialExists(
        snapPolynomials,
        polynomial
      );
      if (status) {
        snapPolynomials[index].polynomialOrigins.push(
          ...polynomial.polynomialOrigins
        );
      } else {
        snapPolynomials.push(polynomial);
      }
    }
  }
  return snapPolynomials;
}
