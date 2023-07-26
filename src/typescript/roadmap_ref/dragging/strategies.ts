import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';

function strategy1(
  draggingObject: DraggingBehavior,
  newX: number,
  newY: number
) {
  // something
  console.log('strateg1');
  // set the X and Y in draggingObject
}

function strategy2(
  draggingObject: DraggingBehavior,
  newX: number,
  newY: number
) {
  // something
  console.log('strateg2');
  // set the X and Y in draggingObject
}

function strategyFactory(
  strategyOption: 'strategy1' | 'strategy2',
  draggingObject: DraggingBehavior
) {
  const strategies = {
    strategy1,
    strategy2,
  };
  return function (newX: number, newY: number) {
    console.log('strategyFactory');
    strategies[strategyOption](draggingObject, newX, newY);
    console.log('finished strategy');
  };
}
