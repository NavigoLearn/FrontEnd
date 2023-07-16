import { NodeClass } from '@typescript/roadmap_ref/node/core/core';
import {
  ComponentDescription,
  ComponentTitle,
} from '@typescript/roadmap_ref/node/components/text/core';

export function injectNewTitle(
  node: NodeClass,
  titleId: string,
  newTitle: ComponentTitle
) {
  const index = node.componentsJSON.findIndex(
    (component) => component.id === titleId
  );
  if (index === -1) throw new Error('Component not found');
  if (node.componentsJSON[index].type !== 'Title')
    throw new Error('Component is not a title');
  node.componentsJSON[index].component = newTitle;
}

export function injectNewDescription(
  node: NodeClass,
  descriptionId: string,
  newDescription: ComponentDescription
) {
  const index = node.componentsJSON.findIndex(
    (component) => component.id === descriptionId
  );
  if (index === -1) throw new Error('Component not found');
  if (node.componentsJSON[index].type !== 'Description')
    throw new Error('Component is not a description');
  node.componentsJSON[index].component = newDescription;
}
