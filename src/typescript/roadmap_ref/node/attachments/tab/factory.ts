import { AttachmentTab } from '@src/typescript/roadmap_ref/node/attachments/tab/core';
import {
  IAttachmentTabBulletListItem,
  IAttachmentTabBulletListProperties,
  IAttachmentTabComponentProperties,
  IAttachmentTabComponentTypes,
  IAttachmentTabDescriptionProperties,
  IAttachmentTabLinkProperties,
  IAttachmentTabTitleProperties,
} from '@type/roadmap/node/tab-types';
import { v4 as uuidv4 } from 'uuid';

export function factoryAttachmentTabEmpty(): AttachmentTab {
  return new AttachmentTab();
}

export function factoryAttachmentTabBulletListElementEmpty(): IAttachmentTabBulletListItem {
  return {
    text: 'Here is a link title',
    linkURL: 'https://www.google.com',
    id: uuidv4(),
  };
}

export function factoryAttachmentComponent(
  type: IAttachmentTabComponentTypes
): IAttachmentTabComponentProperties {
  if (type === 'Title') {
    const titleComponent: IAttachmentTabTitleProperties = {
      type: 'Title',
      titleText: '',
      id: uuidv4(),
    };
    return titleComponent;
  }

  if (type === 'Description') {
    const descriptionComponent: IAttachmentTabDescriptionProperties = {
      type: 'Description',
      descriptionText: '',
      id: uuidv4(),
    };
    return descriptionComponent;
  }

  if (type === 'Link') {
    const linkComponent: IAttachmentTabLinkProperties = {
      type: 'Link',
      linkURL: 'https://www.google.com',
      id: uuidv4(),
    };
    return linkComponent;
  }

  if (type === 'BulletList') {
    const bulletListComponent: IAttachmentTabBulletListProperties = {
      type: 'BulletList',
      bulletListItems: [
        factoryAttachmentTabBulletListElementEmpty(),
        factoryAttachmentTabBulletListElementEmpty(),
        factoryAttachmentTabBulletListElementEmpty(),
      ],
      id: uuidv4(),
    };
    return bulletListComponent;
  }

  throw new Error('Invalid component type');
}
