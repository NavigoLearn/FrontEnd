import { AttachmentTab } from '@src/typescript/roadmap_ref/node/attachments/tab/core';
import {
  IAttachmentTabBulletListProperties,
  IAttachmentTabComponentProperties,
  IAttachmentTabComponentTypes,
  IAttachmentTabDescriptionProperties,
  IAttachmentTabLinkProperties,
  IAttachmentTabTitleProperties,
} from '@type/roadmap/node/tab-types';

export function factoryAttachmentTabEmpty(): AttachmentTab {
  return new AttachmentTab();
}

export function factoryAttachmentComponent(
  type: IAttachmentTabComponentTypes
): IAttachmentTabComponentProperties {
  if (type === 'Title') {
    const titleComponent: IAttachmentTabTitleProperties = {
      type: 'Title',
      titleText: '',
    };
    return titleComponent;
  }

  if (type === 'Description') {
    const descriptionComponent: IAttachmentTabDescriptionProperties = {
      type: 'Description',
      descriptionText: '',
    };
    return descriptionComponent;
  }

  if (type === 'Link') {
    const linkComponent: IAttachmentTabLinkProperties = {
      type: 'Link',
      linkURL: 'https://www.google.com',
    };
    return linkComponent;
  }

  if (type === 'BulletList') {
    const bulletListComponent: IAttachmentTabBulletListProperties = {
      type: 'BulletList',
      bulletListItems: ['Item 1', 'Item 2', 'Item 3'],
    };
    return bulletListComponent;
  }

  throw new Error('Invalid component type');
}
