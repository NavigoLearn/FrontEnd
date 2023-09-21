import { type IComponentOptions } from '@type/roadmap/node/options-types';
import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';
import { getRandomId } from '@src/typescript/utils/misc';

export class ComponentNode {
  x: number;

  y: number;

  width: number;

  height: number;

  type: IComponentOptions;

  name: string;

  id: string;

  parentNodeId: string; // injected

  draggingBehavior: DraggingBehavior; // injected

  constructor(
    type: IComponentOptions,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = getRandomId();
  }
}
