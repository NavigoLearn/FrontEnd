import {
  DraggingBehavior,
  type ICoords,
  type IDraggingStrategies,
} from '@src/typescript/roadmap_ref/dragging/core';

function freeDraggingStrategy(
  draggingObject: DraggingBehavior,
  newX: number,
  newY: number
) {
  return {
    x: newX,
    y: newY,
  };
}

function gridDraggingStrategy(
  draggingObject: DraggingBehavior,
  newX: number,
  newY: number
) {
  // needs to be implemented
  console.log('grid');
  return {
    x: newX,
    y: newY,
  };
}

function snapDraggingStrategy(
  draggingObject: DraggingBehavior,
  newX: number,
  newY: number
) {
  // needs to be implemented
  console.log('snap');
  return {
    x: newX,
    y: newY,
  };
}

export function draggingStrategyFactory(
  draggingBehavior: DraggingBehavior,
  strategyOption: IDraggingStrategies
) {
  const strategies: {
    [key in IDraggingStrategies]: (
      draggingObject: DraggingBehavior,
      newX: number,
      newY: number
    ) => ICoords;
  } = {
    free: freeDraggingStrategy,
    grid: gridDraggingStrategy,
    snap: snapDraggingStrategy,
  };
  return function (newX: number, newY: number): ICoords {
    return strategies[strategyOption](draggingBehavior, newX, newY);
  };
}
