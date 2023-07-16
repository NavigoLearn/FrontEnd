import { beforeAll, describe, expect, it } from 'vitest';
import {
  mutateComponentTitleHeight,
  mutateComponentTitleText,
  mutateComponentTitleWidth,
} from '@typescript/roadmap_ref/node/components/text/mutate';
import { factoryComponentJSONEmpty } from '@typescript/roadmap_ref/node/components/text/factories';
import { ComponentTitle } from '@typescript/roadmap_ref/node/components/text/core';
import { classicNodeFactoryBoilerplate } from '@typescript/roadmap_ref/node/core/factories/templates/classic';
import { getComponentTitleById } from '@typescript/roadmap_ref/node/core/data-get/components';
import { appendComponentJSON } from '@typescript/roadmap_ref/node/core/data-mutation/append';

describe('Components logic', () => {
  let node;
  beforeAll(() => {
    node = classicNodeFactoryBoilerplate();
  });

  it('should create a new component title', () => {
    const title = 'New Title string';
    const id = 0; // any valid id here
    const json = factoryComponentJSONEmpty('Title');
    expect(json.component instanceof ComponentTitle).toBe(true);
  });

  it('add new title to node', () => {
    const title = 'New Title string';
    const id = 0; // any valid id here
    appendComponentJSON(node, factoryComponentJSONEmpty('Title'));
    expect(node.componentsJSON.length).toBe(2);
  });

  it('should mutate component title position and string', () => {
    const componentIndex = 0;
    const { component } = node.componentsJSON[componentIndex];
    const newPosition = { x: 100, y: 100 };
    mutateComponentTitleHeight(component, 100);
    mutateComponentTitleWidth(component, 100);
    expect(component.width).toBe(100);
    expect(component.height).toBe(100);
  });

  it('append a new title, find it and mutate text', () => {
    const title = 'New Title string';
    const componentJSON = factoryComponentJSONEmpty('Title');
    const componentId = componentJSON.id;
    appendComponentJSON(node, componentJSON);
    const component = getComponentTitleById(node, componentId);
    expect(component instanceof ComponentTitle).toBe(true);
    mutateComponentTitleText(component, 'New Text2');
    expect(component.text).toBe('New Text2');
  });
});
