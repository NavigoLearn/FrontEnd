import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { IComponentObject } from '@type/roadmap/node/components-types';
import {
  ComponentDescription,
  ComponentTitle,
} from '@src/typescript/roadmap_ref/node/components/text/core';

export function getComponentById(
  node: NodeClass,
  id: string
): IComponentObject {
  const index = node.components.findIndex((component) => component.id === id);
  console.log('index', index);
  return node.components[index];
}

export function getComponentTitleById(
  node: NodeClass,
  id: string
): ComponentTitle {
  const component = getComponentById(node, id);
  if (component.type === 'Title') {
    return component;
  }
  throw new Error(`Component is not a TitleComponent${id} `);
}

export function getComponentDescriptionById(
  node: NodeClass,
  id: string
): ComponentDescription {
  const component = getComponentById(node, id);
  if (component.type === 'Description') {
    return component;
  }
  throw new Error('Component is not a Description component');
}

export function getComponentTitleTextById(node: NodeClass, id: string): string {
  const component = getComponentTitleById(node, id);
  return component.text;
}

export function getComponentDescriptionTextById(
  node: NodeClass,
  id: string
): string {
  const component = getComponentDescriptionById(node, id);
  return component.text;
}

export function getComponentTitleText(componentTitle: ComponentTitle) {
  return componentTitle.text;
}

export function getComponentDescriptionText(
  componentDescription: ComponentDescription
) {
  return componentDescription.text;
}
