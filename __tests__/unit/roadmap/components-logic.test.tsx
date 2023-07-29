import { beforeAll, describe, expect, it } from 'vitest';
import { nodeFactoryClassicBoilerplate } from '@src/typescript/roadmap_ref/node/core/factories/templates/classic';

describe('Components logic', () => {
  let node;
  beforeAll(() => {
    node = nodeFactoryClassicBoilerplate();
  });

  it('empty', () => {
    expect(true).toBe(true);
  });
  //
  // it('add new title to node', () => {
  //   const title = 'New Title string';
  //   const id = 0; // any valid id here
  //   appendComponent(node, factoryComponentEmpty('Title'));
  //   expect(node.components.length).toBe(2);
  // });
  //
  // it('should mutate component title position and string', () => {
  //   const componentIndex = 0;
  //   const component = node.components[componentIndex];
  //   const newPosition = { x: 100, y: 100 };
  //   mutateComponentTitleHeight(component, 100);
  //   mutateComponentTitleWidth(component, 100);
  //   expect(component.width).toBe(100);
  //   expect(component.height).toBe(100);
  // });
  //
  // it('append a new description, find it and mutate text', () => {
  //   const title = 'New Title string';
  //   const component = factoryComponentEmpty('Description');
  //   const componentId = component.id;
  //   appendComponent(node, component);
  //   const componentDescription = getComponentDescriptionById(node, componentId);
  //   expect(componentDescription instanceof ComponentDescription).toBe(true);
  //   mutateComponentDescriptionText(component, 'New Text2');
  //   expect(component.text).toBe('New Text2');
  // });
});
