import { AttachmentTab } from '@typescript/roadmap_ref/node/attachments/tab/core';

type IAttachmentClasses = AttachmentTab;

export function factoryAttachmentTabEmpty(): AttachmentTab {
  return new AttachmentTab();
}
