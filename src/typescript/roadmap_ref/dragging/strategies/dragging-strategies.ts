import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';

export const draggingStrategyFree = (newX, newY) => {
  return {
    x: newX,
    y: newY,
  };
};

export const draggingStrategySnap = (newX, newY) => {
  const snapX = Math.round(newX / 10) * 10;
  const snapY = Math.round(newY / 10) * 10;
  return {
    x: snapX,
    y: snapY,
  };
};

type IDraggingStrategy = (
  x: number,
  y: number
) => {
  x: number;
  y: number;
};

export const getDraggingStrategyFactory = (
  draggingBehavior: DraggingBehavior
): IDraggingStrategy => {
  const { draggingStrategyType } = draggingBehavior;
  // here you should be able to compose multiple strategies
  if (draggingStrategyType === 'free') {
    return draggingStrategyFree;
  }

  if (draggingStrategyType === 'snap') {
    return draggingStrategySnap;
  }

  throw new Error('invalid dragging strategy type');
};
