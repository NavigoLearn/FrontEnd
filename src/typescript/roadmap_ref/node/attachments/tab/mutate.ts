import {
  IAttachmentTabDescriptionProperties,
  IAttachmentTabTitleProperties,
} from '@type/roadmap/node/tab-types';

export function mutateAttachmentTabDescription<
  T extends keyof IAttachmentTabDescriptionProperties
>(
  titleComponent: IAttachmentTabDescriptionProperties,
  field: T,
  value: IAttachmentTabDescriptionProperties[T]
) {
  titleComponent[field] = value;
}

export function mutateAttachmentTabTitle<
  T extends keyof IAttachmentTabTitleProperties
>(
  titleComponent: IAttachmentTabTitleProperties,
  field: T,
  value: IAttachmentTabTitleProperties[T]
) {
  titleComponent[field] = value;
}
