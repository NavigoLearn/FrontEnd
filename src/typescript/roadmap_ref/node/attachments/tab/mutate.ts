import {
  type IAttachmentTabBulletListProperties,
  type IAttachmentTabDescriptionProperties,
  type IAttachmentTabTitleProperties,
} from '@type/roadmap/node/tab-types';
import { AttachmentTab } from '@src/typescript/roadmap_ref/node/attachments/tab/core';

export function mutateAttachmentTabComponentDescription<
  T extends keyof IAttachmentTabDescriptionProperties
>(
  titleComponent: IAttachmentTabDescriptionProperties,
  field: T,
  value: IAttachmentTabDescriptionProperties[T]
) {
  titleComponent[field] = value;
}

export function mutateAttachmentTabComponentTitle<
  T extends keyof IAttachmentTabTitleProperties
>(
  titleComponent: IAttachmentTabTitleProperties,
  field: T,
  value: IAttachmentTabTitleProperties[T]
) {
  titleComponent[field] = value;
}

export function mutateAttachmentTabName(
  attachment: AttachmentTab,
  name: string
) {
  attachment.name = name;
}

export function mutateAttachmentTabBulletListItemText(
  bulletList: IAttachmentTabBulletListProperties,
  id: string,
  text: string
) {
  const index = bulletList.bulletListItems.findIndex((item) => item.id === id);
  bulletList.bulletListItems[index].text = text;
}

export function mutateAttachmentTabBulletListItemLinkURL(
  bulletList: IAttachmentTabBulletListProperties,
  id: string,
  linkURL: string
) {
  const index = bulletList.bulletListItems.findIndex((item) => item.id === id);
  bulletList.bulletListItems[index].linkURL = linkURL;
}
