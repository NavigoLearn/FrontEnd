import { IAttachmentTabComponentProperties } from '@type/roadmap/node/tab-types';
import { IAttachmentObject } from '@type/roadmap/node/attachments-types';

export function appendAttachmentTabComponent(
  attachment: IAttachmentObject,
  component: IAttachmentTabComponentProperties
) {
  attachment.components.push(component);
}
