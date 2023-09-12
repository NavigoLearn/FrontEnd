import {
  IAttachmentTabBulletListProperties,
  IAttachmentTabComponentProperties,
} from '@type/roadmap/node/tab-types';
import { IAttachmentObject } from '@type/roadmap/node/attachments-types';
import { factoryAttachmentTabBulletListElementEmpty } from '@src/typescript/roadmap_ref/node/attachments/tab/factory';

export function appendAttachmentTabComponent(
  attachment: IAttachmentObject,
  component: IAttachmentTabComponentProperties
) {
  attachment.components.push(component);
}

export function appendAttachmentBulletListNewItem(
  bulletListComponent: IAttachmentTabBulletListProperties
) {
  const newItem = factoryAttachmentTabBulletListElementEmpty();
  bulletListComponent.bulletListItems.push(newItem);
}
