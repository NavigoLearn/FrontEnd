import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

import {
  injectClassicData,
  injectClassicFlags,
  injectDraggingBehavior,
  injectNewId,
  injectNewRandomId,
} from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/inject';
import {
  draggingBehaviorFactoryRoadmapNode,
  draggingBehaviorFactorySubNode,
} from '@src/typescript/roadmap_ref/dragging/factories';
import { appendComponent } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { factoryComponentEmpty } from '@src/typescript/roadmap_ref/node/components/text/factories';
import {
  recalculateNodeCenter,
  recalculateNodeChunks,
} from '@src/typescript/roadmap_ref/node/core/calculations/general';
import {
  mutateNodeCoordX,
  mutateNodeCoordY,
  mutateNodeHeight,
  mutateNodeOnClickAction,
  mutateNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { appendNodeToChunks } from '@src/typescript/roadmap_ref/roadmap-data/services/append';
import { appendAttachmentTabStandard } from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/append';
import { injectDraggingStrategy } from '@src/typescript/roadmap_ref/dragging/inject';

export function addDraggingBehaviorNodeProtocol(node: NodeClass) {
  let draggingBehavior;
  if (node.flags.renderedOnRoadmapFlag) {
    draggingBehavior = draggingBehaviorFactoryRoadmapNode(node.id);
  } else if (node.flags.subNodeFlag) {
    draggingBehavior = draggingBehaviorFactorySubNode(node.id);
  }
  injectDraggingStrategy(draggingBehavior, 'snap');
  injectDraggingBehavior(node, draggingBehavior);
}

export function nodeFactoryClassicBoilerplate(id?: string): NodeClass {
  // return boilerplate class for classic nodes-page and the most common
  const node = new NodeClass();
  // classic nodes-page has a tab-tab-page tab-page and the default color scheme
  injectClassicFlags(node);
  id ? injectNewId(node, id) : injectNewRandomId(node);
  injectClassicData(node, '', []);

  appendComponent(node, factoryComponentEmpty('Text', node.id));
  appendAttachmentTabStandard(node);
  addDraggingBehaviorNodeProtocol(node);
  recalculateNodeChunks(node);

  return node;
}

export function factoryNodeClassicCustomizable(
  x: number,
  y: number,
  width: number,
  height: number,
  id?: string | number
) {
  if (typeof id === 'number') id = id.toString();
  const node = nodeFactoryClassicBoilerplate(id);
  mutateNodeWidth(node, width || 100);
  mutateNodeHeight(node, height || 100);

  mutateNodeCoordX(node, x);
  mutateNodeCoordY(node, y);

  mutateNodeOnClickAction(node, 'Open attachment');

  recalculateNodeChunks(node);
  recalculateNodeCenter(node);
  appendNodeToChunks(node);

  return node;
}

export function factoryNodeClassic(id?: string) {
  const node = factoryNodeClassicCustomizable(0, 0, 150, 50, id);
  return node;
}
