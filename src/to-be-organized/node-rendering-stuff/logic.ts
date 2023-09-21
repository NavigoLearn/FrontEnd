import React from 'react';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { type ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import { ComponentText } from '@src/typescript/roadmap_ref/node/components/text/core';
import { IRenderingEnginesArray } from '@components/roadmap/rendering-engines/store-rendering-engine';

export const calcCenter = (componentProperties) => {
  // Calculate the center of the component based on its width and height
  const { width, height, x = 0, y = 0 } = componentProperties;
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  return { x: centerX, y: centerY };
};

type IParams =
  | {
      type: 'native-elements';
      textRef: React.RefObject<SVGTextElement>;
    }
  | {
      type: 'foreign-object';
      divRef: React.RefObject<HTMLDivElement>;
    };

function typeCheckIParams(params: IParams): asserts params is IParams {
  if (!IRenderingEnginesArray.includes(params.type)) {
    throw new Error('Invalid rendering engine type');
  }
}

function getComponentHeight(params: IParams, component: ComponentText): number {
  let componentHeight = component.height;
  if (params.type === 'foreign-object') {
    const divRef = params.divRef as React.RefObject<HTMLDivElement>;
    if (divRef.current) {
      componentHeight = divRef.current.clientHeight;
    }
  }
  if (params.type === 'native-elements') {
    const textRef = params.textRef as React.RefObject<SVGTextElement>;
    if (textRef.current) {
      componentHeight = textRef.current.getBBox().height;
    }
  }
  return componentHeight;
}

export const calculateComponentsPositions = (
  component: ComponentText,
  node: NodeClass,
  params: IParams
) => {
  typeCheckIParams(params);

  const { components, data } = node;
  const position: ICoords = { x: 0, y: 0 };

  const { x, y, width } = component;
  const componentHeight = getComponentHeight(params, component);

  const newX = x - component.width / 2 + data.width / 2;
  const newY = y - componentHeight / 2 + data.height / 2;

  position.x = newX;
  position.y = newY;
  return {
    position,
    width,
    height: componentHeight,
  };
};
