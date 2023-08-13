import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { appendAttachmentTabComponent } from '@src/typescript/roadmap_ref/node/attachments/tab/append';
import {
  factoryAttachmentComponent,
  factoryAttachmentTabEmpty,
} from '@src/typescript/roadmap_ref/node/attachments/tab/factory';

import {
  injectClassicData,
  injectClassicFlags,
  injectDraggingBehavior,
  injectNewId,
  injectNewRandomId,
} from '@src/typescript/roadmap_ref/node/core/factories/injectors/inject';
import { draggingBehaviorFactoryRoadmapNode } from '@src/typescript/roadmap_ref/dragging/factories';
import {
  appendAttachment,
  appendComponent,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { factoryComponentTitleEmpty } from '@src/typescript/roadmap_ref/node/components/text/factories';
import {
  recalculateNodeCenter,
  recalculateNodeChunks,
} from '@src/typescript/roadmap_ref/node/core/calculations/general';
import {
  mutateNodeCoordX,
  mutateNodeCoordY,
  mutateNodeHeight,
  mutateNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { addNodeToChunks } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';

export function nodeFactoryClassicBoilerplate(id?: string): NodeClass {
  // return boilerplate class for classic nodes and the most common
  const node = new NodeClass();
  // classic nodes has a tab-attachment attachment and the default color scheme
  injectClassicFlags(node);
  id ? injectNewId(node, id) : injectNewRandomId(node);
  injectClassicData(node, '', []);

  appendComponent(node, factoryComponentTitleEmpty(node.id));
  const tab = factoryAttachmentTabEmpty();
  appendAttachment(node, tab);

  // appends component to attachment
  const attachmentTitleComponent = factoryAttachmentComponent('Title');
  const attachmentDescriptionComponent =
    factoryAttachmentComponent('Description');
  const attachmentLinkComponent = factoryAttachmentComponent('BulletList');

  appendAttachmentTabComponent(tab, attachmentTitleComponent);
  appendAttachmentTabComponent(tab, attachmentDescriptionComponent);
  appendAttachmentTabComponent(tab, attachmentLinkComponent);

  const draggingBehavior = draggingBehaviorFactoryRoadmapNode(node.id);
  injectDraggingBehavior(node, draggingBehavior);
  recalculateNodeChunks(node);

  return node;
}

export function factoryNodeClassic(
  x: number,
  y: number,
  width: number,
  height: number
) {
  const node = nodeFactoryClassicBoilerplate();
  mutateNodeWidth(node, width || 100);
  mutateNodeHeight(node, height || 100);

  mutateNodeCoordX(node, x);
  mutateNodeCoordY(node, y);

  recalculateNodeChunks(node);
  recalculateNodeCenter(node);
  addNodeToChunks(node);

  return node;
}
