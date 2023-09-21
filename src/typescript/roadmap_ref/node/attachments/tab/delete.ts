import { type IAttachmentTabBulletListProperties } from '@type/roadmap/node/tab-types';

export function deleteAttachmentBulletListNewItem(
  bulletListComponent: IAttachmentTabBulletListProperties,
  idToRemove: string
) {
  bulletListComponent.bulletListItems =
    bulletListComponent.bulletListItems.filter(
      (item) => item.id !== idToRemove
    );
}
