export type IAttachmentTabComponentTypes =
  | 'Title'
  | 'Description'
  | 'Link'
  | 'BulletList';

export interface IAttachmentTabTitleProperties {
  type: 'Title';
  titleText: string;
}

export interface IAttachmentTabDescriptionProperties {
  type: 'Description';
  descriptionText: string;
}

export interface IAttachmentTabLinkProperties {
  type: 'Link';
  linkURL: string;
}

export interface IAttachmentTabBulletListProperties {
  type: 'BulletList';
  bulletListItems: string[];
}

export interface ITabLinkBulletListItem {
  linkURL: string;
  text: string;
}

export interface ITabLinkBulletListProperties {
  linkBulletListItems: ITabLinkBulletListItem[];
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
