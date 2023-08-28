import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  injectClassicData,
  injectClassicFlags,
  injectNewRandomId,
} from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/inject';
import { appendAttachment } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { factoryAttachmentTabEmpty } from '@src/typescript/roadmap_ref/node/attachments/tab/factory';

export function NodeFactoryStaticBoilerplate(): NodeClass {
  // return boilerplate class for classic nodes-page and the most common
  const node = new NodeClass();
  // classic nodes-page has a tab-tab-page tab-page and the default color scheme
  injectClassicFlags(node);
  injectNewRandomId(node);
  injectClassicData(node, 'someparent', []);
  // appendComponent(node, factoryComponentTitleEmpty());
  appendAttachment(node, factoryAttachmentTabEmpty());

  return node;
}
