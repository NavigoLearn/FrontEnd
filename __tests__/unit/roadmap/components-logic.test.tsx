import { beforeAll, describe, expect, it } from 'vitest';
import { nodeFactoryClassicBoilerplate } from '@src/typescript/roadmap_ref/node/core/factories/base-templates-factories/classic';
import {
  mutateAttachmentTabComponentDescription,
  mutateAttachmentTabComponentTitle,
} from '@src/typescript/roadmap_ref/node/attachments/tab/mutate';
import {
  mutateComponentTextHeight,
  mutateComponentTextText,
  mutateComponentTextWidth,
  mutateComponentTextX,
  mutateComponentTextY,
} from '@src/typescript/roadmap_ref/node/components/text/mutate';
import {
  mutateNodeCoordX,
  mutateNodeCoordY,
  mutateNodeHeight,
  mutateNodeOpacity,
  mutateNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { appendComponent } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';

describe('Components logic', () => {
  let node;
  beforeAll(() => {
    node = nodeFactoryClassicBoilerplate();
  });

  it('empty', () => {
    expect(true).toBe(true);
  });

  it('should check for the reutrned value for title and description in the tab-page tab', () => {
    const title = 'eugene';
    const description = 'another eugene';
    const component = node.components[0];
    mutateAttachmentTabComponentTitle(component, 'titleText', title);
    mutateAttachmentTabComponentDescription(
      component,
      'descriptionText',
      description
    );
    expect(component.titleText).toBe(title);
    expect(component.descriptionText).toBe(description);
  });

  it('should mutate component title position and string', () => {
    const componentIndex = 0;
    const component = node.components[componentIndex];
    const newPosition = { x: 100, y: 100 };
    mutateComponentTextHeight(component, 100);
    mutateComponentTextWidth(component, 100);
    expect(component.width).toBe(100);
    expect(component.height).toBe(100);
  });

  // it('append.ts a new description, find it and mutate text', () => {
  //   const title = 'New Title string';
  //   const component = factoryComponentEmpty('Description');
  //   const componentId = component.id;
  //   appendComponent(node, component);
  //   const componentDescription = getComponentDescriptionById(node, componentId);
  //   expect(componentDescription instanceof ComponentDescription).toBe(true);
  //   mutateComponentDescriptionText(component, 'New Text2');
  //   expect(component.text).toBe('New Text2');
  // });
  //
  it('should mutate the node opacity', () => {
    const opacity = 20;
    mutateNodeOpacity(node, opacity);
    expect(node.data.opacity).toBe(opacity);
  });

  it('should mutate the node position', () => {
    const x = 20;
    const y = 20;
    mutateNodeCoordX(node, x);
    mutateNodeCoordY(node, y);
    expect(node.data.coords.x).toBe(x);
    expect(node.data.coords.y).toBe(y);
  });

  it('should mutate the node size', () => {
    const width = 20;
    const height = 20;
    mutateNodeWidth(node, width);
    mutateNodeHeight(node, height);
    expect(node.data.width).toBe(width);
    expect(node.data.height).toBe(height);
  });

  it('should mutate the component title text', () => {
    const component = node.components[0];
    const text = 'New Text';
    mutateComponentTextText(component, text);
    expect(component.text).toBe(text);
  });

  it('should mutate the component title position', () => {
    const component = node.components[0];
    const x = 20;
    const y = 20;
    mutateComponentTextX(component, x);
    mutateComponentTextY(component, y);
    expect(component.x).toBe(x);
    expect(component.y).toBe(y);
  });
});
