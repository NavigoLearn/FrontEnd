import { beforeAll, describe, expect, it } from 'vitest';
import {
  mutateComponentTitleHeight,
  mutateComponentTitleText,
  mutateComponentTitleWidth,
} from '@typescript/roadmap_ref/node/components/text/mutate';
import { factoryComponentTitle } from '@typescript/roadmap_ref/node/components/text/factories';
import { TitleComponent } from '@typescript/roadmap_ref/node/components/text/core';
import { classicNodeFactoryBoilerplate } from '@typescript/roadmap_ref/node/core/factories/templates/classic';
import { appendComponentTitle } from '@typescript/roadmap_ref/node/core/data-mutation/append';
import { getComponentTitleById } from '@typescript/roadmap_ref/node/core/data-get/components';

describe('Components logic', () => {
  let node;
  beforeAll(() => {
    node = classicNodeFactoryBoilerplate();
  });

  it('should create a new component title', () => {
    const title = 'New Title string';
    const id = 0; // any valid id here
    const component = factoryComponentTitle(title);
    expect(component instanceof TitleComponent).toBe(true);
  });

  it('add new title to node', () => {
    const title = 'New Title string';
    const id = 0; // any valid id here
    appendComponentTitle(node, factoryComponentTitle(title));
    expect(node.components.length).toBe(2);
  });

  it('should mutate component title position and string', () => {
    const componentId = 0; // any valid id here
    const component = node.components[componentId];
    const newPosition = { x: 100, y: 100 };
    mutateComponentTitleHeight(component, 100);
    mutateComponentTitleWidth(component, 100);
    expect(component.width).toBe(100);
    expect(component.height).toBe(100);
  });

  it('append a new title, find it and mutate text', () => {
    const title = 'New Title string';
    const componentId = appendComponentTitle(
      node,
      factoryComponentTitle(title)
    );
    const component = getComponentTitleById(node, componentId);
    expect(component instanceof TitleComponent).toBe(true);
    mutateComponentTitleText(component, 'New Text2');
    expect(component.text).toBe('New Text2');
  });
});
