import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  injectClassicData,
  injectClassicFlags,
  injectNewRandomId,
} from '@src/typescript/roadmap_ref/node/core/factories/injectors/inject';
import { appendAttachment } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { factoryAttachmentTabEmpty } from '@src/typescript/roadmap_ref/node/attachments/tab/factory';

export function NodeFactoryStaticBoilerplate(): NodeClass {
  // return boilerplate class for classic nodes and the most common
  const node = new NodeClass();
  // classic nodes has a tab-attachment attachment and the default color scheme
  injectClassicFlags(node);
  injectNewRandomId(node);
  injectClassicData(node, 'someparent', []);
  // appendComponent(node, factoryComponentTitleEmpty());
  appendAttachment(node, factoryAttachmentTabEmpty());

  return node;
}
