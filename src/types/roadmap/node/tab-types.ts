export type IAttachmentTabComponentTypes =
  | 'Title'
  | 'Description'
  | 'Link'
  | 'BulletList';

export interface IAttachmentTabTitleProperties {
  type: 'Title';
  id: string;
  titleText: string;
}

export interface IAttachmentTabDescriptionProperties {
  type: 'Description';
  id: string;
  descriptionText: string;
}

export interface IAttachmentTabLinkProperties {
  type: 'Link';
  id: string;
  linkURL: string;
}

export interface IAttachmentTabBulletListItem {
  id: string;
  linkURL: string;
  text: string;
}

export interface IAttachmentTabBulletListProperties {
  type: 'BulletList';
  id: string;
  bulletListItems: IAttachmentTabBulletListItem[];
}

export type IAttachmentTabComponentProperties =
  | IAttachmentTabTitleProperties
  | IAttachmentTabDescriptionProperties
  | IAttachmentTabLinkProperties
  | IAttachmentTabBulletListProperties;

export function typeGuardTabTitleProperties(
  component: IAttachmentTabComponentProperties
): component is IAttachmentTabTitleProperties {
  return component.type === 'Title';
}

export function typeGuardTabDescriptionProperties(
  component: IAttachmentTabComponentProperties
): component is IAttachmentTabDescriptionProperties {
  return component.type === 'Description';
}

export function typeGuardTabLinkProperties(
  component: IAttachmentTabComponentProperties
): component is IAttachmentTabLinkProperties {
  return component.type === 'Link';
}

export function typeGuardTabBulletListProperties(
  component: IAttachmentTabComponentProperties
): component is IAttachmentTabBulletListProperties {
  return component.type === 'BulletList';
}
