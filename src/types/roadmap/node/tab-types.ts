export type ITabComponentType =
  | 'Title'
  | 'Description'
  | 'Link'
  | 'BulletList'
  | 'LinkBulletList';

export type ITabComponentProperties =
  | ({
      type: 'Title';
    } & TitleProperties)
  | ({
      type: 'Description';
    } & DescriptionProperties)
  | ({
      type: 'Link';
    } & LinkProperties)
  | ({
      type: 'BulletList';
    } & BulletListProperties)
  | ({
      type: 'LinkBulletList';
    } & LinkBulletListProperties);

interface TitleProperties {
  titleText: string;
}

interface DescriptionProperties {
  descriptionText: string;
}

interface LinkProperties {
  linkURL: string;
}

interface BulletListProperties {
  bulletListItems: string[];
}
interface LinkBulletListProperties {
  linkBulletListItems: LinkBulletListItem[];
}
export interface LinkBulletListItem {
  linkURL: string;
  text: string;
}
