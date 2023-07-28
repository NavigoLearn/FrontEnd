import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { IColorSchemaOptions } from '@type/roadmap/node/colors-types';
import { colorSchemas } from '@src/typescript/roadmap_ref/node/core/factories/params/params';
import { IAction } from '@src/typescript/roadmap_ref/node/core/actions';

export function mutateNodeHeight(node: NodeClass, height: number) {
  node.data.height = height;
}
export function mutateNodeOpacity(node: NodeClass, opacity: number) {
  node.data.opacity = opacity;
}
export function mutateNodeColor(
  node: NodeClass,
  colorSchema: IColorSchemaOptions
) {
  node.data.color = colorSchemas[colorSchema];
}

export function mutateNodeWidth(node: NodeClass, width: number) {
  node.data.width = width;
}

export function mutateNodeCoordX(node: NodeClass, x: number) {
  node.data.coords.x = x;
}
export function mutateNodeCoordY(node: NodeClass, y: number) {
  node.data.coords.y = y;
}

export function mutateNodeCoords(node: NodeClass, x: number, y: number) {
  node.data.coords.x = x;
  node.data.coords.y = y;
}

export function mutateNodeName(node: NodeClass, name: string) {
  node.name = name;
}

export function mutateNodeOnClickAction(node: NodeClass, action: IAction) {
  node.actions.onClick = action;
}
