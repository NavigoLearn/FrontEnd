import { ComponentNode } from '@src/typescript/roadmap_ref/node/components/core';

export function mutateComponentXCoord(component: ComponentNode, x: number) {
  component.x = x;
}

export function mutateComponentYCoord(component: ComponentNode, y: number) {
  component.y = y;
}
export function mutateComponentCoords(
  component: ComponentNode,
  x: number,
  y: number
) {
  mutateComponentXCoord(component, x);
  mutateComponentYCoord(component, y);
}

export function mutateComponentWidth(component: ComponentNode, width: number) {
  component.width = width;
}
