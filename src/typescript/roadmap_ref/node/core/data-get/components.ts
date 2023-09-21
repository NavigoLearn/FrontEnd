import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { type IComponentObject } from '@type/roadmap/node/components-types';
import { ComponentText } from '@src/typescript/roadmap_ref/node/components/text/core';

export function getComponentById(
  node: NodeClass,
  id: string
): IComponentObject {
  const index = node.components.findIndex((component) => component.id === id);
  return node.components[index];
}

export function getComponentTextById(
  node: NodeClass,
  id: string
): ComponentText {
  const component = getComponentById(node, id);
  if (component.type === 'Text') {
    return component;
  }
  throw new Error(`Component is not a TitleComponent${id} `);
}

export function getComponentTextText(componentText: ComponentText) {
  return componentText.text;
}
