import {
  IAttachmentTabDescriptionProperties,
  IAttachmentTabTitleProperties,
} from '@type/roadmap/node/tab-types';
import {
  AttachmentTab,
  IAttachmentTabStatus,
} from '@src/typescript/roadmap_ref/node/attachments/tab/core';

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

export function mutateAttachmentTabStatus(
  attachment: AttachmentTab,
  status: IAttachmentTabStatus
) {
  attachment.status = status;
}
