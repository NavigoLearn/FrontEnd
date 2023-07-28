import { IComponentOptions } from '@type/roadmap/node/options-types';
import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';

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

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}
