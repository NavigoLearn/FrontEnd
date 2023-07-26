import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  injectClassicData,
  injectClassicFlags,
  injectNewId,
} from '@src/typescript/roadmap_ref/node/core/factories/injectors/inject';
import {
  appendAttachment,
  appendComponent,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { factoryComponentTitleEmpty } from '@src/typescript/roadmap_ref/node/components/text/factories';
import { factoryAttachmentTabEmpty } from '@src/typescript/roadmap_ref/node/attachments/tab/factory';

export function NodeFactoryStaticBoilerplate(): NodeClass {
  // return boilerplate class for classic nodes and the most common
  const node = new NodeClass();
  // classic nodes has a tab-attachment attachment and the default color scheme
  injectClassicFlags(node);
  injectNewId(node);
  injectClassicData(node, 'someparent', []);
  appendComponent(node, factoryComponentTitleEmpty());
  appendAttachment(node, factoryAttachmentTabEmpty());

  return node;
}
