export type ITabComponentType =
  | 'Title'
  | 'Description'
  | 'Link'
  | 'BulletList'
  | 'LinkBulletList';

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
export interface LinkBulletListItem {
  linkURL: string;
  text: string;
}
interface LinkBulletListProperties {
  linkBulletListItems: LinkBulletListItem[];
}

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
