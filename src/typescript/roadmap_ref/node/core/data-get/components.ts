import { NodeClass } from '@typescript/roadmap_ref/node/core/core';
import { IComponentObject } from '@type/roadmap/node/components-types';
import {
  ComponentDescription,
  ComponentTitle,
} from '@typescript/roadmap_ref/node/components/text/core';

export function getComponentById(
  node: NodeClass,
  id: string
): IComponentObject {
  const index = node.components.findIndex((component) => component.id === id);
  return node.components[index];
}

export function getComponentTitleById(
  node: NodeClass,
  id: string
): ComponentTitle {
  const component = getComponentById(node, id);
  if (component instanceof ComponentTitle) {
    return component;
  }
  throw new Error('Component is not a TitleComponent');
}

export function getComponentDescriptionById(
  node: NodeClass,
  id: string
): ComponentDescription {
  const component = getComponentById(node, id);
  if (component instanceof ComponentDescription) {
    return component;
  }
  throw new Error('Component is not a Description component');
}
