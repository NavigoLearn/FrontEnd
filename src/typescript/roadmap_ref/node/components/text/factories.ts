import { ComponentText } from '@src/typescript/roadmap_ref/node/components/text/core';
import { type IComponentOptions } from '@type/roadmap/node/options-types';
import { type IComponentObject } from '@type/roadmap/node/components-types';
import {
  injectComponentDraggingBehavior,
  injectComponentParentNodeId,
} from '@src/typescript/roadmap_ref/node/components/text/inject';
import { draggingBehaviorFactoryComponents } from '@src/typescript/roadmap_ref/dragging/factories';
import { injectDraggingStrategy } from '@src/typescript/roadmap_ref/dragging/inject';

export type IComponentClasses = ComponentText;

export function addDraggingBehaviorComponentProtocol(
  component: IComponentObject,
  parentNodeId: string
) {
  const draggingBehavior = draggingBehaviorFactoryComponents(
    parentNodeId,
    component.id
  );
  injectComponentDraggingBehavior(component, draggingBehavior);
  injectDraggingStrategy(draggingBehavior, 'snap');
}

export function factoryComponentTextEmpty(parentNodeId: string): ComponentText {
  const componentText = new ComponentText(0, 0, 150, 35, 'NewTitle');
  injectComponentParentNodeId(componentText, parentNodeId);
  addDraggingBehaviorComponentProtocol(componentText, parentNodeId);
  return componentText;
}

export function factoryComponentEmpty(
  componentType: IComponentOptions,
  parentNodeId: string
): IComponentObject {
  const factoriesMapper: {
    [key in IComponentOptions]: (nodeId: string) => IComponentObject;
  } = {
    Text: factoryComponentTextEmpty,
  };
  const factory = factoriesMapper[componentType];
  const component = factory(parentNodeId);
  injectDraggingStrategy(component.draggingBehavior, 'snap');
  return component;
}
