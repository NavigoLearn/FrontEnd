import { ComponentText } from '@src/typescript/roadmap_ref/node/components/text/core';
import { IComponentOptions } from '@type/roadmap/node/options-types';
import { IComponentObject } from '@type/roadmap/node/components-types';
import {
  injectComponentDraggingBehavior,
  injectComponentParentNodeId,
} from '@src/typescript/roadmap_ref/node/components/text/inject';
import { draggingBehaviorFactoryComponents } from '@src/typescript/roadmap_ref/dragging/factories';
import { injectDraggingStrategy } from '@src/typescript/roadmap_ref/dragging/inject';

export type IComponentClasses = ComponentText;

export function factoryComponentTextEmpty(parentNodeId: string): ComponentText {
  const componentText = new ComponentText(0, 0, 150, 35, 'NewTitle');
  injectComponentParentNodeId(componentText, parentNodeId);
  const draggingBehavior = draggingBehaviorFactoryComponents(
    parentNodeId,
    componentText.id
  );
  injectComponentDraggingBehavior(componentText, draggingBehavior);
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
