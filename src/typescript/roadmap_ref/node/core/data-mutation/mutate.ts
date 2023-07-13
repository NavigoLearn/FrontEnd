import { NodeClass } from '@typescript/roadmap_ref/node/core/core';
import { IColorSchemaOptions } from '@type/roadmap/node/colors-types';
import { colorSchemas } from '@typescript/roadmap_ref/node/core/factories/params/params';

export function mutateHeight(node: NodeClass, height: number) {
  node.properties.height = height;
}
export function mutateOpacity(node: NodeClass, opacity: number) {
  node.properties.opacity = opacity;
}
export function mutateColor(node: NodeClass, colorSchema: IColorSchemaOptions) {
  node.properties.color = colorSchemas[colorSchema];
}

export function mutateWidth(node: NodeClass, width: number) {
  node.properties.width = width;
}
