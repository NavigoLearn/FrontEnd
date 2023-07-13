import { NodeClass } from '@typescript/roadmap_ref/node/core/core';
import { IComponentsObject } from '@type/roadmap/node/components-types';
import { TitleComponent } from '@typescript/roadmap_ref/node/components/text/core';

export function getComponentById(
  node: NodeClass,
  id: string | number
): IComponentsObject {
  const index = node.components.findIndex((component) => component.id === id);
  return node.components[index];
}

export function getComponentTitleById(
  node: NodeClass,
  id: string | number
): TitleComponent {
  const { component } = getComponentById(node, id);
  if (component instanceof TitleComponent) {
    return component;
  }
  throw new Error('Component is not a TitleComponent');
}

export function getComponentDescriptionById(
  node: NodeClass,
  id: string | number
): TitleComponent {
  const { component } = getComponentById(node, id);
  if (component instanceof TitleComponent) {
    return component;
  }
  throw new Error('Component is not a TitleComponent');
}
