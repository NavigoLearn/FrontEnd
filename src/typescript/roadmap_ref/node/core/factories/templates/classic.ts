import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
// import { appendComponentTitle } from '@typescript/roadmap_ref/node/core/roadmap-data-mutation/append';
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
import {
  factoryAttachmentComponent,
  factoryAttachmentTabEmpty,
} from '@src/typescript/roadmap_ref/node/attachments/tab/factory';
import { appendAttachmentTabComponent } from '@src/typescript/roadmap_ref/node/attachments/tab/append';

export function NodeFactoryClassicBoilerplate(): NodeClass {
  // return boilerplate class for classic nodes and the most common
  const node = new NodeClass();
  // classic nodes has a tab-attachment attachment and the default color scheme
  injectClassicFlags(node);
  injectNewId(node);
  injectClassicData(node, 'someparent', []);
  appendComponent(node, factoryComponentTitleEmpty());
  const tab = factoryAttachmentTabEmpty();
  appendAttachment(node, tab);
  const titleComponent = factoryAttachmentComponent('Title');
  const descriptionComponent = factoryAttachmentComponent('Description');
  appendAttachmentTabComponent(tab, titleComponent);
  appendAttachmentTabComponent(tab, descriptionComponent);

  return node;
}
