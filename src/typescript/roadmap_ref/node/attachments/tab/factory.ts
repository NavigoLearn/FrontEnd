import { AttachmentTab } from '@src/typescript/roadmap_ref/node/attachments/tab/core';
import {
  type IAttachmentTabBulletListItem,
  type IAttachmentTabComponentProperties,
  type IAttachmentTabComponentTypes,
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
    return {
      type: 'Title',
      titleText: '',
      id: uuidv4(),
    };
  }

  if (type === 'Description') {
    return {
      type: 'Description',
      descriptionText: '',
      id: uuidv4(),
    };
  }

  if (type === 'Link') {
    return {
      type: 'Link',
      linkURL: 'https://www.google.com',
      id: uuidv4(),
    };
  }

  if (type === 'BulletList') {
    return {
      type: 'BulletList',
      bulletListItems: [
        factoryAttachmentTabBulletListElementEmpty(),
        factoryAttachmentTabBulletListElementEmpty(),
        factoryAttachmentTabBulletListElementEmpty(),
      ],
      id: uuidv4(),
    };
  }

  throw new Error('Invalid component type');
}

export function factoryAttachmentTabStandard(): AttachmentTab {
  const tab = factoryAttachmentTabEmpty();

  // appends component to tab-page
  const attachmentTitleComponent = factoryAttachmentComponent('Title');
  const attachmentDescriptionComponent =
    factoryAttachmentComponent('Description');
  const attachmentLinkComponent = factoryAttachmentComponent('BulletList');

  tab.components.push(attachmentTitleComponent);
  tab.components.push(attachmentDescriptionComponent);
  tab.components.push(attachmentLinkComponent);

  return tab;
}
