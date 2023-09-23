import { type ICoords } from '@src/typescript/roadmap_ref/dragging/core';

export type IParams = 'x' | 'y' | 'free';

export type IPolynomialFunction = (x: number, y: number) => number;

export type ISnapPolynomialObject = {
  params: IParams[];
  polynomial: IPolynomialFunction;
  coefficients: {
    [key in IParams]: number;
  };
  polynomialOrigins: ICoords[];
};

export type ISnapDelta = {
  polynomialOrigins: ICoords[];
  delta: number;
  snappedElementAnchor: ICoords;
  polynomial: IPolynomialFunction;
};
