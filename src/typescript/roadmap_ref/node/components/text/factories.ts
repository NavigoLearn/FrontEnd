import {
  ComponentDescription,
  ComponentTitle,
} from '@typescript/roadmap_ref/node/components/text/core';
import { IComponentObject } from '@type/roadmap/node/components-types';
import { IComponentOptions } from '@type/roadmap/node/options-types';

export type IComponentClasses = ComponentTitle | ComponentDescription;

export function factoryComponentTitleEmpty(): ComponentTitle {
  return new ComponentTitle(0, 0, 100, 35, 'NewTitle');
}

export function factoryComponentDescriptionEmpty(): ComponentDescription {
  return new ComponentDescription(0, 0, 100, 100, 'NewDescription');
}

export function factoryComponentEmpty(
  componentType: IComponentOptions
): IComponentObject {
  const factoriesMapper: {
    [key in IComponentOptions]: () => IComponentObject;
  } = {
    Title: factoryComponentTitleEmpty,
    Description: factoryComponentDescriptionEmpty,
  };
  const factory = factoriesMapper[componentType];
  return factory();
}
