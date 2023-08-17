import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

import {
  injectClassicData,
  injectClassicFlags,
  injectDraggingBehavior,
  injectNewId,
  injectNewRandomId,
} from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/inject';
import { draggingBehaviorFactoryRoadmapNode } from '@src/typescript/roadmap_ref/dragging/factories';
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

export function nodeFactoryClassicBoilerplate(id?: string): NodeClass {
  // return boilerplate class for classic nodes and the most common
  const node = new NodeClass();
  // classic nodes has a tab-attachment attachment and the default color scheme
  injectClassicFlags(node);
  id ? injectNewId(node, id) : injectNewRandomId(node);
  injectClassicData(node, '', []);

  appendComponent(node, factoryComponentEmpty('Title', node.id));
  appendAttachmentTabStandard(node);
  const draggingBehavior = draggingBehaviorFactoryRoadmapNode(node.id);
  injectDraggingStrategy(draggingBehavior, 'snap');
  injectDraggingBehavior(node, draggingBehavior);
  recalculateNodeChunks(node);

  return node;
}

export function factoryNodeClassic(
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

  mutateNodeOnClickAction(node, 'Open Tab');

  recalculateNodeChunks(node);
  recalculateNodeCenter(node);
  appendNodeToChunks(node);

  return node;
}
