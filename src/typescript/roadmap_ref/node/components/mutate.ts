import { ComponentNode } from '@src/typescript/roadmap_ref/node/components/core';

export function mutateComponentCoords(
  component: ComponentNode,
  x: number,
  y: number
) {
  component.x = x;
  component.y = y;
}
