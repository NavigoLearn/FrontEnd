import { getScaleSafari } from '@store/roadmap-refactor/misc/scale-safari-store';
import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';
import { getRenderingEngineType } from '@components/roadmap/rendering-engines/store-rendering-engine';

export const coordinatesAdapterStandardStrategy = (x: number, y: number) => {
  return {
    x,
    y,
  };
};

export const coordinatesAdapterScaledStrategy = (x: number, y: number) => {
  // adapting x and y to the scale of the editor
  // since the positions are modified similar to a vector, we only need to normalize that vector to get the correct position

  const engine = getRenderingEngineType();
  let scale = getScaleSafari(); // deprecated after new engine but might still be useful
  if (engine === 'native-elements') {
    scale = 1;
  }

  const newX = x / scale;
  const newY = y / scale;

  return {
    x: newX,
    y: newY,
  };
};

type ICoordinatesAdapterStrategy = (
  x: number,
  y: number
) => {
  x: number;
  y: number;
};

export const getCoordinatesAdapterStrategyFactory = (
  draggingBehavior: DraggingBehavior
): ICoordinatesAdapterStrategy => {
  const { draggingElementType } = draggingBehavior;
  if (draggingElementType === 'node') {
    return coordinatesAdapterScaledStrategy;
  }

  if (draggingElementType === 'subNode') {
    return coordinatesAdapterScaledStrategy;
  }

  if (draggingElementType === 'component') {
    return coordinatesAdapterScaledStrategy;
  }
  throw new Error('invalid dragging strategy type');
};
