import {
  ComponentDescription,
  ComponentTitle,
} from '@typescript/roadmap_ref/node/components/text/core';
import {
  IComponentObject,
  IComponentOptions,
} from '@type/roadmap/node/components-types';

export type IComponentClasses = ComponentTitle | ComponentDescription;

export function factoryComponentTitleEmpty(): ComponentTitle {
  return new ComponentTitle(0, 0, 100, 35, 'NewTitle');
}

export function factoryComponentDescriptionEmpty(): ComponentDescription {
  return new ComponentDescription(0, 0, 100, 100, 'NewDescription');
}

export function factoryComponentJSONEmpty(
  type: IComponentOptions
): IComponentObject {
  const possibleFactories: {
    [key in IComponentOptions]: () => IComponentClasses;
  } = {
    Title: factoryComponentTitleEmpty,
    Description: factoryComponentDescriptionEmpty,
  };
  const factory = possibleFactories[type];
  return {
    id: '',
    type,
    name: 'New Title',
    component: factory(),
  };
}
