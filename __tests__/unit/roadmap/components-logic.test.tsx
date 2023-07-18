import { beforeAll, describe, expect, it } from 'vitest';
import {
  mutateComponentDescriptionText,
  mutateComponentTitleHeight,
  mutateComponentTitleWidth,
} from '@typescript/roadmap_ref/node/components/text/mutate';
import {
  ComponentDescription,
  ComponentTitle,
} from '@typescript/roadmap_ref/node/components/text/core';
import { classicNodeFactoryBoilerplate } from '@typescript/roadmap_ref/node/core/factories/templates/classic';
import { getComponentDescriptionById } from '@typescript/roadmap_ref/node/core/data-get/components';
import { appendComponent } from '@typescript/roadmap_ref/node/core/data-mutation/append';
import { factoryComponentEmpty } from '@typescript/roadmap_ref/node/components/text/factories';

describe('Components logic', () => {
  let node;
  beforeAll(() => {
    node = classicNodeFactoryBoilerplate();
  });

  it('should create a new component title', () => {
    const id = 0; // any valid id here
    const title = factoryComponentEmpty('Title');
    expect(title instanceof ComponentTitle).toBe(true);
  });

  it('add new title to node', () => {
    const title = 'New Title string';
    const id = 0; // any valid id here
    appendComponent(node, factoryComponentEmpty('Title'));
    expect(node.components.length).toBe(2);
  });

  it('should mutate component title position and string', () => {
    const componentIndex = 0;
    const component = node.components[componentIndex];
    const newPosition = { x: 100, y: 100 };
    mutateComponentTitleHeight(component, 100);
    mutateComponentTitleWidth(component, 100);
    expect(component.width).toBe(100);
    expect(component.height).toBe(100);
  });

  it('append a new description, find it and mutate text', () => {
    const title = 'New Title string';
    const component = factoryComponentEmpty('Description');
    const componentId = component.id;
    appendComponent(node, component);
    const componentDescription = getComponentDescriptionById(node, componentId);
    expect(componentDescription instanceof ComponentDescription).toBe(true);
    mutateComponentDescriptionText(component, 'New Text2');
    expect(component.text).toBe('New Text2');
  });
});
