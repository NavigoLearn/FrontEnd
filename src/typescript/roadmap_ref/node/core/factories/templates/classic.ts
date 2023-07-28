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

export function nodeFactoryClassicBoilerplate(id?: string): NodeClass {
  // return boilerplate class for classic nodes and the most common
  const node = new NodeClass();
  // classic nodes has a tab-attachment attachment and the default color scheme
  injectClassicFlags(node);
  id ? injectNewId(node, id) : injectNewRandomId(node);
  injectClassicData(node, 'someparent', []);

  appendComponent(node, factoryComponentTitleEmpty(node.id));
  const tab = factoryAttachmentTabEmpty();
  appendAttachment(node, tab);

  // appends component to attachment
  const attachmentTitleComponent = factoryAttachmentComponent('Title');
  const attachmentDescriptionComponent =
    factoryAttachmentComponent('Description');
  appendAttachmentTabComponent(tab, attachmentTitleComponent);
  appendAttachmentTabComponent(tab, attachmentDescriptionComponent);

  const draggingBehavior = draggingBehaviorFactoryRoadmapNode(node.id);
  injectDraggingBehavior(node, draggingBehavior);

  return node;
}
