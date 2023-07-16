import { NodeClass } from '@typescript/roadmap_ref/node/core/core';
import { IColorSchemaOptions } from '@type/roadmap/node/colors-types';
import { colorSchemas } from '@typescript/roadmap_ref/node/core/factories/params/params';

export function mutateNodeHeight(node: NodeClass, height: number) {
  node.properties.height = height;
}
export function mutateNodeOpacity(node: NodeClass, opacity: number) {
  node.properties.opacity = opacity;
}
export function mutateNodeColor(
  node: NodeClass,
  colorSchema: IColorSchemaOptions
) {
  node.properties.color = colorSchemas[colorSchema];
}

export function mutateNodeWidth(node: NodeClass, width: number) {
  node.properties.width = width;
}
