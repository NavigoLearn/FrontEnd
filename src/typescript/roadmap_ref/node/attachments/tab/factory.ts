import { v4 as uuidv4 } from 'uuid';
import { AttachmentTab } from '@typescript/roadmap_ref/node/attachments/tab/core';
import {
  IAttachmentObject,
  IAttachmentOptions,
} from '@type/roadmap/node/attachments-types';

type IAttachmentClasses = AttachmentTab;

export function factoryAttachmentEmptyTab(): AttachmentTab {
  return new AttachmentTab();
}

export function factoryEmptyAttachmentJSON(
  type: IAttachmentOptions
): IAttachmentObject {
  const possibleFactories: {
    [key in IAttachmentOptions]: () => IAttachmentClasses;
  } = {
    Tab: factoryAttachmentEmptyTab,
  };
  const factory = possibleFactories[type];
  return {
    type,
    name: 'New Tab',
    id: uuidv4(),
    attachment: factory(),
  };
}
