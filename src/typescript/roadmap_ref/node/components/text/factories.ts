import {
  ComponentDescription,
  ComponentTitle,
} from '@src/typescript/roadmap_ref/node/components/text/core';
import { IComponentObject } from '@type/roadmap/node/components-types';
import { IComponentOptions } from '@type/roadmap/node/options-types';
import {
  injectComponentDraggingBehavior,
  injectComponentParentNodeId,
} from '@src/typescript/roadmap_ref/node/components/text/inject';
import { draggingBehaviorFactoryComponents } from '@src/typescript/roadmap_ref/dragging/factories';
import { injectDraggingStrategy } from '@src/typescript/roadmap_ref/dragging/inject';

export type IComponentClasses = ComponentTitle | ComponentDescription;

export function factoryComponentTitleEmpty(
  parentNodeId: string
): ComponentTitle {
  const componentTitle = new ComponentTitle(0, 0, 100, 35, 'NewTitle');
  injectComponentParentNodeId(componentTitle, parentNodeId);
  const draggingBehavior = draggingBehaviorFactoryComponents(
    parentNodeId,
    componentTitle.id
  );
  injectComponentDraggingBehavior(componentTitle, draggingBehavior);
  return componentTitle;
}

export function factoryComponentDescriptionEmpty(
  parentNodeId: string
): ComponentDescription {
  const componentDescription = new ComponentDescription(
    0,
    0,
    100,
    35,
    'New Description'
  );
  injectComponentParentNodeId(componentDescription, parentNodeId);
  const draggingBehavior = draggingBehaviorFactoryComponents(
    parentNodeId,
    componentDescription.id
  );
  injectComponentDraggingBehavior(componentDescription, draggingBehavior);
  return componentDescription;
}

export function factoryComponentEmpty(
  componentType: IComponentOptions,
  parentNodeId: string
): IComponentObject {
  const factoriesMapper: {
    [key in IComponentOptions]: (nodeId: string) => IComponentObject;
  } = {
    Title: factoryComponentTitleEmpty,
    Description: factoryComponentDescriptionEmpty,
  };
  const factory = factoriesMapper[componentType];
  const component = factory(parentNodeId);
  injectDraggingStrategy(component.draggingBehavior, 'snap');
  return component;
}
