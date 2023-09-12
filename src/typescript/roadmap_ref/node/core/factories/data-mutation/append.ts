import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { factoryAttachmentTabStandard } from '@src/typescript/roadmap_ref/node/attachments/tab/factory';
import { appendAttachment } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';

export function appendAttachmentTabStandard(node: NodeClass) {
  const tab = factoryAttachmentTabStandard();
  appendAttachment(node, tab);
}
